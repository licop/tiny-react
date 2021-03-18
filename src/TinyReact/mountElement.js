import isFuction from './isFunction'
import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'
import isFunction from './isFunction'

export default function mountElement(virtualDOM, container) {
  if(isFunction(virtualDOM)) {
    // Component
    mountComponent(virtualDOM, container)
    console.log(virtualDOM)
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container)
  }
  
}