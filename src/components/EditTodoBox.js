/**
 * @module EditTodoBox
 */

import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Timestamp } from 'firebase/firestore';

/**
 * @function EditTodoBox: React Component
 * if TodoBox component's state 'edit' set to true renders editing box
 * @param {object} props include todo(obj), updateTodo(func), setEdit(func)
 */
const EditTodoBox = ({ todo, updateTodo, setEdit }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const initialDate = dayjs.unix(todo.date.seconds).format('DD-MM-YYYY');
  const [date, setDate] = useState(initialDate);

  /**
   * @function handleSubmit: controlled form handler
   * after input data format check, updates todo list item
   * @param {object} event event object
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

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

    await updateTodo(todo, { title, description, date: dateTimestamp });
    setEdit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {' '}
        Title:{'  '}
        <input
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        {' '}
        Description:{'  '}
        <input
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        {' '}
        Date:{'  '}
        <input
          name='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <div className='flex-horizontal'>
        <button type='submit'>Save changes</button>
        <button onClick={() => setEdit(false)}>Cancel changes</button>
      </div>
    </form>
  );
};

export default EditTodoBox;
