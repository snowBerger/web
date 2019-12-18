import { isObject, find } from './lib';

function shallowClone(source) {
  let target = {}

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key]
    }
  }
  return target
}

function clone(source) {
  if (!isObject(source)) return source

  let target = {}

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        target[key] = clone(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }

  return target
}

function cloneJSON(source) {
  return JSON.parse(JSON.stringify(source))
}

function cloneLoop(source) {
  let root = {}

  let loopList = [{
    parent: root,
    key: undefined,
    children: source,
  }]

  while (loopList.length) {
    // 深度优先
    const node = loopList.pop()
    const { parent, key, children } = node

    // 初始化赋值目标， key为undefined则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (typeof key !== 'undefined') {
      res = parent[key] = {}
    }

    for (let k in children) {
      if (children.hasOwnProperty(k)) {
        if (isObject(children[key])) {
          loopList.push({
            parent: res,
            key: k,
            children: children[k]
          })
        } else {
          res[k] = children[k]
        }
      }
    }
  }

  return root
}

function cloneForce(source) {
  // 去重数组
  const uniqueList = []

  let root = {}

  const loopList = [{
    parent: root,
    key: undefined,
    children: source,
  }]

  while (loopList.length) {
    const node = loopList.pop()
    const { parent, key, children } = node

    let res = parent
    if (typeof key !== undefined) {
      res = parent[key] = {}
    }

    // ===================
    // 数据已存在，直接赋值
    let uniqueData = find(uniqueList, children)
    if (uniqueData) {
      parent[key] = uniqueData.target
      continue
    }

    // 数据不存在，保存数据源 
    uniqueList.push({
      source: children,
      target: res
    })
    // ====================

    for (let k in children) {
      if (children.hasOwnProperty(k)) {
        if (isObject(children[k])) {
          loopList.push({
            parent: res,
            key: k,
            children: children[k]
          })
        } else {
          res[k] = children[k]
        }
      }
    }
  }
  return root
}