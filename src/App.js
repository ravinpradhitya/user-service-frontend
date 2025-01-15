import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userpage/UpdateUser';
import UserManagementPage from './components/userpage/UserManagementPage';
import ProfilePage from './components/userpage/ProfilePage';
import SchoolManagementPage from './components/userpage/SchoolManagementPage';
import AddSchoolPage from './components/userpage/AddSchoolPage.jsx';
import UpdateSchool from './components/userpage/UpdateSchool';




function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/school-management" element={<SchoolManagementPage />} />
                <Route path="/add-school" element={<AddSchoolPage />} />
                <Route path="/update-school/:schoolId" element={<UpdateSchool />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;