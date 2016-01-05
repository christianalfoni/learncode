import React from 'react';
import styles from './AddFile.css';
import icons from 'common/icons.css';

function AddFile(props) {
  const onAddFileInputChange = (event) => {
    const fileName = event.target.value;
    props.onFileNameChange({fileName: fileName});
  };

  const onAddFileInputKeyDown = (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 27) { // Escape
      props.onAddFileAborted();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onFileSubmit();
  };

  return (
    props.showInput ?
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <form onSubmit={onSubmit}>
            <input
              value={props.value}
              onChange={onAddFileInputChange}
              onKeyDown={onAddFileInputKeyDown}
              className={styles.input}
              autoFocus
              placeholder={props.placeholder}
              onBlur={props.onAddFileAborted}>
            </input>
          </form>
        </div>
      </div>
    :
      <div className={styles.addFileWrapper} onClick={props.onAddFileClick}>
        <div className={icons.addFile}/>
      </div>
  );
}

export default AddFile;