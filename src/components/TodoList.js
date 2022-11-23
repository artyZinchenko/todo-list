/** @module TodoList */

import { useContext, useEffect } from 'react';
import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import TodoBox from './TodoBox';
import TodosContext from '../context/TodosContext';

/**
 * @function TodoList React Component:
 * TodoList is a component that renders list of Todos from TodosContext.
 *It also allows list sorting and integration with backend
 */
const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const usersCollectionRef = collection(db, 'todos');
  /**
   * @function sortedTodos:
   * Sorting todos array of objects by 'date' and by 'complete' properties
   * @type {Array}
   */
  const sortedTodos = todos
    .sort((a, b) => {
      return a.date.seconds - b.date.seconds;
    })
    .sort((a, b) => Number(a.complete) - Number(b.complete));

  /**
   * @function updateTodo:
   * Function pushes updated todo object to backend and sets new Todo list state
   * @param {object} todo todos list item
   * @param {object} obj modified properties of todo list item
   */
  const updateTodo = async (todo, obj) => {
    console.log(todo, obj);
    try {
      const changeFileRef = doc(db, 'todos', todo.id);

      await updateDoc(changeFileRef, obj);

      const updatedTodos = todos.map((el) => {
        return el.id === todo.id ? { ...todo, ...obj } : el;
      });

      setTodos(updatedTodos);
    } catch (error) {
      let errorMessage = 'Failed to update';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
      }
      window.alert(errorMessage);
    }
  };
  /**
   * @function deleteTodo:
   * Function deletes todo from todo from firestore than sets new todo list
   * @param {object} todo todos list item
   */
  const deleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(db, 'todos', todo.id));
      const updatedTodos = todos.filter((el) => {
        return el.id !== todo.id;
      });
      setTodos(updatedTodos);
    } catch (error) {
      let errorMessage = 'Failed to delete';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
      }
      window.alert(errorMessage);
    }
  };
  /**
   * @function: getting data from firestore
   */
  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        let errorMessage = 'Failed to load data';
        if (error instanceof Error) {
          errorMessage += 'Error: ' + error.message;
        }
        window.alert(errorMessage);
      }
    };
    getTodos();
  }, []);

  return (
    <div className='container'>
      {sortedTodos.map((todo) => {
        return (
          <TodoBox
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
