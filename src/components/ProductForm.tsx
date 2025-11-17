'use client';
import React, { useState } from 'react';
import { createProduct, updateProduct } from '../lib/api';
import { getToken } from '../lib/auth';
import { useRouter } from 'next/navigation';

export default function ProductForm({ initial, id }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [price, setPrice] = useState(initial?.price || 0);
  const [imagePreview, setImagePreview] = useState(initial?.images?.[0] || null);
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    const payload = { title, description, price };
    if (id) await updateProduct(id, payload, getToken());
    else await createProduct(payload, getToken());
    router.push('/products');
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3 max-w-xl">
      <div>
        <label className="block text-sm">Nama</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm">Deskripsi</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm">Harga</label>
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border p-2 rounded" />
      </div>
      <button className="bg-blue-600 text-white px-3 py-1 rounded">Simpan</button>
    </form>
  );
}