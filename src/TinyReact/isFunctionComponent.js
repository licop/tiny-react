// Virtual DOM 是否为函数型组件
// 条件有两个: 1. Virtual DOM 的 type 属性值为函数 2. 函数的原型对象中不能有render方法
import isFunction from "./isFunction";

export default function isFunctionComponent(virtualDOM) {
  const type = virtualDOM && virtualDOM.type;
  
  return (type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)) 
}
