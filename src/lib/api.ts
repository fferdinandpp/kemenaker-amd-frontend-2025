const BASE = 'https://dummyjson.com';

const MOCK_USERS = [
  { id: 1, username: "kminchelle", password: "0lelplR" },
  { id: 2, username: "atuny0", password: "9uQFF1Lh" },
  { id: 3, username: "hbingley1", password: "CQutx25i8r" },
  { id: 4, username: "anastasia", password: "ZaqLk2Yq" },
  { id: 5, username: "rshawe2", password: "OWsTbMU8" },
];

export async function login(username, password) {
  await new Promise((r) => setTimeout(r, 400));

  const found = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!found) {
    throw new Error("Invalid credentials");
  }

  const fakeToken = btoa(
    JSON.stringify({
      sub: found.id,
      username: found.username,
      iat: Date.now(),
    })
  );

  return {
    id: found.id,
    username: found.username,
    token: fakeToken,
  };
}

export async function fetchProducts() {
  const r = await fetch(`${BASE}/products?limit=100`);
  const data = await r.json();
  return data.products || [];
}

export async function createProduct(payload) {
  const r = await fetch(`${BASE}/products/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await r.json();

  return {
    ...data,
    thumbnail: data.thumbnail || "https://via.placeholder.com/300",
  };
}

export async function updateProduct(id, payload) {
  const r = await fetch(`${BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return r.json();
}

export async function deleteProduct(id) {
  const r = await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
  return r.json();
}
