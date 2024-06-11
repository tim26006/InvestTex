import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Reg from './Reg';
//import Login from './Login';

import PersonalArea from './PersonalArea';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/personal" element={<PersonalArea />} />
      </Routes>
    </Router>
  );
}

export default App;