<template>
  <div class="anchor-wrapper">
    <template v-for="item in titleList">
      <anchor-group 
        v-if="item.children && item.children.length" 
        :key="item.id" 
        :data="item"
        @locateTitle="handleLocateTitle">
        <template v-for="val in item.children">
          <anchor-item 
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
  </div>
</template>

<script>
import AnchorItem from './AnchorItem.vue'
import AnchorGroup from './AnchorGroup.vue'
import { EventListener, nestToSimple } from './utils.js'
export default {
  name: 'anchor',
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
      simpleTitleList: [],
      currentAnchor: null
    }
  },
  watch: {
    currentAnchor(val){
     this.setUrlHash(val.id)
    }
  },
  mounted() {
    this.getScrollObj()
    this.getAllTitleOffsetTop()
    EventListener.add(this.scrollContainer, 'scroll', this.handleScroll)
  },
  beforeDestroy() {
    EventListener.remove(this.scrollContainer, 'scroll', this.handleScroll)
  },
  methods: {
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
        this.setUrlHash(data.id)
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
      this.simpleTitleList = nestToSimple(this.titleList)
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
          this.currentAnchor = this.simpleTitleList[i]
          break
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.anchor-wrapper{
  position: fixed;
  top: 100px;
  right: 100px;
}
</style>