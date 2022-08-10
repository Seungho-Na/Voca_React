import React, { useState, useEffect, useRef } from 'react';
import { db } from 'fbase';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import NoteWord from 'components/NoteWord';
import 'css/Note.css';
import { connectStorageEmulator } from 'firebase/storage';

const Note = ({ userObj }) => {
  const [noteList, setNoteList] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [noteWords, setNoteWords] = useState([]);
  const [pageWords, setPageWords] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [boldElement, setBoldElement] = useState(null);
  const naviRef = useRef();

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
    const results = noteWords.filter((item) => {
      if (searchWord === '') {
        return false;
      } else {
        return item.word.includes(searchWord);
      }
    });
    if (results.length === 0) {
      const preNote = allWords.filter(
        (item) => item.note === noteTitle
      );
      setNoteWords(preNote);
      setPageWords(preNote.slice(0, 10));
      return;
    }
    setNoteWords(results);
    setPageWords(results.slice(0, 10));
  };
  const onPageClick = (e) => {
    const {
      target: { id },
    } = e;
    console.log(e);
    const page_index = parseInt(id);
    // 다른 페이지 인덱스를 클릭하면
    if (e.target !== boldElement) {
      // 기존의 bold 클래스를 지우고 클릭한 요소에 bold 클래스 준다
      if (boldElement !== null) {
        boldElement.className = '';
      }
      setBoldElement(e.target);
      e.target.className = 'bold';
      console.log(boldElement);
    }

    setPageIndex(page_index);
    setPageWords(
      noteWords.slice(
        page_index * 10,
        (page_index + 1) * 10
      )
    );
  };
  const prev = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => {
        setPageWords(
          noteWords.slice((prev - 1) * 10, prev * 10)
        );
        return prev - 1;
      });
    }
  };
  const next = () => {
    if (pageIndex < Math.ceil(noteWords.length / 10) - 1) {
      setPageIndex((prev) => {
        setPageWords(
          noteWords.slice((prev + 1) * 10, (prev + 2) * 10)
        );
        return prev + 1;
      });
    }
  };
  const onTouchStart = (event) => {
    setStartX(event.touches[0].pageX);
  };
  const onTouchEnd = (event) => {
    const end_x = event.changedTouches[0].pageX;
    // 적어도 30px 이상 슬라이드 해야됨
    if (startX > end_x + 30) {
      boldElement.className = '';
      const nextLi =
        naviRef.current.children[pageIndex + 1];
      setBoldElement(nextLi);
      nextLi.className = 'bold';
      next();
    } else if (startX < end_x - 30) {
      boldElement.className = '';
      const prevLi =
        naviRef.current.children[pageIndex - 1];
      setBoldElement(prevLi);
      prevLi.className = 'bold';
      prev();
    }
  };
  const initNote = (word_data) => {
    const noteSet = new Set(
      word_data.map((item) => item.note)
    );
    const notes = [...noteSet];
    setNoteList(notes);
    // 노트 리스트의 첫번째 노트 보여주기
    setNoteTitle(notes[0]);
    const filttedWords = word_data.filter(
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
    <div className="wrap container">
      <span className="note-title">{noteTitle}</span>
      {/* 빈칸이면 에러문구 뜨게하기 */}
      <div className="header-box">
        <div className="search-box">
          <label htmlFor="search">단어검색</label>
          <input
            id="search"
            placeholder="찾는 단어를 입력하세요"
            value={searchWord}
            onChange={onSearchChange}
          />
          <button type="button" onClick={onSearch}>
            찾기
          </button>
        </div>
        <div>
          <div className="select-box">
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
        </div>
      </div>
      <div
        className="touch-box"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {pageWords.map((wordObj, index) => (
          <NoteWord
            key={index}
            userObj={userObj}
            wordObj={wordObj}
            isOwner={wordObj.createrId === userObj.uid}
          />
        ))}
      </div>
      <div>
        <ul className="page-navi" ref={naviRef}>
          {[
            ...Array(
              Math.ceil(noteWords.length / 10)
            ).keys(),
          ].map((page_index) => (
            <li key={page_index}>
              <div id={page_index} onClick={onPageClick}>
                {page_index + 1}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Note;
