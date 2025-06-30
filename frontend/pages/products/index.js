import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Products() {
  const { data, error } = useSWR('http://localhost:3001/api/products', fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((p) => (
          <li key={p.id} className="border p-2 rounded shadow">
            <a href={`/products/${p.id}`} className="text-blue-500">{p.title}</a>
            <div>${p.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
