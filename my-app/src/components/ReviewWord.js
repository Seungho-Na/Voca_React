import React from 'react';
import 'css/NoteWord.css';

const ReviewWord = ({ wordObj }) => {
  return (
    <>
      <div className="word-box">
        <div className="word-box__content">
          <div className="word-box__word">
            <span>{wordObj.word}</span>
          </div>
          <div className="word-box__meaning">
            <span>{wordObj.meaning}</span>
          </div>
          <div className="word-box__example">
            <span>{wordObj.example}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewWord;
