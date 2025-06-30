import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Discover Premium Graphic Assets</h1>
        <p className="mb-6">Browse high quality PSD and AI files for your projects.</p>
        <Link
          href="/products"
          className="bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
        >
          Explore Products
        </Link>
      </div>
    </section>
  );
}
