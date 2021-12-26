import BasicButton from '../component/BasicButton';
import { Link } from 'react-router-dom';

const Main = () =>  {
  return (
    <div>
		<BasicButton>내 단어장</BasicButton>
		<Link to='/add'><BasicButton>단어 추가하기</BasicButton></Link>
		<BasicButton>시험보기</BasicButton>
		<BasicButton>시험복습</BasicButton>
    </div>
  );
}

export default Main;

