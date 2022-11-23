import { createContext } from 'react';

const TodosContext = createContext({
  todos: [],
  setTodos: () => {},
});

export default TodosContext;
