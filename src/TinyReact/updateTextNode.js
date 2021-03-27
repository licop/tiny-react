export default function updateTextNode (virtualDOM, oldVirtualDom, oldDOM) {
  if(virtualDOM.props.textContent !== oldVirtualDom.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent
    oldDOM._virtualDOM = virtualDOM
  }
}
