<template>
  <div class="anchor-item-wrapper" @click="locateTitle">
    {{ data.label }}
  </div>
</template>

<script>
export default {
  name: 'anchor-item',
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
.anchor-item-wrapper{}
</style>