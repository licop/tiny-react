import TinyReact from "./TinyReact";
const root = document.getElementById("root")

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div className="qiantao">
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
);

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
    <span>这是一段被修改过的内容</span>
    <button onClick={() => alert("你好！！！")}>点击我</button>
    {/* <h6>这个将会被删除</h6> */}
    2, 3
    <input type="text" value="13" />
  </div>
);


// TinyReact.render(virtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(modifyDOM, root)
// }, 2000);

// // 渲染函数组件
function Demo() {
  return <div>demo</div>
}

function Heart(props) {
  return <div>{props.message}&hearts;<Demo /></div>
}

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "default title",
    };
    // 更改 handleChange 方法中的 this 指向 让 this 指向类实例对象
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    // 调用父类中的 setState 方法更改状态
    this.setState({
      title: "changed title",
    });
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'componentWillReceiveProps')
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }

  componentDidUpdate(props) {
    console.log('componentDidUpdate', props)
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>{this.props.message}</p>
        <button onClick={this.handleChange}>change title</button>
      </div>
    );
  }
}

class DemoRef extends TinyReact.Component {
  handle() {
    let value = this.input.value;
    console.log(value);
    console.log(this.alert)
  }
  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={this.handle.bind(this)}>按钮</button>
        <Alert ref={(alert) => {this.alert = alert}} message='licop' />
      </div>
    );
  }
}

// TinyReact.render(<DemoRef />, root);

// setTimeout(() => {
//   TinyReact.render(<Alert message='licop1'/>, root);
// }, 2000)
//console.log(virtualDOM);

class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          id: 1,
          name: "张三"
        },
        {
          id: 2,
          name: "李四"
        },
        {
          id: 3,
          name: "王五"
        },
        {
          id: 4,
          name: "赵六"
        }
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.persons.push(newState.persons.shift())
    // newState.persons.splice(1, 0, { id: 100, name: "李逵" })
    newState.persons.pop()
    this.setState(newState)
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map(person => (
            <li key={person.id}>
              {person.name}
              <DemoRef />
            </li>
          ))}
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}

TinyReact.render(<KeyDemo />, root)

