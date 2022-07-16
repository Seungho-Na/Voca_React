import React from 'react';
import {
  doc,
  query,
  collection,
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
  okToGoBack,
  setOkToGoBack,
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
    countIncrease(1);
    setOkToGoBack(false);
  };
  return(
    <div className="test-box">
      <span>양심적으로 체크하삼</span>
      {stackType === WORD_STACK ? (
        <span className="test-box__question">{wordObj.word}</span>
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
      <button onClick={onUpdateStack}>Checked!</button>
      <button
        onClick={() => {
          countIncrease(1);
          setOkToGoBack(true);
        }}
      >
        패스
      </button>
      {okToGoBack && (
        <button
          onClick={() => {
            countIncrease(-1);
          }}
        >
          뒤로
        </button>
      )}
    </div>
  );
};
export default TestWord;
