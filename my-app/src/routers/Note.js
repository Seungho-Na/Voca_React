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
  const [noteList, setNoteList] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [noteWords, setNoteWords] = useState([]);
  const [pageWords, setPageWords] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [showMeaing, setShowMeaning] = useState('');
  const [onActive, setOnActive] = useState(false);
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
  // 노트 카테고리에 맞는 단어 선택
  const onNoteChange = (e) => {
    const {
      target: { value },
    } = e;
    setNoteTitle(value);
    console.log(allWords);
    const changedWords = allWords.filter(
      (item) => item.note === value
    );
    setNoteWords(changedWords);
    setPageWords(changedWords.slice(0, 10));
  };
  const onSearch = (e) => {
    const results = noteWords.filter(
      (item) => item.word === searchWord
    );
    if (searchWord === '') {
      setNoteWords(allWords);
    } else {
      setNoteWords(results);
    }
  };

  const onPageClick = (e) => {
    const {
      target: { id },
    } = e;
    const pageIndex = parseInt(id);
    setPageWords(
      noteWords.slice(pageIndex * 10, (pageIndex + 1) * 10)
    );
  };
  const initNote = (data) => {
    const noteSet = new Set(data.map((item) => item.note));
    const notes = [...noteSet];
    setNoteList(notes);
    // 노트 리스트의 첫번째 노트 보여주기
    setNoteTitle(notes[0]);
    const filttedWords = data.filter(
      (item) => item.note === notes[0]
    );
    setNoteWords(filttedWords);
    // 10개씩 나누고 1페이지 먼저 보여주기
    setPageWords(filttedWords.slice(0, 10));
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
      <div>
        <ul className="page_navi">
          {[
            ...Array(
              Math.ceil(noteWords.length / 10)
            ).keys(),
          ].map((pageIndex) => (
            <li key={pageIndex}>
              <div id={pageIndex} onClick={onPageClick}>
                {pageIndex + 1}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Note;
