import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountElement from "./mountElement";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container, oldDom) {
  // 存放组件调用后返回的 Virtual DOM 的容器
  let nextVirtualDOM = null
  let component = null
  // 区分函数型组件和类组件
  if(isFunctionComponent(virtualDOM)) {
    // 函数组件 调用 buildFunctionalComponent 方法处理函数组件
    nextVirtualDOM = buildFunctionalComponent(virtualDOM)
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }

  if(component) {
    component.componentDidMount()
    if(component.props && component.props.ref) {
       component.props.ref(component)
    }
  }

  mountElement(nextVirtualDOM, container, oldDom);
}

function buildFunctionalComponent(virtualDOM) {
  // 调用函数组件，并将props参数传递给函数组件
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
 // 实例化类组件 得到类组件实例对象 并将 props 属性传递进类组件
 const component = new virtualDOM.type(virtualDOM.props || {})
 // 调用类组件中的render方法得到要渲染的 Virtual DOM
 const nextVirtualDOM = component.render()
// 将组件的实例化对象挂载到VirtualDOM下
 nextVirtualDOM.component = component
 return nextVirtualDOM
}
