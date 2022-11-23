const FilesList = ({ fileList, deleteFile, fileNames }) => {
  return (
    <ul>
      {fileList.map((file) => {
        return (
          <li className='flex-horiontal' key={file[0]}>
            <p style={{ display: 'inline' }}>
              file:{'  '}
              {fileNames.get(file[1].name)}
            </p>
            <div style={{ display: 'inline' }}>
              <a href={file[0]} target='_blank' rel='noopener noreferrer'>
                <button>Open</button>
              </a>
              <button onClick={() => deleteFile(file)}>Delete file</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FilesList;
