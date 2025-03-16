export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2023 My Platform. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/about" className="hover:underline">About Us</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    );
  }