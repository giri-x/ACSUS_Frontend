import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './HomePage/Navbar';
import Login from './HomePage/Login';
import AdminHomepage from "./Admin/AdminHomepage";
import AddTechnician from "./Admin/AddTechnician";
import ViewTechnician from "./Admin/ViewTechnician";
import TechNavbar from "./Technician/TechNavbar";
import TechHomepage from "./Technician/TechHomepage";
import AddACUnit from "./Admin/AddACUnits";
import ViewACUnit from "./Admin/ViewACUnit";
import TechnicianViewACUnit from "./Technician/TechViewAcUnit";
import ViewLogPage from "./Technician/ViewLogPage";
import TechViewLog from "./Technician/TechViewLog";
import Footer from "./Technician/Footer";
import BookService from "./Technician/BookService";
import ViewStatus from "./Technician/ViewStatus";
import ServiceRequestList from "./Admin/ServiceRequestList";
// import ViewServiceRequest from "./Admin/ViewServiceRequest";
import ViewStatistics from "./Technician/ViewStatistics";
import AdminViewLog from "./Admin/AdminViewLog";
import AccountDetailsPage from "./Technician/AccountDetailsPage";
import ViewProfile from "./Technician/ViewProfile";
import AdminReport from "./Admin/AdminReport";
import HomePage from "./HomePage/Homepage";
import TechReportPage from "./Technician/TechViewReport";
import PeriodicService from "./Technician/PeriodicService"



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    {/* <Route path="/" element={<Navbar />} /> */}
     <Route path="/login" element={<Login />} />
     <Route path="/adminhome" element={<AdminHomepage />} />
     <Route path="/addtechnician" element={<AddTechnician />} />
     <Route path="/viewtechnician" element={<ViewTechnician />} />
     <Route path="/technavbar" element={<TechNavbar />} />
     <Route path="/techhome" element={<TechHomepage />} />
     <Route path="/addacunit" element={<AddACUnit />} />
     <Route path="/viewacunits" element={<ViewACUnit />} />
     <Route path="/techviewacunit" element={<TechnicianViewACUnit />} />
     <Route path="/viewlogpage" element={<ViewLogPage />} />
     <Route path="/techviewlog" element={<TechViewLog />} />
     <Route path="/footer" element={<Footer />} />
     <Route path="/bookservice" element={<BookService />} />
     <Route path="/viewstatus" element={<ViewStatus />} />
     <Route path="/servicerequestlist" element={<ServiceRequestList />} />
     <Route path="/viewstatistics" element={<ViewStatistics />} />
     <Route path="/adminviewlog" element={<AdminViewLog />} />
     <Route path="/accountdetails" element={<AccountDetailsPage />} />  
     <Route path="/viewprofile" element={<ViewProfile />} />
     <Route path="/adminreport" element={<AdminReport />} />
     <Route path="/techreportpage" element={<TechReportPage />} />
     <Route path="/periodicservice" element={<PeriodicService />} />
     


    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
