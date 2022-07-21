import React from 'react';
import {
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'fbase';
import { WORD_STACK, MEANING_STACK } from 'types';
import 'css/TestWord.css';

const TestWord = ({
  userObj,
  wordObj,
  stackType,
  countIncrease,
  setReviewWords
}) => {
  const wordRef = doc(
    db,
    `${userObj.uid}`,
    `${wordObj.id}`
  );
  const onUpdateStack = async (event) => {
    event.preventDefault();
    await updateDoc(wordRef, {
      [stackType]:
        wordObj[stackType] === undefined
          ? 1
          : wordObj[stackType] + 1,
    });
    countIncrease();
  };
  return (
    <div className="test-box">
      {stackType === WORD_STACK ? (
        <span className="test-box__question">
          {wordObj.word}
        </span>
      ) : (
        <span className="test-box__question">
          {wordObj.meaning}
        </span>
      )}
      <div className="test-box__stack">
        {wordObj[stackType] === undefined
          ? 0
          : wordObj[stackType]}
        &nbsp;번째 복습임
      </div>
      <button className="btn" onClick={onUpdateStack}>
        <span>Checked!</span>
      </button>
      <button
        className="btn red"
        onClick={() => {
          countIncrease();
          setReviewWords((prew) => [...prew, wordObj])
        }}
      >
        <span>패스</span>
      </button>
    </div>
  );
};
export default TestWord;
