// 事件监听、解绑
export const EventListener = {
  add(el, event, cb) {
    el.addEventListener(event, cb)
  },
  remove(el, event, cb) {
    el.removeEventListener(event, cb)
  }
}

// 将嵌套数据结构转变为简单数据结构
export function nestToSimple(list, childrenKey = 'children') {
  let listCopy = JSON.parse(JSON.stringify(list))
  let arr = []
  for (let i = 0; i < listCopy.length; i++) {
    if (listCopy[i].children) {
      arr.push(listCopy[i])
      arr = arr.concat(nestToSimple(listCopy[i].children))
      delete listCopy[i][childrenKey]
    } else {
      arr.push(listCopy[i])
    }
  }
  return arr
}