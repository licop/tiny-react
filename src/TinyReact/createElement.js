/**
 * 创建Virtaul Dom
 * @param {string} type 类型 
 * @param {ojbect | null} props 属性
 * @param {createElement[]} children 子元素
 */
 export default function createElement(type, props, ...children) {
  // 由于 map 方法无法从数据中刨除元素, 所以此处将 map 方法更改为 reduce 方法
  const childElements = [].concat(...children).reduce((result, child) => {
    // 判断子元素类型 刨除 null true false
    if(child !== false && child !== true && child !== null) {
      if(child instanceof Object) {
        result.push(child)
      } else {
        // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM
        result.push(createElement('text', { textContent: child }))
      }
    }
    // 将需要保留的 Virtual DOM 放入 result 数组
    return result
  }, [])


  return {
    type,
    props: Object.assign({children: childElements}, props),
    children: childElements
  }
}


