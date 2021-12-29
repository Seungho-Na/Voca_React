const Note = ({voca, setVoca}) =>  {
  return (
    <div>
			{/* 왜 이게 색갈이 바뀌노.. */}
			<h1>단어장입니당</h1>
			{
				voca.map( (v, index) => {
					<div key={index}>
						{v.note}
						{v.word}
						{v.meaning}
						{v.example}
					</div>
				})
			}
    </div>
  );
}

export default Note;

