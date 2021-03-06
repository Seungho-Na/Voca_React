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
        }
      );
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
      <h1>{noteTitle} ?????? ??????</h1>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>????????? ??????</td>
              <td>
                {makeNote ? (
                  <>
                    <input
                      type="text"
                      id="note"
                      name="note"
                      value={form.note}
                      placeholder="??? ?????????"
                      onChange={onChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleMakeNote}
                    >
                      ??????
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
                      ??? ??????
                    </button>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td>????????? ??????</td>
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
              <td>?????? ???</td>
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
              <td>?????? ??????</td>
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

            {/* , ?????? /??? ????????? ???????????? ???????????? ?????? form ???????????? */}
            <tr>
              <td>
                ????????? ?????? ??????
                <br />
                (,?????? /??? ?????? ???????????? ??????)
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
                ?????? ??????
                <br />
                (,?????? /??? ?????? ???????????? ??????)
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
        <button type="submit">??????</button>
      </form>
      <Link to="/note">
        <button type="button">????????? ??????</button>
      </Link>
    </div>
  );
};

export default Add;
