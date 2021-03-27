// 将 Virtual DOM 对象更新为真实 DOM 对象
import diff from './diff'

export default function render(virtualDOM, container, oldDOM = container.firstChild) {
  diff(virtualDOM, container, oldDOM)
}