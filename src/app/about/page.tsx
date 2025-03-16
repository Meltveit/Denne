import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto p-6 pt-20 flex-grow">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p>
          Welcome to My Platform, a B2B networking solution designed to connect businesses with partners, investors, and
          talent. Our mission is to foster collaboration and growth in the industry.
        </p>
      </main>
      <Footer />
    </div>
  );
}