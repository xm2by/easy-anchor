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

// 获取两DOM元素的相对位置
export function getRelativePosition(el, referEl) {
  const elRect = el.getBoundingClientRect();
  const referElRect = referEl.getBoundingClientRect();
  let scrollLeft
  let scrollTop
  if (referEl === document.body) {
    scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    scrollTop = document.documentElement.scrollLeft || document.body.scrollTop
  } else {
    scrollLeft = referEl.scrollLeft
    scrollTop = referEl.scrollTop
  }
  let x = elRect.left + scrollLeft - referElRect.left
  let y = elRect.top + scrollTop - referElRect.top
  return {
    x,
    y
  }
}

// 查询所有的子组件
export function getChildrenComponent(cmpt, cmptName) {
  return cmpt.$children.reduce((list, child) => {
    cmptName = Array.isArray(cmptName) ? cmptName : [cmptName]
    if (cmptName.includes(child.$options.name)) {
      list.push(child)
    }
    const grandChild = getChildrenComponent(child, cmptName)
    return list.concat(grandChild)
  }, [])
}