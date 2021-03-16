import mountElement from './mountElement'

export default function diff (virtualDOM, container, oldDOM) {
  // 判断oldDOM是否存在
  if(!oldDOM) {
    mountElement(virtualDOM, container)
  }
}
