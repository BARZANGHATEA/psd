import Hero from '@/components/Hero';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'High Quality',
      description: 'Professionally crafted PSD and AI files',
    },
    {
      title: 'Secure Payments',
      description: 'Fast and safe checkout for every purchase',
    },
    {
      title: 'Instant Downloads',
      description: 'Access files immediately after payment',
    },
  ];

  return (
    <>
      <Hero />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center p-6 border rounded shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
