import React, { useState } from 'react';
import { Input, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate function
import { Navigate } from 'react-router-dom'; // Import Navigate component

function Login() {
  const navigate = useNavigate(); // Use the useNavigate function to redirect users

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize isAuthenticated

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const { access_token } = response.data; // Extract access_token from response
      localStorage.setItem('access_token', access_token); // Store access_token in localStorage
      setIsAuthenticated(true);
      navigate('/personal');
    } catch (error) {
      console.error('Error while making the request:', error);
      // Handle login error
    }
  };

  // If isAuthenticated is true, redirect the user to PersonalArea
  if (isAuthenticated) {
    return <Navigate to="/personal" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <Input.Password placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div>
        <Button type="primary" onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
}

export default Login;
