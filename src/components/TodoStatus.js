import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';

const TodoStatus = ({ todo }) => {
  return (
    <div>
      {todo.executed ? (
        <div
          className='flex-horizontal'
          style={{ justifyContent: 'flex-start' }}
        >
          <TiTick
            style={{ fontSize: '2em', color: 'green', marginLeft: '-10px' }}
          />
          <p style={{ display: 'inline' }}>task complete</p>
        </div>
      ) : (
        <div
          className='flex-horizontal'
          style={{ justifyContent: 'flex-start' }}
        >
          <ImCross style={{ fontSize: '1.2em', color: 'red' }} />
          <p style={{ display: 'inline', marginLeft: '10px' }}>task failed</p>
        </div>
      )}
    </div>
  );
};

export default TodoStatus;
