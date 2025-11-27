import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onLogin({ email, pass }); }}>
      <input aria-label="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input aria-label="password" placeholder="password" value={pass} onChange={e => setPass(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
