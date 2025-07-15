
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

import AdminLogin from "./components/AdminLogin";
import TeacherLogin from "./components/TeacherLogin";
import StudentLogin from "./components/StudentLogin";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";
import TeacherSignup from './components/TeacherSignup';
import DashboardLayout from "./components/AdminDashboard/DashboardLayout";

import AddStudent from './Pages/AddStudent';
import AddSubject from './Pages/AddSubject';
import AddTeacher from './Pages/AddTeacher';
import ClassesPage from './Pages/ClassesPage';
import AdminHomePage from './Pages/AdminHomePage';
import AddComplaint from './Pages/AddComplaint';
import AddNotice from './Pages/AddNotice';
import AdminProfile from './Pages/AdminProfile';
import StudentList from './Pages/StudentListPage';


function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
       
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/TeacherSignup" element={<TeacherSignup />} />


        {/* Nested admin dashboard routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="students" element={<AddStudent />} />
          <Route path="teachers" element={<AddTeacher />} />
          <Route path="subjects" element={<AddSubject />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="complaints" element={<AddComplaint />} />
          <Route path="notices" element={<AddNotice />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="students/view" element={<StudentList />} />

        </Route>

        {/* ✅ Added refresh functionality in Teacher Dashboard */}
        
      </Routes>
    </Router>
  );
}

export default App;
