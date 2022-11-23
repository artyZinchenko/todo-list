const Header = ({ setShowForm, showForm }) => {
  return (
    <div className='header'>
      <h3>Todo List</h3>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Create new Todo</button>
      )}
    </div>
  );
};

export default Header;
