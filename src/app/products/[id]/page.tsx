"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProducts } from "../../../store/useProducts";
import { updateProduct } from "../../../lib/api";

export default function EditProductPage() {
  const { products, loadProducts } = useProducts();
  const router = useRouter();
  const params = useParams(); // { id }
  const productId = Number(params.id);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) loadProducts();
    else {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setTitle(product.title);
        setPrice(String(product.price));
        setThumbnail(product.thumbnail);
      }
    }
  }, [products, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updated = await updateProduct(productId, {
      title,
      price: Number(price),
      thumbnail,
    });

    // update store
    const { removeProduct, addProduct } = useProducts.getState();
    removeProduct(productId);
    addProduct(updated);

    setLoading(false);
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6 space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Thumbnail URL</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
