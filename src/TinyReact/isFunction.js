export default function isFuction(virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === 'function'
}