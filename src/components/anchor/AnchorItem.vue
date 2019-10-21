<template>
  <div :class="['anchor-item-wrapper', {'is-active': active}]" @click="locateTitle">
    <div class="anchor-circle"></div>
    <div class="anchor-title" :style="{'padding-left': `${level*16 + 36}px`}">
      {{ data.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'anchor-item',
  inject: ['anchor'],
  props: {
    data:{
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      level: 0
    }
  },
  computed: {
    active() {
      return this.anchor.currentAnchorId === this.data.id
    }
  },
  watch: {
    active(val) {
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

<style lang="less">
.anchor-item-wrapper{
  position: relative;
  color: #4d4d4d;
  cursor: pointer;
  &:before, &:after{
    content: '';
    display: block;
    position: absolute;
    left: 17px;
    width: 1px;
    height: 14px;
    background: #e0e0e0;
  }
  &:before{
    top: 0;
  }
  &:after{
    bottom: 0;
  }
  &.is-active{
    // color: #1a1a1a;
    color: red;
  }
  .anchor-circle{
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e0e0e0;
  }
  .anchor-title{
    padding: 8px 20px 8px 36px;
  }
}
</style>