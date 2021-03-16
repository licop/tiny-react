import mountNativeElement from './mountNativeElement'

export default function mountElement(virtualDOM, container) {
  // Component or NativeElement
  mountNativeElement(virtualDOM, container)
}