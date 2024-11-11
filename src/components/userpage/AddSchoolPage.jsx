import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function AddSchoolPage() {
    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState({
        id: '',
        name: '',
        email: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSchoolData({ ...schoolData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Ensure token is passed
            await UserService.addSchool(schoolData, token);
            alert('School added successfully');
            navigate('/admin/school-management'); // Redirect to school management page after success
        } catch (error) {
            console.error('Error adding school:', error);
            alert('An error occurred while adding the school');
        }
    };

    const handleCancel = () => {
        navigate('/admin/school-management'); // Navigate back to the school management page if canceled
    };

    return (
        <div className="auth-container">
            <h2>Add School</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={schoolData.id}
                        onChange={handleInputChange}
                        placeholder="Enter School ID"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>School Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={schoolData.name}
                        onChange={handleInputChange}
                        placeholder="Enter School Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={schoolData.email}
                        onChange={handleInputChange}
                        placeholder="Enter School Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={schoolData.address}
                        onChange={handleInputChange}
                        placeholder="Enter School Address"
                        required
                    />
                </div>
                <button type="button" onClick={handleCancel} className="cancel-button">
                    Cancel
                </button>
                <button type="submit" className="register-button">
                    Add School
                </button>
            </form>
        </div>
    );
}

export default AddSchoolPage;
