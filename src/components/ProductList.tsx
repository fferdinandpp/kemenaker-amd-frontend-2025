"use client";

import { useEffect } from "react";
import { useProducts } from "../store/useProducts";

export default function ProductList() {
  const { products, loadProducts, loading } = useProducts();

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border rounded p-3">
          <img
            src={p.thumbnail}
            alt={p.title}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <div className="font-semibold">{p.title}</div>
          <div className="text-sm text-gray-600">${p.price}</div>
        </div>
      ))}
    </div>
  );
}
