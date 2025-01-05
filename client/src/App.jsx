import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Import the Register component
import UserList from './components/UserList'; // Import the UserList component
import SignUp from './components/SignUp';
import Dashboard from './components/DashBoard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;