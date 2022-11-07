// 为dom对象添加属性
export default function updateElementNode(element, virtualDOM, oldVirtualDOM = {}) {
  const newProps = virtualDOM.props || {};
  const oldProps = oldVirtualDOM.props || {};

  Object.keys(newProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    
    if(newPropsValue !== oldPropsValue) {
      // 判断属性是否为事件属性 onClick -> click
      if(propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        element.addEventListener(eventName, newPropsValue)
        // 删除原有的事件的事件处理函数
        if(oldPropsValue) {
          element.removeEventListener(eventName, oldPropsValue) 
        }

      // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
      } else if(propName === 'value' || propName === 'checked') {
        element[propName] = newPropsValue
      } else if(propName !== 'children') {
        if(propName === 'className') {
          // className 属性单独处理 不直接在元素上添加 class 属性是因为 class 是 JavaScript 中的关键字
          element.setAttribute('class', newPropsValue)
        } else {
          // 普通属性
          element.setAttribute(propName, newPropsValue)
        }
      }
    }
    
  })
  // 判断属性被删除的情况
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if(!newPropsValue) {
      // 属性被删除了
      if(propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        element.removeEventListener(eventName, oldPropsValue)
      } else if(propName !== 'children') {
        if(propName == 'className') {
          element.removeAttribute('class', propName)
        } else {
          element.removeAttribute(propName)
        }
        
      }
    }
  })
}