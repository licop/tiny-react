import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountElement from "./mountElement";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container) {
  // 存放组件调用后返回的 Virtual DOM 的容器
  let nextVirtualDOM = null
  // 区分函数型组件和类组件
  if(isFunctionComponent(virtualDOM)) {
    // 函数组件 调用 buildFunctionalComponent 方法处理函数组件
    nextVirtualDOM = buildFunctionalComponent(virtualDOM)
    console.log(nextVirtualDOM, 10)
  } else {

  }
  mountElement(nextVirtualDOM, container);
}

function buildFunctionalComponent(virtualDOM) {
  // 调用函数组件，并将props参数传递给函数组件
  return virtualDOM.type(virtualDOM.props || {})
}
