import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from './router/Add';
import Main from './router/Main';
import Home from './router/Home';

function App() {
  return (
    <div className="App">
	<Router>
      <Routes>
		<Route exact path="/" element={<Home />} />
        <Route exact path="/main" element={<Main />} />
		<Route exact path="/add" element={<Add />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
