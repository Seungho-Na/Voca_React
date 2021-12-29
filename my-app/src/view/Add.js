import React, {useState} from 'react';
import '../css/Add.css';

const Add = ({voca, setVoca}) =>  {
	const notes = ["일드/애니", "JLPT1급"];
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
		console.log(nextForm);
  };
	
	const onSubmit = (e) => {
		e.preventDefault();
		{/* 쓴 텍스트 전부 없애기 */}
		setVoca( (voca) => [...voca, form])
		console.log(voca);
	}
  return (
		<div>
			<form onSubmit={onSubmit}>
				<table>
					<thead>
						<tr>
							<th><h1>새 단어장 추가({voca.length})</h1></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>단어장 선택</td>
							<td>
								<select id="note" name="note" onChange={onChange}>
									{/* note 개수에 따라 자동으로 option 태그 생성하기 */} 
									<option>{notes[0]}</option>
									<option>{notes[1]}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>추가할 단어</td>
							<td><input type="text" id="word" name="word" onChange={onChange}></input></td>
						</tr>
						<tr>
							<td>단어 뜻</td>
							<td><input type="text" id="meaning" name="meaning" onChange={onChange}></input></td>
						</tr>
						<tr>
							<td>예문 추가</td>
							<td><textarea rows="5" cols="33" id="example" name="example" onChange={onChange}></textarea></td>
						</tr>
						
						{/* , 또는 /로 구분한 텍스트를 어레이에 넣고 form 수정하기 */} 
						<tr>
							<td>비슷한 단어 추가<br/>(,또는 /로 구분 스페이스 무관)</td>
							<td><input type="text" id="similiarWords" name="similiarWords" onChange={onChange}></input></td>
						</tr>
						<tr>
							<td>출처 추가<br/>(,또는 /로 구분 스페이스 무관)</td>
							<td><input type="text" id="sources" name="sources" onChange={onChange}></input></td>
						</tr>
					</tbody>
				</table>
				<button type="submit">저장</button>
			</form>
		</div>
  );
}

export default Add;

