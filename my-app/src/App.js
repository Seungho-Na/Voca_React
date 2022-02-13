import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from './view/Add';
import Main from './view/Main';
import Home from './view/Home';
import Note from './view/Note';

function App() {
	const [notes, setNotes] = useState({"일드/애니":[], "JLPT1급":[]});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/add" element={<Add notes={notes} setNotes={setNotes}/>} />
          <Route exact path="/note" element={<Note notes={notes}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
