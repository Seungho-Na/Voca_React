import React, { useState, useEffect } from 'react';
import { db } from 'fbase';
import {
  doc,
  onSnapshot,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import Word from 'components/Word';
import 'css/Note.css';

const Note = ({ userObj }) => {
  const [allWords, setAllWords] = useState([]);
  const [pageWords, setPageWords] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [showMeaing, setShowMeaning] = useState('');
  const toggleShowMeaning = () => {
    setShowMeaning((prev) => !prev);
  };
  const onToggleChange = () => {
    toggleShowMeaning();
  };
  const onSearchChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchWord(value);
  };
  const onNoteChange = (e) => {
    const {
      target: { value },
    } = e;
    setNoteTitle(value);
    setPageWords(
      allWords.filter((item) => item.note === value)
    );
  };
  const onSearch = (e) => {
    const results = pageWords.filter(
      (item) => item.word === searchWord
    );
    if (searchWord === '') {
      setPageWords(allWords);
    } else {
      setPageWords(results);
    }
  };

  const initNote = (data) => {
    const noteSet = new Set(data.map((item) => item.note));
    const notes = [...noteSet];
    setNoteList(notes);
    setNoteTitle(notes[0]);
    setPageWords(
      data.filter((item) => item.note === notes[0])
    );
    console.log(pageWords);
  };

  useEffect(() => {
    const snapShotQuery = query(
      collection(db, `${userObj.uid}`)
    );
    onSnapshot(snapShotQuery, (querySnapshot) => {
      const wordData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      initNote(wordData);
      setAllWords(wordData);
    });
  }, []);
  return (
    <div className="noteContainer">
      <span className="noteTitle">{noteTitle}</span>

      {/* 빈칸이면 에러문구 뜨게기 */}
      <div className="searchBox">
        <div>
          <label htmlFor="search">단어검색</label>
          <input
            id="search"
            value={searchWord}
            onChange={onSearchChange}
          />
          <button type="button" onClick={onSearch}>
            찾기
          </button>
        </div>
        <div />
        <div>
          <select
            id="note"
            name="note"
            onChange={onNoteChange}
          >
            {noteList.map((note, index) => (
              <option key={index}>{note}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="switch">
            <input
              type="checkbox"
              checked={showMeaing}
              onChange={onToggleChange}
            />
            <span className="slider round"></span>
          </label>
          <span>뜻 보기</span>
        </div>
      </div>

      {pageWords.map((wordObj, index) => (
        <div key={index}>
          <Word
            userObj={userObj}
            wordObj={wordObj}
            isOwner={wordObj.createrId === userObj.uid}
            showMeaing={showMeaing}
          />
        </div>
      ))}
    </div>
  );
};

export default Note;
