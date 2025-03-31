import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isRegistering) {
      // Register new user
      try {

        const response = await fetch('http://127.0.0.1:8000/api/student/create/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = response.json();

        if (response.ok) {
          setMessage('Account created! Please log in.');
          setIsRegistering(false);
        } else {
          setMessage(data.error || 'Failed to create account.');
        }
      } catch (error) {
        console.error('Error creating account:', error);
        setMessage('Server error. Please try again.');
      }
    } else {
      // Log in user
      try {

        const response = await fetch(`http://127.0.0.1:8000/api/student/${username}/${password}`, {
          method: 'GET',
        });
        const data = response.json();
        if (response.ok) {
          // Successful login
          onLogin(username); // Call the onLogin prop with the username
        } else {
          // Handle login failure
          setMessage(data.error || 'Invalid username or password.');
        }
      } catch (error) {
        console.error('Error signing in: ', error);
        setMessage('Server error. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">{isRegistering ? 'Sign Up' : 'Login'}</button>
      </form>
      <p>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}
        <button onClick={() => setIsRegistering(!isRegistering)} style={{ marginLeft: '10px' }}>
          {isRegistering ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
