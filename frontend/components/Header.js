import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">PSD Market</Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/products" className="hover:underline">Products</Link>
        </nav>
      </div>
    </header>
  );
}
