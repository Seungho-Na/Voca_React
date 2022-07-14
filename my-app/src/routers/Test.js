import React, { useState, useEffect } from 'react';
import { db } from 'fbase';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import TestWord from 'components/TestWord';
import 'css/Test.css';

const Test = ({ userObj }) => {
  const [noteList, setNoteList] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [testWords, setTestWords] = useState([]);
  const [testNote, setTestNote] = useState('');

  const onNoteResetClick = (e) => {
    setTestNote('');
  };
  const onNoteClick = (e) => {
    const {
      target: { name: noteName },
    } = e;
    const selectedWords = allWords.filter(
      (item) => item.note === noteName
    );
    setTestNote(noteName);
    setTestWords(selectedWords);
  };
  const initTest = (data) => {
    const noteSet = new Set(data.map((item) => item.note));
    const notes = [...noteSet];
    setNoteList(notes);
    // 쿨타임 안된 단어 배제
    const filttedWords = data.filter((item) => {
      if (item.stack === 0 || item.stack === undefined) {
        return true;
      } else {
        return (
          (Date.now() - item.createdAt)/1000 >
          3600 * 24 * 2 ** (item.stack - 1)
        );
      }
    });
    setAllWords(filttedWords);
  };
  useEffect(() => {
    const snapShotQuery = query(
      collection(db, `${userObj.uid}`),
      orderBy('createdAt')
    );
    onSnapshot(snapShotQuery, (querySnapshot) => {
      const wordData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      initTest(wordData);
    });
  }, []);
  return (
    <div className={'wrap container'}>
      {testNote ? (
        <button onClick={onNoteResetClick}>
          노트 변경하기
        </button>
      ) : (
        <>
          <span>테스트할 노트를 선택하세요</span>
          <div>
            {noteList.map((note, index) => (
              <button
                key={index}
                name={note}
                onClick={onNoteClick}
              >
                {note}
              </button>
            ))}
          </div>
        </>
      )}
      {testNote && (
        <div>
          {testWords.map((wordObj, index) => (
            <TestWord
              key={index}
              userObj={userObj}
              wordObj={wordObj}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;
