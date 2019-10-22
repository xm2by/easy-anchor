<template>
  <div class="demo-wrapper">
    <div class="module module1">
      <div id="module1" class="module-title">标题1</div>
      <div class="module-content">内容1</div>
    </div>
    <div class="module module2">
      <div id="module2" class="module-title">标题2</div>
      <div class="module-content">内容2</div>
    </div>
    <div class="module">
      <div id="module3" class="module-title">标题3</div>
      <div class="module-content">
        <div class="sub-module">
          <div id="module31" class="sub-module-title">标题3-1</div>
          <div class="sub-module-content">
            <div id="module311" class="sub-module">
              <div class="sub-module-title">标题3-1-1</div>
              <div class="sub-module-content">内容3-1-1</div>
            </div>
          </div>
        </div>
        <div id="module32" class="sub-module">
          <div class="sub-module-title">标题3-2</div>
          <div class="sub-module-content">内容3-2</div>
        </div>
        <div class="sub-module">
          <div id="module33" class="sub-module-title">标题3-3</div>
          <div class="sub-module-content">内容3-3</div>
        </div>
      </div>
    </div>
    <div class="module module4">
      <div id="module4" class="module-title">标题4</div>
      <div class="module-content">内容4</div>
    </div>
    <div class="module module5">
      <div id="module5" class="module-title">标题5</div>
      <div class="module-content">内容5</div>
    </div>
    <div class="module module6">
      <div id="module6" class="module-title">标题6</div>
      <div class="module-content">内容6</div>
    </div>
    <div class="module module7">
      <div id="module7" class="module-title">标题7</div>
      <div class="module-content">
        <div class="module module71">
          <div id="module71" class="module-title">标题71</div>
          <div class="module-content">内容71</div>
        </div>
        <div class="module module72">
          <div id="module72" class="module-title">标题72</div>
          <div class="module-content">内容72</div>
        </div>
        <div class="module module73">
          <div id="module73" class="module-title">标题73</div>
          <div class="module-content">内容73</div>
        </div>
        <anchor key="module7" :title-list="titleList1" container=".module7"></anchor>
      </div>
    </div>
    <anchor
      :title-list="titleList"></anchor>
  </div>
</template>

<script>
export default {
  name: 'demo',
  props: {
    msg: String
  },
  data() {
    return {
      titleList: [
        {
          id: 'module1',
          label: '标题1'
        },
        {
          id: 'module2',
          label: '标题2'
        },
        {
          id: 'module3',
          label: '标题3',
          children: [
            {
              id: 'module31',
              label: '标题3-1',
              children: [
                {
                  id: 'module311',
                  label: '标题3-1-1'
                }
              ]
            },
            {
              id: 'module32',
              label: '标题3-2'
            },
            {
              id: 'module33',
              label: '标题3-3'
            }
          ]
        },
        {
          id: 'module4',
          label: '标题4'
        },
        {
          id: 'module5',
          label: '标题5'
        },
        {
          id: 'module6',
          label: '标题6'
        },
        {
          id: 'module7',
          label: '标题7'
        }
      ],
      titleList1: [
        {
          id: 'module71',
          label: '标题71'
        },
        {
          id: 'module72',
          label: '标题72'
        },
        {
          id: 'module73',
          label: '标题73'
        }
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.demo-wrapper{
  .module{
    overflow: hidden;
    margin-bottom: 16px;
    &.module7{
      overflow: auto;
      width: 1200px;
      height: 600px;
      margin: 0 auto;
    }
  }
  .module-title{
    font-size: 24px;
    line-height: 36px;
  }
  .module-content, .sub-module-content{
    min-height: 300px;
    padding: 8px;
    margin: 8px 0;
    border: 1px solid #e5e5e5;
  }
  .sub-module-title{
    font-size: 20px;
    line-height: 32px;
  }
}
</style>
