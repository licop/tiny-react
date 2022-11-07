import diff from "./diff"

export default class Component {
  // 类组件子类中调用的super(),就是调用这个constructor
  // 子类继承父类也就有了props属性
  constructor(props) {
    this.props = props
  }
  
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    // 获取最新的要渲染的virtualDOM
    let virtualDOM = this.render()
    // 获取就得virtualDOM对象进行比对
    let oldDom = this.getDOM()
    // 获取容器
    let container = oldDom.parentNode
    // 对比，更新视图
    diff(virtualDOM, container, oldDom)
  }

  setDOM(dom) {
    this._dom = dom
  }
  getDOM() {
    return this._dom 
  }
  updateProps(props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, preState) {}
  componentWillUnmount() {}
}