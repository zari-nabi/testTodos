import React, { Component } from 'react';
import axios from "axios";
import logo from './logo.svg';
import loading from "./loading3.gif";
import './App.css';
import ListItem from "./ListItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: 0,
      notification: null,
      loading:true,
      todos: []
    }
    this.hanleChange = this.hanleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.alertTodo = this.alertTodo.bind(this);

    this.apiUrl = "https://5c44441657499f00143cedf5.mockapi.io";
  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    
    setTimeout(() => {
     this.setState({
      todos: response.data,
      loading:false
    }) 
    }, 1000);
  }

  hanleChange(event) {
    this.setState({
      newTodo: event.target.value
    })
  }

  alertTodo(notification) {
    this.setState({
      notification
    })

    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 2000);
  }

  // generateId() {
  //   const lastTodo = this.state.todos[this.state.todos.length - 1];
  //   if (lastTodo) {
  //     return lastTodo.id + 1
  //   }
  //   return 1;
  // }

  async addTodo() {

    // const newTodo = {
    //   id: this.generateId(),
    //   name: this.state.newTodo
    // }

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: '',
    })

    this.alertTodo("Todos Add Successfully")
  }

  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);
    delete todos[index];

    this.setState({
      todos,
    })

    this.alertTodo("Todos Delete Successfully")
  }

  editTodo(index) {
    const todo = this.state.todos;
    this.setState({
      editing: true,
      newTodo: todo[index].name,
      editingIndex: index
    })
  }

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];
    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });
   // todo.name = this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({
      editing: false,
      todos,
      newTodo: '',
    })

    this.alertTodo("Todos Update Successfully")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Curd
          </a>
        </header>

        <div className="container">
          {/* <h2 className="text-center p-4">Todos App</h2> */}
          {this.state.notification &&
            <div className="alert alert-success mt-3">
              <p className="text-center">{this.state.notification}</p>
            </div>
          }
          <input
            name="todo"
            className="my-4"
            placeholder="Add New Todo"
            value={this.state.newTodo}
            onChange={this.hanleChange}
          />
          <button
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            className="btn-info mb-3 form-control"
            disabled={this.state.newTodo.length < 5}>
            {this.state.editing ? "Update Todo" : "AddTodo"}
          </button>
          {this.state.loading &&
          <img src={loading}/>}
          {(!this.state.editing || this.state.loading) &&
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <ListItem
                  key={item.id}
                  item={item}
                  editTodo={() => { this.editTodo(index) }}
                  deleteTodo={() => { this.deleteTodo(index) }}
                />
              })}
            </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
