import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import TechNavbar from './TechNavbar';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './Footer';

const TechHomepage = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Show navigation arrows
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400">
      <TechNavbar />

      {/* Carousel */}
      <div className="w-full">
        <Slider {...settings}>
          <div className="relative">
            <img
              src="https://images.ctfassets.net/h4bemxjtjotj/3T6LmvKP0FR05fGK63Ylxw/6cee9487574c23d01df0698dcd39aa4d/linkedin-Banner___iStock-688365182.jpg"
              alt="AC Installation"
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-opacity-50 bg-black text-white text-lg font-semibold">Log Daily Usage of Ac Unit</div>
          </div>
          <div className="relative">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/e0d54a172495411.6480464b49131.png"
              alt="AC Maintenance"
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-opacity-50 bg-black text-white text-lg font-semibold">AC Maintenance</div>
          </div>
          <div className="relative">
            <img
              src="https://www.greenefficientliving.com.au/wp-content/uploads/2018/09/facebook-ad.jpg"
              alt="AC Repair"
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 left-0 p-4 bg-opacity-50 bg-black text-white text-lg font-semibold">AC Service Initiation</div>
          </div>
        </Slider>
      </div>

      {/* Cards Section */}
      <div className="py-6 px-4">
        <div className="flex flex-wrap justify-center gap-4">
          <Card title="Service History" description="View Your AC unit's Service History" path="/viewstatus" />
          <Card title="Book Service" description="Schedule a service for an AC unit." path="/bookservice" />
          <Card title="View Statistics" description="View graphs of your AC Unit usage hours" path="/viewstatistics" />
          <Card title="Update Profile" description="Update your personal information." path="/viewprofile" />
        </div>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col md:flex-row items-center py-12 px-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 rounded-lg shadow-md">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="https://www.guidebrain.com/wp-content/uploads/2021/08/AC-Repair-Technician.jpg"
            alt="About Us"
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700">
            We are a dedicated team providing exceptional air conditioning services. Our mission is to ensure that your AC units operate efficiently and effectively. With years of experience in the industry, we offer a range of services including installation, maintenance, and repair. Our goal is to deliver top-notch customer satisfaction and keep your environment comfortable year-round.
          </p>
        </div>
      </div>

      <Footer />

      {/* WhatsApp Floating Button */}
      <a
        href="https://api.whatsapp.com/send?phone=919677617095"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600"
      >
        <img
          src="https://logospng.org/download/whatsapp/logo-whatsapp-verde-icone-ios-android-4096.png"
          alt="WhatsApp"
          className="w-12 h-12"
        />
      </a>
    </div>
  );
};

// Card Component
const Card = ({ title, description, path }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle card click
  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden w-60 cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 p-4 text-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Go
        </button>
      </div>
    </div>
  );
};

export default TechHomepage;

