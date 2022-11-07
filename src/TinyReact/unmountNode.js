// 删除节点方法
export default function unmountNode(node) {
  // 获取节点的virtualDom对象
  const virtualDOM = node._virtualDOM

  // 文本节点可以直接删除
  if(virtualDOM.type === 'text') {
    // 直接删除
    node.remove()
    // 阻止程序向下执行
    return
  }
  // 节点是否为组件生成
  let component = virtualDOM.component
  // 说明由组件生成
  if(component) {
    component.componentWillUnmount()
  }

  // 节点是否存在ref
  if(virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 节点是否有事件属性
  Object.keys(virtualDOM.props).forEach(propName => {
    if(propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(0, 2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })
  
  // 递归删除子节点
  if(node.childNodes.length > 0) {
    for(let i = 0; i < node.childNodes.length; i++) {
      console.log(node, i, 27)
      unmountNode(node.childNodes[i])
    }
  }

  node.remove()
}
