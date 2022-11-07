import createDOMElement from "./createDOMElement";
import unmountNode from "./unmountNode";


export default function mountNativeElement(virtualDOM, container, oldDom) {
  const newElement = createDOMElement(virtualDOM)
  
  // 将转换后的DOM对象放置在页面中
  if(oldDom) {
    container.insertBefore(newElement, oldDom)
  } else {
    container.appendChild(newElement)
  }
  
  // 判断旧的对象是否存在 如果存在删除
  if(oldDom) {
    unmountNode(oldDom)
  }
  
  // 获取实例组件对象
  let component = virtualDOM.component
  if(component) {
    // 实例化组件继承Component的setDOM方法，保存dom对象
    component.setDOM(newElement)
  }
}

