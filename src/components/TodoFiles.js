/**
 * @module TodoFiles
 */

import { useState, useEffect } from 'react';
import {
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  deleteObject,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../firebase-config';
import { v4 } from 'uuid';
import FilesList from './FilesList';

/**
 * @function TodoFiles: React Component
 * Renders files in TodoBox
 * @param {string} id firestore document id
 */
const TodoFiles = ({ id }) => {
  const [display, setDisplay] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const referense = `files/${id}`;
  const fileListRef = ref(storage, referense);

  /**
   * @function useEffet downloads files from firebase storage, sets fileList state for TodoBox component
   */
  useEffect(() => {
    let arr = [];

    const getFiles = async () => {
      try {
        const allFiles = await listAll(fileListRef);
        for (const file of allFiles.items) {
          const url = await getDownloadURL(file);
          const meta = await getMetadata(file);
          arr.push([url, meta]);
        }
        setFileList(arr);
      } catch (error) {
        let errorMessage = 'Failed to load files';
        if (error instanceof Error) {
          errorMessage += 'Error: ' + error.message;
        }
        window.alert(errorMessage);
      }
    };
    getFiles();
  }, []);

  let fileNames = new Map();
  /**
   * @function creating Map which will be used for proper file name display
   */
  fileList.map((el) => {
    const parsedName = el[1].name.slice(
      0,
      el[1].name.indexOf('-IDfireStoreUU')
    );

    fileNames.set(el[1].name, parsedName);
  });

  /**
   * @function uploadFile:
   * Uploads files to firebase storage file with a same id
   * @param {string} id fileList item object property
   */
  const uploadFile = async (id) => {
    if (fileUpload == null) return;
    try {
      const fileRef = ref(
        storage,
        `files/${id}/${fileUpload.name + '-IDfireStoreUU' + v4()}`
      );

      const uploadedFile = await uploadBytes(fileRef, fileUpload);
      const uploadedFileURL = await getDownloadURL(uploadedFile.ref);

      setFileList([...fileList, [uploadedFileURL, uploadedFile.metadata]]);
      alert('file uploaded');
    } catch (error) {
      let errorMessage = 'Failed to upload files';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
      }
      window.alert(errorMessage);
    }
  };
  /**
   * @function deleteFile:
   * Deletes file from firebase storage based on file path, than downloads new Storage files and sets fileList state to it
   * @param {Array} file fileList item
   */
  const deleteFile = async (file) => {
    try {
      const pathToFile = file[1].fullPath;
      const fileName = fileNames.get(file[1].name);

      if (!window.confirm(`Do you want to delete ${fileName}`)) return;

      const fileRef = ref(storage, pathToFile);
      await deleteObject(fileRef);

      const updatedFiles = fileList.filter((el) => {
        return el !== file;
      });
      setFileList(updatedFiles);
    } catch (error) {
      let errorMessage = 'Failed to delete files';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
      }
      window.alert(errorMessage);
    }
  };

  const buttonText = display ? 'Hide files' : 'Show files';

  return (
    <>
      {fileList.length > 0 && (
        <button onClick={() => setDisplay(!display)}>{buttonText}</button>
      )}

      {display && (
        <FilesList
          fileList={fileList}
          deleteFile={deleteFile}
          fileNames={fileNames}
        />
      )}
      <div className='file-input'>
        <input
          id='fileInput'
          type='file'
          onChange={(event) => setFileUpload(event.target.files[0])}
        />
        {fileUpload && (
          <button onClick={() => uploadFile(id)}>Upload file</button>
        )}
      </div>
    </>
  );
};

export default TodoFiles;
