<template>
  <div ref="anchor" class="anchor-wrapper" :style="{ top: position.top || 100 + 'px', left: `calc(100% - ${position.right || 200}px)`}">
    <template v-for="item in titleList">
      <anchor-group 
        v-if="item.children && item.children.length" 
        :key="item.id" 
        :data="item"
        @locateTitle="handleLocateTitle">
        <template v-for="val in item.children">
          <anchor-group 
            v-if="val.children && val.children.length" 
            :key="val.id" 
            :data="val"
            @locateTitle="handleLocateTitle">
            <anchor-item
              v-for="v in val.children"
              :key="v.id" 
              :data="v" 
              @locateTitle="handleLocateTitle"></anchor-item>
          </anchor-group>
          <anchor-item
            v-else
            :key="val.id" 
            :data="val" 
            @locateTitle="handleLocateTitle"></anchor-item>
        </template>
      </anchor-group>
      <anchor-item 
        v-else 
        :key="item.id" 
        :data="item" 
        @locateTitle="handleLocateTitle"></anchor-item>
    </template>
    <div class="acitve-anchor-circle" :style="{top: activeAnchorTop + 'px', left: '13px'}"></div>
  </div>
</template>

<script>
import AnchorItem from './AnchorItem.vue'
import AnchorGroup from './AnchorGroup.vue'
import { EventListener, nestToSimple, getRelativePosition } from './utils.js'
export default {
  name: 'anchor',
  provide() {
    return {
      anchor: this
    }
  },
  components: {
    AnchorItem,
    AnchorGroup
  },
  props: {
    // 标题列表
    titleList: {
      type: Array,
      default: () => []
    },
    // 滚动内容的外层容器
    container: {
      type: String,
      default: ''
    },
    // 相对于外层容器的位置
    position: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      scrollContainer: null,
      scrollEle: null,
      allTitleOffsetTop: [],
      currentAnchorId: null,
      activeAnchorTop: 0
    }
  },
  computed: {
    simpleTitleList() {
      return this.nestToSimple(this.titleList)
    },
  },
  mounted() {
    this.currentAnchorId = this.simpleTitleList[0].id
    this.setActiveAnchorCirclePosition()
    this.getScrollObj()
    this.getAllTitleOffsetTop()
    EventListener.add(this.scrollContainer, 'scroll', this.handleScroll)
  },
  beforeDestroy() {
    EventListener.remove(this.scrollContainer, 'scroll', this.handleScroll)
  },
  methods: {
    nestToSimple,
    // 获取滚动内容的外层容器对象及DOM
    getScrollObj() {
      if(this.container){
        this.scrollContainer = document.querySelector(this.container)
        this.scrollEle = this.container
      } else {
        this.scrollContainer = window
        this.scrollEle = document.documentElement || document.body
      }
    },
    // 点击锚点将页面定位对应的标题处，并改变路径hash值
    handleLocateTitle(data) {
      let titleEle = document.querySelector(`#${data.id}`)
      this.scrollEle.scrollTop = titleEle.offsetTop
      setTimeout(() => {
        this.currentAnchorId = data.id
        this.setUrlHash(this.currentAnchorId)
        this.setActiveAnchorCirclePosition()
      })
    },
    // 设置路径hash
    setUrlHash(hash) {
      let location = window.location
      window.location.href = `${location.origin}${location.pathname}${location.search}#${hash}`
    },
    // 监听滚动过程中做了两件事：
    // 1、改变当前激活的锚点
    // 2、监听当前激活锚点变化并改变路径hash
    handleScroll(e) {
      let scrollTop = this.scrollContainer === window ? document.documentElement.scrollTop || document.body.scrollTop : e.target.scrollTop
      this.getCurrentAnchor(scrollTop)
    },
    // 获取所有锚点对应标题在滚动内容区域中距离顶部的距离
    getAllTitleOffsetTop() {
      let i = -1
      let len = this.simpleTitleList.length
      while(++i < len){
        this.allTitleOffsetTop.push(document.querySelector(`#${this.simpleTitleList[i].id}`).offsetTop)
      }
    },
    // 根据内容滚动距离获取当前锚点数据
    getCurrentAnchor(scrollTop) {
      let i = -1
      let len = this.simpleTitleList.length
      while(++i < len){
        let curAnchorScrollTop = this.allTitleOffsetTop[i]
        let nextAnchorScrollTop = this.allTitleOffsetTop[i+1]
        if(scrollTop >= curAnchorScrollTop && (nextAnchorScrollTop && scrollTop < nextAnchorScrollTop)){
          this.currentAnchorId = this.simpleTitleList[i].id
          break
        }
      }
      this.setActiveAnchorCirclePosition()
    },
    // 设置表示当前激活锚点的小球的位置
    setActiveAnchorCirclePosition() {
      this.$nextTick(() => {
        const currentAnchorEl = document.querySelector('.anchor-item-wrapper.is-active')
        this.activeAnchorTop = getRelativePosition(currentAnchorEl, this.$refs.anchor).y + currentAnchorEl.clientHeight/2
      })
    }
  }
}
</script>

<style lang="less" scoped>
.anchor-wrapper{
  position: fixed;
  .acitve-anchor-circle{
    position: absolute;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #e72528;
  }
}
</style>