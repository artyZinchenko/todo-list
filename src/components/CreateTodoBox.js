/**
 * @module CreateTodoBox
 */

import { useContext, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import TodosContext from '../context/TodosContext';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase-config';

/**
 * @function CreateTodoBox: React Component
 * Renders Form for createing new todo list item
 * @param {obj} props includes setShowForm (func)
 */
const CreateTodoBox = ({ setShowForm }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  /**
   * @function handleSubmit:
   * controlled form submit handler
   * after date input format check saves data to firestore and sets new todo list state
   * @param {object} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const id = uuidv4();

      dayjs.extend(customParseFormat);
      const formatedDate = dayjs(date, 'DD-MM-YYYY').unix();
      const dateNow = new Date().getTime() / 1000;

      if (isNaN(formatedDate)) {
        window.alert('try DD-MM-YYYY date format');
        return;
      }

      if (dateNow > formatedDate) {
        window.alert(
          `Use date after ${dayjs.unix(dateNow).format('DD-MM-YYYY')}`
        );
        return;
      }

      const dateTimestamp = new Timestamp(formatedDate, 0);

      const newTodo = {
        complete: false,
        date: dateTimestamp,
        description,
        title,
        id,
        executed: false,
      };

      await setDoc(doc(db, 'todos', id), newTodo);
      const returnedDoc = await getDoc(doc(db, 'todos', id));

      setTodos([...todos, returnedDoc.data()]);
      setShowForm(false);
    } catch (error) {
      let errorMessage = 'Failed to create Todo';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
      }
      window.alert(errorMessage);
    }
  };

  return (
    <div className='form box flex-vertical'>
      <form onSubmit={handleSubmit}>
        <label>
          {' '}
          Title:{'  '}
          <input
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='...'
          />
        </label>
        <label>
          {' '}
          Description:{'  '}
          <textarea
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='...'
            rows='4'
          />
        </label>
        <label>
          {' '}
          Date:{'  '}
          <input
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder='DD-MM-YYYY'
          />
        </label>
        <div className='flex-horizontal'>
          <button onClick={() => setShowForm(false)}>Cancel</button>
          <button type='submit'>Save Todo</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodoBox;
