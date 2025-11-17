"use client";

import ProtectedRoute from '../components/ProtectedRoute';
import ProductList from '../components/ProductList';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-3xl mb-4">Dashboard</h1>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">Total Produk: (lihat halaman produk)</div>
          <div className="bg-white p-4 rounded shadow">
            Aksi cepat: <a href="/products" className="text-blue-600">Kelola Produk</a>
          </div>
        </div>
        <ProductList limit={5} />
      </div>
    </ProtectedRoute>
  );
}