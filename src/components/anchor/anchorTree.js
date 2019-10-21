import AnchorItem from './AnchorItem.vue'
import AnchorGroup from './AnchorGroup.vue'
export default {
  name: 'anchor-tree',
  render(h) {
    const create = (titleList, h) => {
      return titleList.map(item => {
        if (item.children && item.children.length) {
          return h('anchor-group', {
              props: {
                key: item.id,
                data: item,
              },
              on: {
                locateTitle: this.handleLocateTitle
              },
            },
            create(item.children, h)
          )
        } else {
          return h('anchor-item', {
            props: {
              key: item.id,
              data: item,
            },
            on: {
              locateTitle: this.handleLocateTitle
            },
          })
        }
      })
    }
    return h('div', {}, create(this.titleList, h))
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
  },
  methods: {
    handleLocateTitle(data) {
      this.$emit('locateTitle', data)
    },
  }
}