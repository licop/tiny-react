import TinyReact from "./TinyReact"

const root = document.getElementById('root')

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
)

const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <button onClick={() => alert("你好!!!!!")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
)

// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)
// }, 2000)

// TinyReact.render(virtualDOM, root)

// function Demo() {
//   return <div>Hello</div>
// }

// function Heart(props) {
//   return <div><Demo /> {props.title}</div>
// }

class Alert extends TinyReact.Component {
  constructor(props) {
    // 将props传递给父类Component
    super(props)
    this.state = {
      title: 'Default Title'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState({
      title: 'Changed Title'
    })
  }
  render () {
    console.log(this, 71)
    return <div>
      {this.props.title}
      {this.props.age}
      <div>
        {this.state.title}
        <button onClick={this.handleClick}>改变title</button>
      </div>
    </div>
  }
}

TinyReact.render(<Alert title='Hello React' age={20} />, root)