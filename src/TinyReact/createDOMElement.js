import mountElement from "./mountElement";
import updateElementNode from "./updateElementNode";

export default function createDOMElement(virtualDOM) {
  let newElement = null
  if(virtualDOM.type === 'text') {
    // 创建文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 创建元素节点
    newElement = document.createElement(virtualDOM.type)
    // 更新元素属性
    updateElementNode(newElement, virtualDOM)
  }
  // 将virtualDOM挂载到真实dom对象的属性中，方便对比是获取原来的virtualDOM
  newElement._virtualDOM = virtualDOM
  // 递归渲染子元素
  virtualDOM.children.forEach(child => {
    // 因为不确定子元素是 NativeElement 还是 Component 所以调用 mountElement 方法进行确定
    mountElement(child, newElement)
  });

  if(virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }

  return newElement
}