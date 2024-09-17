import React from 'react';
import Navbar from './Navbar'; // Import Navbar component
import acServiceImage from './ac1.jpg'; // Replace with actual image path
import aboutImage from './ac2.jpg'; // Replace with actual image path

const HomePage = () => {
  return (
    <div>
      <Navbar />
      
      {/* Home Section */}
      <section id="home" className="relative bg-gray-900 text-white h-screen flex items-center justify-center">
        <img src={acServiceImage} alt="AC Service" className="absolute inset-0 object-cover w-full h-full opacity-50" />
        <div className="relative z-10 text-center p-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to AC Service & Utilisation</h1>
          <p className="text-xl mb-6">Providing top-notch AC servicing and utilization management for your comfort and efficiency.</p>
          <a href="#contact" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact Us</a>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src={aboutImage} alt="About Us" className="w-full h-auto rounded-lg shadow-lg"/>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-lg mb-6">We are dedicated to providing excellent AC services, from installation to maintenance. Our team of experts ensures that your cooling systems are always running efficiently, keeping you comfortable all year round.</p>
            <p className="text-lg">With years of experience and a commitment to customer satisfaction, we strive to offer the best solutions tailored to your needs.</p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Contact Us</h2>
          <form className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full p-2 border border-gray-600 rounded" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-2 border border-gray-600 rounded" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg mb-2">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full p-2 border border-gray-600 rounded" required></textarea>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
