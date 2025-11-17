"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../../lib/api";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  if (!products.length) {
    return (
      <ProtectedRoute>
        <div className="p-6">Loading products...</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Manajemen Produk</h1>

          <Link
            href="/products/add"
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Tambah Produk
          </Link>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Gambar</th>
              <th className="p-2">Nama Produk</th>
              <th className="p-2">Harga</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">
                  <img
                    src={p.thumbnail}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2">{p.title}</td>
                <td className="p-2">${p.price}</td>
                <td className="p-2 flex space-x-4">
                  <Link
                    href={`/products/edit/${p.id}`}
                    className="text-blue-600 underline"
                  >
                    Edit
                  </Link>

                  <button
                    className="text-red-600 underline"
                    onClick={async () => {
                      await deleteProduct(p.id);
                      setProducts(products.filter((x) => x.id !== p.id));
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
