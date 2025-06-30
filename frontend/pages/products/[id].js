import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(id ? `http://localhost:3001/api/products/${id}` : null, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">{data.title}</h1>
      <p className="mb-4">{data.description}</p>
      <div className="font-semibold mb-4">${data.price}</div>
    </div>
  );
}
