import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();
    const [schools, setSchools] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        role: '',
        address: '',
        schoolId: ''
    });

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAllSchools(token);
            console.log('Fetched schools:', response);

            setSchools(Array.isArray(response) ? response : response.schools || []);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await UserService.register(formData, token);
            alert('User registered successfully');
            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    const handleCancel = () => {
        navigate('/admin/user-management');
    };

    return (
        <div className="auth-container">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID:</label>
                    <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="Enter NISN/NIP" required />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter password" required />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter role" required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" required />
                </div>
                <div className="form-group">
                    <label>School:</label>
                    <select name="schoolId" value={formData.schoolId} onChange={handleInputChange} required>
                        <option value="">Select School</option>
                        {schools.map(school => (
                            <option key={school.id} value={school.id}>{school.name}</option>
                        ))}
                    </select>
                </div>
                <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
