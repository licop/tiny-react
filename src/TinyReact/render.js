import diff from "./diff";

/**
 * render 方法将VirtualDom转化为真实DOM
 * @param {*} virtualDOM 
 * @param {*} container 
 * @param {*} oldDom 
 */
export default function render(virtualDOM, container, oldDom = container.firstChild) {
  // 在 diff 方法内部判断是否需要对比 对比也好 不对比也好 都在 diff 方法中进行操作
  diff(virtualDOM, container, oldDom)
}