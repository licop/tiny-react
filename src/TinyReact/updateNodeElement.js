export default function updateNodeElement(newElement, virtualDOM) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props
  Object.keys(newProps).forEach(propsName => {
    const newPropsValue = newProps[propsName]
    // 判断属性是否是事件属性 onClick => click
    if(propsName.slice(0, 2) === 'on') {
      const eventName = propsName.toLowerCase().slice(2)
      newElement.addEventListener(eventName, newPropsValue)
    } else if(propsName === 'value' || propsName === 'checked') {
      newElement[propsName] = newPropsValue
    } else if(propsName !== 'children') {
      if(propsName === "className") {
        newElement.setAttribute('class', newPropsValue)
      } else {
        newElement.setAttribute(propsName, newPropsValue)
      }
    } 
  })
}
