import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateElementNode from './updateElementNode'
import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, container, oldDom) {
  // 获取未更新前的 Virtual DOM
  const oldVirtualDOM = oldDom && oldDom._virtualDOM
  // 获取实例对象
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  if(!oldDom) {
    // 如果不存在 不需要对比 直接将 Virtual DOM 转换为真实 DOM
    mountElement(virtualDOM, container)
    // 如果 Virtual DOM 类型不一样, 并且 Virtual DOM 不是组件 因为组件要单独进行处理
  } else if(virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 根据 Virtual DOM 创建真实 DOM 元素
    const newElement = createDOMElement(virtualDOM)
     // 用创建出来的真实 DOM 元素 替换旧的 DOM 元素
    oldDom.parentNode.replaceChild(newElement, oldDom)
  } else if(typeof virtualDOM.type === 'function') {
    // 组件更新，渲染比对组件
    diffComponent(virtualDOM, oldComponent, oldDom, container)
  } else if(oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if(virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDom)
    } else {
      // 更新元素属性
      updateElementNode(oldDom, virtualDOM, oldVirtualDOM)
    }
    
    // 将拥有key的子元素放在一个对象中
    let keyedElements = {}
    for(let i = 0, len = oldDom.childNodes.length; i < len; i++ ) {
      let domElement = oldDom.childNodes[i]
      if(domElement.nodeType === 1) {
        let key = domElement.getAttribute('key')
        if(key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0
    
    if(hasNoKey) {
       // 递归对比VirtualDom的子元素,通过索引
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDom, oldDom.childNodes[i])
      });
    } else {
      // 循环virtualDOM的子元素 获取子元素的key
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if(key) {
          // 到已存在的 DOM 元素对象中查找对应的 DOM 元素
          let domElement = keyedElements[key]
          // 如果找到元素就说明该元素已经存在 不需要重新渲染
          if(domElement) {
            // 虽然 DOM 元素不需要重新渲染 但是不能确定元素的位置就一定没有发生变化
            // 所以还要查看一下元素的位置
            // 看一下 oldDOM 对应的(i)子元素和 domElement 是否是同一个元素 如果不是就说明元素位置发生了变化
            if(oldDom.childNodes[i] && oldDom.childNodes[i] !== domElement) {
              // 元素位置发生了变化
             // 将 domElement 插入到当前元素位置的前面 oldDOM.childNodes[i] 就是当前位置
             // domElement 就被放入了当前位置
              oldDom.insertBefore(domElement, oldDom.childNodes[i])
            }
          } else {
            // 如果元素不存在，新增元素
            mountElement(child, oldDom, oldDom.childNodes[i])
          }
        }
      })
    }


    // 删除节点
    let oldChildNodes = oldDom.childNodes;
    // 判断节点数量
    if(oldChildNodes.length > virtualDOM.children.length) {
      if(hasNoKey) {
        // 通过索引的方式删除节点
        for(let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--){
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 通过key属性删除节点
        for(let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key

          let found = false
          
          for(let n = 0; n < virtualDOM.children.length; n++) {
            if(oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
          }
          if(!found) {
            unmountNode(oldChild)
          }
        }
      }
    }
  }
}