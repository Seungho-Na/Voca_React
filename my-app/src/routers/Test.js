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
import { WORD_STACK, MEANING_STACK } from 'types';

const Test = ({ userObj }) => {
  const [noteList, setNoteList] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [testWords, setTestWords] = useState([]);
  const [testNoteTitle, setTestNoteTitle] = useState('');
  const [count, setCount] = useState(0);
  const [stackType, setStackType] = useState('');
  const [okToGoBack, setOkToGoBack] = useState(false);
  const countIncrease = (i) => {
    if (count === 0 && i === -1) {
      return;
    }
    setCount((prev) => prev + i);
  };
  const filterTestWords = (stack_type) => {
    const selectedWords = allWords.filter(
      (item) => item.note === testNoteTitle
    );
    // 쿨타임 안된 단어 배제
    const filttedWords = selectedWords.filter((item) => {
      const stack = item[stack_type];
      const createdTime = item.createdAt;
      if (stack === undefined) {
        return true;
      } else {
        return (
          (Date.now() - createdTime) / 1000 >
          3600 * 24 * 2 ** (stack - 1)
        );
      }
    });
    setTestWords(filttedWords);
  };
  const onNoteReset = (e) => {
    setTestNoteTitle('');
    setStackType('');
    setCount(0);
  };
  const onNoteSelect = (e) => {
    const {
      target: { name: noteName },
    } = e;
    setTestNoteTitle(noteName);
  };
  const onToggleTestType = () => {
    // stack이 수정될때마다 allWords도 최신화 되므로
    // filterTestWords 함수 한번 실행해주면 된다
    if (stackType === WORD_STACK) {
      setStackType(MEANING_STACK);
      filterTestWords(MEANING_STACK);
    } else if (stackType === MEANING_STACK) {
      setStackType(WORD_STACK);
      filterTestWords(WORD_STACK);
    }
    setCount(0);
  };
  const onTestTypeSelect = (e) => {
    const {
      target: { name: testType },
    } = e;
    if (testType === 'wordTest') {
      setStackType(WORD_STACK);
      filterTestWords(WORD_STACK);
    } else if (testType === 'meaningTest') {
      setStackType(MEANING_STACK);
      filterTestWords(MEANING_STACK);
    }
  };
  const initTest = (word_data) => {
    const noteSet = new Set(
      word_data.map((item) => item.note)
    );
    const notes = [...noteSet];
    setNoteList(notes);
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
      setAllWords(wordData);
    });
  }, []);
  return (
    <div className={'wrap container'}>
      {testNoteTitle ? (
        stackType ? (
          <>
            <button onClick={onNoteReset}>
              노트 변경하기
            </button>
            <button onClick={onToggleTestType}>
              {stackType === WORD_STACK
                ? '뜻으로 시험보기'
                : '단어로 시험보기'}
            </button>
            <div>
              {testWords.map(
                (wordObj, index) =>
                  count === index && (
                    <TestWord
                      key={index}
                      userObj={userObj}
                      wordObj={wordObj}
                      stackType={stackType}
                      countIncrease={countIncrease}
                      okToGoBack={okToGoBack}
                      setOkToGoBack={setOkToGoBack}
                    />
                  )
              )}
              {count === testWords.length && (
                <>
                  <div>다 했어요 ㅊㅊ</div>
                  {okToGoBack && <button
                    onClick={() => {
                      countIncrease(-1);
                    }}
                  >
                    뒤로
                  </button>}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={onTestTypeSelect}
              name="wordTest"
            >
              단어로 시험보기
            </button>
            <button
              onClick={onTestTypeSelect}
              name="meaningTest"
            >
              뜻으로 시험보기
            </button>
          </>
        )
      ) : (
        <>
          <span>테스트할 노트를 선택하세요</span>
          <div>
            {noteList.map((note, index) => (
              <button
                key={index}
                name={note}
                onClick={onNoteSelect}
              >
                {note}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Test;
