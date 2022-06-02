import React, {useState} from 'react';
import '../css/Note.css';

const Note = ({notes}) =>  {
	const subjectList = Object.keys(notes);
	const [subject, setSubject] = useState(subjectList[0]);
	const [vocaToShow, setVocaToShow] = useState(notes[subject]);
	
	const onChange = async (e) => {
		// async await으로 sub변수 안쓰고 할 수 있나? 
		const sub = e.target.value;
		await setSubject(sub)
		await setVocaToShow(notes[sub]);
		console.log(subject, vocaToShow);
  };
	const onSearch = (e) => {
		const searchWord = e.target.previousSibling.value;
		console.log(searchWord);
		const results = notes[subject].filter((voca) => 
        voca.word === searchWord
    );
		setVocaToShow(results);
		console.log(results);
	}
  return (
    <div>
			{/* 왜 이게 색갈이 바뀌노.. */}
			<h1>{subject} ({notes[subject].length})</h1>
			<label htmlFor="search">단어검색</label>
			{/* 빈칸이면 에러문구 뜨게하기 */}
			<input id="search"></input>
			<button type="button" onClick={onSearch}>찾기</button>
			<div>
				<select id="note" name="note" onChange={onChange}>
					{
						subjectList.map((s, index) => 
							<option key={index}>{s}</option>
						)
					}
				</select>
			</div>
			<div className="container">
				<div>
					<h2>단어</h2>
					{
						vocaToShow.map( (voca, index) =>
							<div key={index}>{voca.word}</div>
						)
					}
				</div>
				
				<div>
					<h2>뜻</h2>
					{
						vocaToShow.map( (voca, index) =>
							<div key={index}>{voca.meaning}</div>
						)
					}
				</div>
				
				<div>
					<h2>예문</h2>
					{
						vocaToShow.map( (voca, index) =>
							<div key={index}>{voca.example}</div>
						)
					}
				</div>
			</div>
    </div>
  );
}

export default Note;

