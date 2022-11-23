/**
 * @module TodoBox
 */

import { useState } from 'react';
import TodoFiles from './TodoFiles';
import DateDisplay from './DateDisplay';
import EditTodoBox from './EditTodoBox';
import TodoStatus from './TodoStatus';

/**
 * @function TodoBox: React Component
 * Renders todo list item from data taken ftom props
 * @param {object} props include todo(obj), updateTodo(func), deleteTodo(func)
 */
const TodoBox = ({ todo, updateTodo, deleteTodo }) => {
  const [edit, setEdit] = useState(false);

  /**
   * @funcion setTodoComplete:
   * refer to Modues/TodoList/updateTodo
   * @param {object} todo todo list item
   */
  const setTodoComplete = async (todo) => {
    if (!window.confirm(`Have you finished "${todo.title}"?`)) return;
    await updateTodo(todo, { complete: true, executed: true });
  };

  /**
   * @function setTodoDelete:
   * refer to Modules/TodoList/deleteTodo
   * @param {object} todo todo list item
   */
  const setTodoDelete = async (todo) => {
    if (!window.confirm(`Do you want to delete "${todo.title}" from Todos?`))
      return;
    await deleteTodo(todo);
  };

  return (
    <div className='todoBox'>
      {edit ? (
        <EditTodoBox todo={todo} updateTodo={updateTodo} setEdit={setEdit} />
      ) : (
        <div style={{ width: '100%' }}>
          <div className='flex-horizontal'>
            <h3>{todo.title}</h3>
            <div>
              <button onClick={() => setEdit(true)}>Edit Todo</button>
              <button onClick={() => setTodoDelete(todo)}>Delete Todo</button>
            </div>
          </div>
          <p>Description: {todo.description}</p>
          {todo.complete ? (
            <TodoStatus todo={todo} />
          ) : (
            <div>
              <button onClick={() => setTodoComplete(todo)}>
                Set finished
              </button>
            </div>
          )}

          <div className='todo-status'>
            {!todo.complete && (
              <DateDisplay todo={todo} updateTodo={updateTodo} />
            )}

            <TodoFiles id={todo.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoBox;
