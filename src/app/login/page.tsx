'use client';
import React, { useState } from 'react';
import { login } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../store/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const setToken = useAuth(s => s.setToken);

  async function submit(e) {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      return setError("Username & password wajib diisi");
    }

    try {
      const data = await login(username, password);
      setToken(data.token);
      router.replace('/');
    } catch {
      setError('Login gagal. Cek kredensial.');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        Gunakan akun DummyJSON (kminchelle / 0lelplR).
      </div>
    </div>
  );
}
