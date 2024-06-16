// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Reg from './Reg';
import Login from './Login';
import ProtectedRoute from './LocalStorage.jsx'; // Import the consolidated ProtectedRoute component
import PersonalArea from './PersonalArea.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reg" element={<Reg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personal" element={<PersonalArea />} /> {/* Protected route */}
      </Routes>
    </Router>
  );
}

export default App;
