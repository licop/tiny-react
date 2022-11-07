import mountElement from "./mountElement"
import updateComponent from './updateComponent'

// 比对组件
export default function diffComponent(
  virtualDOM, 
  oldComponent, 
  oldDom, 
  container) {
  if(isSameComponent(virtualDOM, oldComponent)) {
    // 用一个组件，做组件更新操作
    updateComponent(virtualDOM, oldComponent, oldDom, container)
  } else {
    // 不是同一个组件 直接将组件内容显示在页面中
    mountElement(virtualDOM, container, oldDom)
  }
}

// 判断是否为一个组件
function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
