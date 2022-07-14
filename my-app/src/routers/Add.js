import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from 'fbase';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import 'css/Add.css';

const Add = ({ userObj }) => {
  const [noteList, setNoteList] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [makeNote, setMakeNote] = useState(false);
  const [form, setForm] = useState({
    note: '',
    word: '',
    meaning: '',
    example: '',
    similiarWords: [],
    sources: [],
  });
  const initForm = () => {
    setForm({
      note: noteTitle,
      word: '',
      meaning: '',
      example: '',
      similiarWords: [],
      sources: [],
    });
  };
  const toggleMakeNote = () => {
    setMakeNote((prev) => !prev);
  };
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    const nextForm = {
      ...form,
      [name]: value,
    };
    if (name === 'note') {
      setNoteTitle(value);
    }
    setForm(nextForm);
    console.log(form);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, `${userObj.uid}`),
        {
          ...form,
          createdAt: Date.now(),
          createrId: userObj.uid,
          stack: 0,
        }
      );
      //e.target.reset();
      initForm();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const initNote = (data) => {
    const noteSet = new Set(data.map((item) => item.note));
    const notes = [...noteSet];
    setNoteList(notes);
    setNoteTitle(notes[0]);
    setForm((prev) => ({ ...prev, note: notes[0] }));
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
    });
  }, []);
  return (
    <div className="container">
      <h1>{noteTitle} 단어 추가</h1>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>단어장 선택</td>
              <td>
                {makeNote ? (
                  <>
                    <input
                      type="text"
                      id="note"
                      name="note"
                      value={form.note}
                      placeholder="새 단어장"
                      onChange={onChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleMakeNote}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <select
                      id="note"
                      name="note"
                      onChange={onChange}
                    >
                      {noteList.map((s, index) => (
                        <option key={index}>{s}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={toggleMakeNote}
                    >
                      새 노트
                    </button>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>추가할 단어</td>
              <td>
                <input
                  type="text"
                  id="word"
                  name="word"
                  value={form.word}
                  onChange={onChange}
                  onKeyDown={handleEnter}
                  required
                ></input>
              </td>
            </tr>
            <tr>
              <td>단어 뜻</td>
              <td>
                <input
                  type="text"
                  id="meaning"
                  name="meaning"
                  value={form.meaning}
                  onChange={onChange}
                  onKeyDown={handleEnter}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>예문 추가</td>
              <td>
                <textarea
                  rows="5"
                  cols="33"
                  id="example"
                  name="example"
                  value={form.example}
                  onChange={onChange}
                  onKeyDown={handleEnter}
                ></textarea>
              </td>
            </tr>

            {/* , 또는 /로 구분한 텍스트를 어레이에 넣고 form 수정하기 */}
            <tr>
              <td>
                비슷한 단어 추가
                <br />
                (,또는 /로 구분 스페이스 무관)
              </td>
              <td>
                <input
                  type="text"
                  id="similiarWords"
                  name="similiarWords"
                  value={form.similiarWords}
                  onChange={onChange}
                  onKeyDown={handleEnter}
                />
              </td>
            </tr>
            <tr>
              <td>
                출처 추가
                <br />
                (,또는 /로 구분 스페이스 무관)
              </td>
              <td>
                <input
                  type="text"
                  id="sources"
                  name="sources"
                  value={form.sources}
                  onChange={onChange}
                  onKeyDown={handleEnter}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">저장</button>
      </form>
      <Link to="/note">
        <button type="button">단어장 보기</button>
      </Link>
    </div>
  );
};

export default Add;
