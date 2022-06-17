import React, { useState } from 'react';
import {
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'fbase';

const Word = ({ userObj, wordObj, isOwner }) => {
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
    const ok = window.confirm(
      'ㄹㅇ지울거임?'
    );
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
    setNewMean('');
    setEditing(false);
  };
  return (
    <>
      {editing ? (
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
      ) : (
        <>
          {wordObj.word}&nbsp;
          {wordObj.meaning}&nbsp;
          {wordObj.example}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>
                단어 삭제
              </button>
              <button onClick={toggleEditing}>
                단어 수정
              </button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Word;
