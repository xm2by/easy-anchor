<template>
  <div class="anchor-group-wrapper">
    <div @click="locateTitle">{{ data.label }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'anchor-group',
  props: {
    data:{
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    locateTitle() {
      this.$emit('locateTitle', this.data)
    }
  }
}
</script>

<style lang="less" scoped>
.anchor-group-wrapper{}
</style>