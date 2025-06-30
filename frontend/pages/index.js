import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Graphics Marketplace</h1>
      <p className="mb-2">Welcome! Browse our <Link href="/products">products</Link>.</p>
    </div>
  );
}
