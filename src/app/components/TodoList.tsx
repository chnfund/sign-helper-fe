import * as React from 'react';
import {connect} from 'react-redux';

import {deleteTodo, fetchTodos, getVisibleTodos, toggleTodo} from '@src/app/reducers/todo';
import {AppState, TodoItemState} from '@src/types/application';

const TodoItem = ({id, isComplete, name, toggleTodoHandler, deleteTodoHandler}) => (
  <li>
    <span className="delete-item">
      <button onClick={() => deleteTodoHandler(id)}>X</button>
    </span>
    <input
      type="checkbox"
      checked={isComplete}
      onChange={() => toggleTodoHandler(id)}
    />
    {name}
  </li>
);

type PropsType = {
  todos: TodoItemState[];
  match: any;
  fetchTodos: () => any;
  toggleTodoHandler: any;
  deleteTodoHandler: any;
};

class TodoList extends React.Component<PropsType> {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div className="Todo-list">
        <ul>
          {this.props.todos
            .map(todo =>
              <TodoItem
                key={todo.id}
                {...todo}
                toggleTodoHandler={this.props.toggleTodoHandler}
                deleteTodoHandler={this.props.deleteTodoHandler}
              />)
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  (state: AppState, ownProps: PropsType) => ({
    todos: getVisibleTodos(
      state.todo.todos,
      ownProps.match.params.filter
    ),
  }),
  {
    fetchTodos: fetchTodos,
    toggleTodoHandler: toggleTodo,
    deleteTodoHandler: deleteTodo,
  }
)(TodoList);
