<template>
  <div :class="['anchor-group-wrapper', {'is-expand': expand}]">
    <div :class="['anchor-item-wrapper', {'is-active': active}]" @click="locateTitle">
      <div class="anchor-circle"></div>
      <div class="anchor-title" :style="{'padding-left': `${level*16 + 36}px`}">
        {{ data.label }}
      </div>
    </div>
    <div class="anchor-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getChildrenComponent } from './utils.js'
export default {
  name: 'anchor-group',
  inject: ['anchor'],
  props: {
    data:{
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      level: 0,
      expand: false
    }
  },
  computed: {
    active() {
      return this.anchor.currentAnchorId === this.data.id
    }
  },
  watch: {
    active(val) {
      this.expand = val
      this.handleGroupExpandStatus(this, 'anchor-group', 'getChildrenActive')
    }
  },
  mounted() {
    this.getLevel(this, 'anchor-group')
  },
  methods: {
    // 获取当前锚点所在的层级
    getLevel(context, name) {
      const parent = context.$parent
      if(parent.$options.name === name){
        this.level++
        this.getLevel(parent, name)
      }
    },
    getChildrenActive() {
      let children = getChildrenComponent(this, ['anchor-group', 'anchor-item'])
      this.expand = children.some(item => item.active)
    },
    handleGroupExpandStatus(context, name, actionName) {
      const parent = context.$parent
      if(parent && parent.$options.name === name){
        parent[actionName]()
      }
      if(parent){
        this.handleGroupExpandStatus(parent, name, actionName)
      }
    },
    locateTitle() {
      this.$emit('locateTitle', this.data)
    }
  }
}
</script>

<style lang="less" scoped>
.anchor-group-wrapper{
  .anchor-group-item{
  }
  .anchor-group-content{
    display: none;
  }
  &.is-expand{
    .anchor-group-content{
      display: block;
    }  
  }
}
</style>