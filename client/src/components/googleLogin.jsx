import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <div className='p-2 text-black text-center'>
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
    </div>
  );
};

export default GoogleLoginButton;