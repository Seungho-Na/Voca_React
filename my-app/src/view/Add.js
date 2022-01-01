import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/Add.css';

const Add = ({notes, setNotes}) =>  {
	const subjectList = Object.keys(notes);
	const [subject, setSubject] = useState(subjectList[0]);
	const [form, setForm] = useState({
    note: notes[0],
    word: '',
		meaning: '',
		example: '',
		similiarWords: [],
		sources: [],
  });
	const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
		//async await써서 클릭시 setForm이 실행된 다음의 form이 나오도록 하기
		console.log(form);
		if (e.target.name === 'note') {
			setSubject(e.target.value)
		}
  };
	
	const onSubmit = (e) => {
		e.preventDefault();
		setNotes({...notes, [subject]:[...notes[subject], form]});
		e.target.reset();
	}
	const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };
  return (
		<div>
			<form onSubmit={onSubmit}>
				<table>
					<thead>
						<tr>
							<th><h1>{subject} 단어 추가({notes[subject].length})</h1></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>단어장 선택</td>
							<td>
								<select id="note" name="note" onChange={onChange}>
									{subjectList.map((s, index) => 
										<option key={index}>
											{s}
										</option>
									)}
								</select>	
							</td>
						</tr>
						<tr>
							<td>추가할 단어</td>
							<td>
								<input type="text" id="word" name="word"
									onChange={onChange}
									onKeyDown={handleEnter}>
								</input>
							</td>
						</tr>
						<tr>
							<td>단어 뜻</td>
							<td>
								<input type="text" id="meaning" name="meaning"
									onChange={onChange}
									onKeyDown={handleEnter}>
								</input>
							</td>
						</tr>
						<tr>
							<td>예문 추가</td>
							<td>
								<textarea rows="5" cols="33" id="example" name="example"
									onChange={onChange}
									onKeyDown={handleEnter}>
								</textarea>
							</td>
						</tr>
						
						{/* , 또는 /로 구분한 텍스트를 어레이에 넣고 form 수정하기 */} 
						<tr>
							<td>비슷한 단어 추가<br/>(,또는 /로 구분 스페이스 무관)</td>
							<td><input type="text" id="similiarWords" name="similiarWords"
								onChange={onChange}
								onKeyDown={handleEnter}>
								</input>
							</td>
						</tr>
						<tr>
							<td>출처 추가<br/>(,또는 /로 구분 스페이스 무관)</td>
							<td>
								<input type="text" id="sources" name="sources"
									onChange={onChange}
									onKeyDown={handleEnter}>
								</input>
							</td>
						</tr>
					</tbody>
				</table>
				<button type="submit">저장</button>
			</form>
			<Link to='/note'><button type="button">단어장 보기</button></Link>
		</div>
  );
}

export default Add;

