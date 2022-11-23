import TodoList from './components/TodoList';
import React, { useState } from 'react';
import TodosContext from './context/TodosContext';
import './styles/styles.css';
import Header from './components/Header';
import CreateTodoBox from './components/CreateTodoBox';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const value = { todos, setTodos };

  return (
    <TodosContext.Provider value={value}>
      <div>
        <Header showForm={showForm} setShowForm={setShowForm} />
        <div className='container'>
          {showForm && <CreateTodoBox setShowForm={setShowForm} />}
          <TodoList />
        </div>
      </div>
    </TodosContext.Provider>
  );
};

export default App;
