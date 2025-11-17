"use client";

import { useState } from "react";
import { createProduct } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { useProducts } from "../../../store/useProducts";

export default function AddProductPage() {
  const router = useRouter();
  const addProduct = useProducts((s) => s.addProduct);

  const [form, setForm] = useState({
    title: "",
    price: "",
    thumbnail: "",
    description: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      price: Number(form.price),
      thumbnail: form.thumbnail || "https://via.placeholder.com/300",
      description: form.description,
    };

    const created = await createProduct(payload);

    // masukkan ke store global
    addProduct(created);

    router.push("/products");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4 font-semibold">Tambah Produk</h1>

      <form onSubmit={submit} className="space-y-3">

        <input
          className="border p-2 w-full"
          placeholder="Nama produk"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="Harga"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="border p-2 w-full"
          placeholder="URL Gambar"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Deskripsi"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}
