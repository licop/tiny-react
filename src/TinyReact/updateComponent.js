import diff from "./diff"

// 更新组件方法
export default function updateComponent(
  virtualDOM, 
  oldComponent, 
  oldDom, 
  container) {
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  // 如果props和state变化更新组件
  if(oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    let prevProps = oldComponent.props
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 组件更新
    oldComponent.updateProps(virtualDOM.props)
    let nextVirtualDOM = oldComponent.render()
    nextVirtualDOM.compnent = oldComponent
    diff(nextVirtualDOM, container, oldDom)

    oldComponent.componentDidUpdate(prevProps)
  }
  
}