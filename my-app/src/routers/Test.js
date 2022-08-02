import React, { useState, useEffect } from 'react';
import { db } from 'fbase';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import TestWord from 'components/TestWord';
import ReviewWord from 'components/ReviewWord';
import 'css/Test.css';
import { WORD_STACK, MEANING_STACK } from 'types';

const Test = ({ userObj }) => {
  const [noteList, setNoteList] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [testWords, setTestWords] = useState([]);
  const [reviewWords, setReviewWords] = useState([]);
  const [testNoteTitle, setTestNoteTitle] = useState('');
  const [count, setCount] = useState(0);
  const [stackType, setStackType] = useState('');
  const countIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const filterTestWords = (stack_type) => {
    const selectedWords = allWords.filter(
      (item) => item.note === testNoteTitle
    );
    // 쿨타임 안된 단어 배제
    const filttedWords = selectedWords.filter((item) => {
      const stack = item[stack_type];
      const latestReviewTime = item.latestReview;
      if (
        stack === undefined ||
        latestReviewTime === undefined
      ) {
        return true;
      } else {
        return (
          (Date.now() - latestReviewTime) / 1000 >
          3600 * 24 * 2.5 ** stack
        );
      }
    });
    filttedWords.sort(
      (a, b) => a[stack_type] - b[stack_type]
    );
    setTestWords(filttedWords);
  };
  const onNoteReset = () => {
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
  const onTestQuit = () => {
    setTestWords((prev) => prev.slice(0, count));
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
      orderBy('createdAt', 'desc')
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
            {count === testWords.length ? (
              <>
                <div>다 했어요 ㅊㅊ 이제 복습하세여</div>
                {reviewWords.map((wordObj, index) => (
                  <ReviewWord
                    key={index}
                    wordObj={wordObj}
                  />
                ))}
              </>
            ) : (
              <>
                <div>
                  <button onClick={onNoteReset}>
                    노트 변경하기
                  </button>
                  <button onClick={onToggleTestType}>
                    {stackType === WORD_STACK
                      ? '뜻으로 시험보기'
                      : '단어로 시험보기'}
                  </button>
                </div>
                <span className="alert-text">
                  양심적으로 체크하삼
                </span>
                <span>
                  ({count}/{testWords.length})
                </span>
                {testWords.map(
                  (wordObj, index) =>
                    count === index && (
                      <TestWord
                        key={index}
                        userObj={userObj}
                        wordObj={wordObj}
                        stackType={stackType}
                        countIncrease={countIncrease}
                        setReviewWords={setReviewWords}
                      />
                    )
                )}
                <button id="quit_btn" onClick={onTestQuit}>
                  테스트 그만하기
                </button>
              </>
            )}
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
