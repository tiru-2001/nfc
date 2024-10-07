import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './page/home/Home';
import Parent from './page/Parent/Parent';
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Parent />} />

          <Route path="/user/:userId" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
