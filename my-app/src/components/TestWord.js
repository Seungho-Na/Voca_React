import React from 'react';
import {
  doc,
  query,
  collection,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'fbase';

const TestWord = ({ userObj, wordObj }) => {
  const wordRef = doc(
    db,
    `${userObj.uid}`,
    `${wordObj.id}`
  );
  const onUpdateStack = async (event) => {
    event.preventDefault();
    console.log(wordObj.stack);
    await updateDoc(wordRef, {
      stack: !!(wordObj.stack) ? wordObj.stack + 1 : 1,
    });
  };
  return (
    <form onSubmit={onUpdateStack}>
      <span>양심적으로 체크하삼</span>
      <div>{wordObj.word}</div>
      <div>스택 : {wordObj.stack}</div>

      <input type="submit" value="Checked!" />
    </form>
  );
};
export default TestWord;
