import React from 'react';

const FooterPage = () => {
  return (
    <footer className="bg-charcoal-gray text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">AC Service & Utilization System</h3>
            <p className="text-sm">
              Keeping your air conditioning units running smoothly is our top priority.
              From regular maintenance to emergency repairs, we have you covered.
            </p>
          </div>

          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li><a href="/home" className="hover:underline">Home</a></li>
              <li><a href="/services" className="hover:underline">Our Services</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
            </ul>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm mb-1">123 AC Street, Airville, AC 12345</p>
            <p className="text-sm mb-1">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: <a href="mailto:info@acservice.com" className="hover:underline">info@acservice.com</a></p>
          </div>
        </div>
      </div>

      <div className="bg-charcoal-gray-light text-center py-4 mt-6">
        <p className="text-sm">© {new Date().getFullYear()} AC Service Experts. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterPage;
