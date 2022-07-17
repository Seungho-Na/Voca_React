import React, { useState,useEffect } from 'react';
import {
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'fbase';
import 'css/NoteWord.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faX,
} from '@fortawesome/free-solid-svg-icons';

const NoteWord = ({
  userObj,
  wordObj,
  isOwner,
  showMeaing,
}) => {
  const [editing, setEditing] = useState(false);
  const [newMean, setNewMean] = useState('');
  const wordRef = doc(
    db,
    `${userObj.uid}`,
    `${wordObj.id}`
  );
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onDeleteClick = async () => {
    const ok = window.confirm('ㄹㅇ지울거임?');
    //confirm의 반환값은 boolean
    if (ok) {
      await deleteDoc(wordRef);
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMean(value);
  };
  const onUpdate = async (event) => {
    event.preventDefault();
    await updateDoc(wordRef, {
      meaning: newMean,
    });
    setEditing(false);
  };
  useEffect(() => {
    setNewMean(wordObj.meaning);
  }, [wordObj]);
  return (
    <>
      <div className="word-box">
        <div className="word-box__content">
          <div className="word-box__word">
            <span>{wordObj.word}</span>
          </div>
          <div className="word-box__meaning">
            {showMeaing && <span>{wordObj.meaning}</span>}
          </div>
          <div className="word-box__example">
            <span>{wordObj.example}</span>
          </div>
        </div>
        {isOwner && (
          <>
            <FontAwesomeIcon
              icon={faPencil}
              onClick={toggleEditing}
              className="pencil"
            />
            <FontAwesomeIcon
              icon={faX}
              onClick={onDeleteClick}
              className="delete"
            />
          </>
        )}
      </div>
      {editing && (
        <>
          <form onSubmit={onUpdate}>
            <input
              type="text"
              placeholder="Edit meaning of word"
              value={newMean}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      )}
    </>
  );
};

export default NoteWord;
