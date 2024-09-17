// // src/LoginPage.js
// import React, { useState } from 'react';
// import img from './loginimg.jpg';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username === 'ADMIN' && password === '1234') {
//       alert('Login successful');
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
//       <div className="flex-1 flex items-center justify-center bg-gray-200">
//         <img
//           src={img}
//           alt="Login Background"
//           className="object-cover w-full h-full"
//           style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
//         />
//       </div>
//       <div className="flex-1 flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// src/LoginPage.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import img from './loginimg.jpg';

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username === 'ADMIN' && password === '1234') {
//       alert('Login successful');
//       navigate('/adminhome'); // Redirect to /adminhome on successful login
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
//       <div className="flex-1 flex items-center justify-center bg-gray-200">
//         <img
//           src={img}
//           alt="Login Background"
//           className="object-cover w-full h-full"
//           style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
//         />
//       </div>
//       <div className="flex-1 flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import axios from 'axios'; // Import axios for API calls
// import img from './loginimg.jpg';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Hardcoded admin login
//     if (email === 'admin@gmail.com' && password === '1234') {
//       alert('Login successful');
//       navigate('/adminhome'); // Redirect to /adminhome on successful login
//     } else {
//       // Technician login via API
//       try {
//         const response = await axios.post('http://localhost:8090/tech/loginTech', {
//           email,
//           passwordHash: password
//         });

//         const { data } = response;

//         // Check if response contains technician ID
//         if (data.userId) {
//           alert('Technician login successful');
//           navigate('/techhome'); // Redirect to /techhomepage on successful login
//         } else {
//           setError('Invalid credentials');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         setError('Invalid credentials');
//       }
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
//       <div className="flex-1 flex items-center justify-center bg-gray-200">
//         <img
//           src={img}
//           alt="Login Background"
//           className="object-cover w-full h-full"
//           style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
//         />
//       </div>
//       <div className="flex-1 flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


//correct code




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import axios from 'axios'; // Import axios for API calls
// import img from './loginimg.jpg';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Hardcoded admin login
//     if (email === 'admin@gmail.com' && password === '1234') {
//       alert('Login successful');
//       navigate('/adminhome'); // Redirect to /adminhome on successful login
//     } else {
//       // Technician login via API
//       try {
//         const response = await axios.post('http://localhost:8090/tech/loginTech', {
//           email,
//           passwordHash: password
//         });

//         const { data } = response;

//         // Check if response contains technician ID
//         if (data.userId) {
//           // Store technician's email and ID in sessionStorage
//           sessionStorage.setItem('technicianEmail', email);
//           sessionStorage.setItem('technicianId', data.userId);

//           alert('Technician login successful');
//           navigate('/techhome'); // Redirect to /techhome on successful login
//         } else {
//           setError('Invalid credentials');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         setError('Invalid credentials');
//       }
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
//       <div className="flex-1 flex items-center justify-center bg-gray-200">
//         <img
//           src={img}
//           alt="Login Background"
//           className="object-cover w-full h-full"
//           style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
//         />
//       </div>
//       <div className="flex-1 flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import axios from 'axios'; // Import axios for API calls
// import img from './loginimg.jpg'; // Import your background image

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Hardcoded admin login
//     if (email === 'admin@gmail.com' && password === '1234') {
//       alert('Login successful');
//       navigate('/adminhome'); // Redirect to /adminhome on successful login
//     } else {
//       // Technician login via API
//       try {
//         const response = await axios.post('http://localhost:8090/tech/loginTech', {
//           email,
//           passwordHash: password
//         });

//         const { data } = response;

//         // Check if response contains technician ID
//         if (data.userId) {
//           // Store technician's email and ID in sessionStorage
//           sessionStorage.setItem('technicianEmail', email);
//           sessionStorage.setItem('technicianId', data.userId);

//           alert('Technician login successful');
//           navigate('/techhome'); // Redirect to /techhome on successful login
//         } else {
//           setError('Invalid credentials');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         setError('Invalid credentials');
//       }
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
//       {/* Left side: Image */}
//       <div className="flex-1 flex items-center justify-center">
//         <img
//           src={img}
//           alt="Login Background"
//           className="object-cover w-full h-full"
//           style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
//         />
//       </div>
      
//       {/* Right side: Login form */}
//       <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
//         <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;









// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import axios from 'axios'; // Import axios for API calls
// import img from './loginimg.jpg'; // Import your background image

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Hardcoded admin login
//     if (email === 'admin@gmail.com' && password === '1234') {
//       alert('Login successful');
//       navigate('/adminhome'); // Redirect to /adminhome on successful login
//     } else {
//       // Technician login via API
//       try {
//         const response = await axios.post('http://localhost:8090/tech/loginTech', {
//           email,
//           passwordHash: password
//         });

//         const { data } = response;

//         // Check if response contains technician ID
//         if (data.userId) {
//           // Store technician's email and ID in sessionStorage
//           sessionStorage.setItem('technicianEmail', email);
//           sessionStorage.setItem('technicianId', data.userId);

//           alert('Technician login successful');
//           navigate('/techhome'); // Redirect to /techhome on successful login
//         } else {
//           setError('Invalid credentials');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         setError('Invalid credentials');
//       }
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex">
//           {/* Left side: Image */}
//           <div className="flex-1 flex items-center justify-center p-4">
//             <img
//               src={img}
//               alt="Login Background"
//               className="object-cover w-full h-full rounded-l-lg"
//               style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
//             />
//           </div>
          
//           {/* Right side: Login form */}
//           <div className="flex-1 flex items-center justify-center p-8">
//             <div className="w-full max-w-md">
//               <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//               {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;







// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import axios from 'axios'; // Import axios for API calls
// import { MailIcon, LockClosedIcon } from '@heroicons/react/20/solid'; // Import Heroicons
// import img from './loginimg.jpg'; // Import your background image

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Hardcoded admin login
//     if (email === 'admin@gmail.com' && password === '1234') {
//       alert('Login successful');
//       navigate('/adminhome'); // Redirect to /adminhome on successful login
//     } else {
//       // Technician login via API
//       try {
//         const response = await axios.post('http://localhost:8090/tech/loginTech', {
//           email,
//           passwordHash: password
//         });

//         const { data } = response;

//         // Check if response contains technician ID
//         if (data.userId) {
//           // Store technician's email and ID in sessionStorage
//           sessionStorage.setItem('technicianEmail', email);
//           sessionStorage.setItem('technicianId', data.userId);

//           alert('Technician login successful');
//           navigate('/techhome'); // Redirect to /techhome on successful login
//         } else {
//           setError('Invalid credentials');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         setError('Invalid credentials');
//       }
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex">
//           {/* Left side: Image */}
//           <div className="flex-1 flex items-center justify-center p-4">
//             <img
//               src={img}
//               alt="Login Background"
//               className="object-cover w-full h-full rounded-l-lg"
//               style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
//             />
//           </div>
          
//           {/* Right side: Login form */}
//           <div className="flex-1 flex items-center justify-center p-8">
//             <div className="w-full max-w-md">
//               <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//               {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4 relative">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                   <div className="mt-1 relative">
//                     <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                     <input
//                       type="email"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-6 relative">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <div className="mt-1 relative">
//                     <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                     <input
//                       type="password"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;








import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios'; // Import axios for API calls
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'; // Import correct Heroicons
import img from './loginimg.jpg'; // Import your background image

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Hardcoded admin login
    if (email === 'admin@gmail.com' && password === '1234') {
      alert('Login successful');
      navigate('/adminhome'); // Redirect to /adminhome on successful login
    } else {
      // Technician login via API
      try {
        const response = await axios.post('http://localhost:8090/tech/loginTech', {
          email,
          passwordHash: password
        });

        const { data } = response;

        // Check if response contains technician ID
        if (data.userId) {
          // Store technician's email and ID in sessionStorage
          sessionStorage.setItem('technicianEmail', email);
          sessionStorage.setItem('technicianId', data.userId);
          sessionStorage.setItem('passwordHash',password);

          alert('Technician login successful');
          navigate('/techhome'); // Redirect to /techhome on successful login
        } else {
          setError('Invalid credentials');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex">
          {/* Left side: Image */}
          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={img}
              alt="Login Background"
              className="object-cover w-full h-full rounded-l-lg"
              style={{ maxHeight: '100vh' }} // Ensures image doesn't exceed viewport height
            />
          </div>
          
          {/* Right side: Login form */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4 relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="mt-1 relative">
                    <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mb-6 relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 relative">
                    <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
