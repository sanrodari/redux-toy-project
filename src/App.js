import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { createTodo, fetchTodos } from './actions';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = { description: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createTodo } = this.props;
    const { description } = this.state;
    createTodo({ description }).then(() => {
      this.setState({ description: '' });
    });
  }

  handleChange(e) {
    this.setState({ description: e.target.value });
  }

  render() {
    const { loading, error, todos } = this.props;
    const { description } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {loading ?
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> :
          <form onSubmit={this.handleSubmit}>
            <label>
              Description:
              <input name="description" value={description} onChange={this.handleChange} />
            </label>

            <ul>
              {todos.map(t => (
                <li key={t.id}>
                  Description: {t.description}
                </li>
              ))}
            </ul>
          </form>
        }

        {error ?
          <div style={{ color: 'red' }}>There's something wrong</div> :
          null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { createTodo, fetchTodos })(App);
