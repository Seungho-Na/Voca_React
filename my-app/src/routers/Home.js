import { Link } from 'react-router-dom';
import 'css/Home.css';

const Home = () => {
  return (
    <div className="container">
      <h1>온라인 단어장</h1>
      <h2>(made by Seungho)</h2>
      <Link to="/note">
        <button>내 단어장</button>
      </Link>
      <Link to="/add">
        <button>단어 추가하기</button>
      </Link>
      <button>시험보기</button>
      <button>시험복습</button>
    </div>
  );
};

export default Home;
