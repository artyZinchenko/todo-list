/**
 * @module DateDisplay
 */

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

/**
 * @function DateDisplay: React component
 * Renders todo list item date in TodoBox
 * @param {obj} props include todo(obj), updateTodo(func)
 */
const DateDisplay = ({ todo, updateTodo }) => {
  const [complete, setComplete] = useState(todo.complete);

  /**
   * @function checkElapsed
   * checks if current date is after assigned date
   * @returns {boolean}
   */
  const checkElapsed = () => {
    const dateNow = new Date().getTime() / 1000;

    return dateNow > todo.date.seconds ? true : false;
  };

  /**
   * @function useEffect:
   * if checkedElapsed(true) sets complete: true to firestore
   */
  useEffect(() => {
    if (complete) return;

    const compareTime = async () => {
      try {
        if (checkElapsed()) {
          setComplete(true);
          await updateTodo(todo, { complete: true });
        }
      } catch (error) {
        let errorMessage = 'Failed set Todo competion status';
        if (error instanceof Error) {
          errorMessage += 'Error: ' + error.message;
        }
        window.alert(errorMessage);
      }
    };
    compareTime();
  }, []);

  const parsedDate = dayjs.unix(todo.date.seconds).format('dddd, DD MMM YYYY');

  return <p>Complete until: {parsedDate}</p>;
};

export default DateDisplay;
