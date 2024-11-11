import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';

function UpdateSchool() {
    const { schoolId } = useParams();
    const navigate = useNavigate();
    const [schoolData, setSchoolData] = useState({
        id: '',
        name: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        fetchSchoolById(schoolId);
    }, [schoolId]);

    const fetchSchoolById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await UserService.getSchoolById(id, token);
        
        // Check if response contains the school data and map it properly
        if (response.statusCode === 200) {
            setSchoolData({
                id: response.schoolId,
                name: response.schoolName,
                email: response.schoolEmail,
                address: response.schoolAddress
            });
        } else {
            alert(response.message || 'Failed to fetch school data');
        }
    } catch (error) {
        console.error('Error fetching school data:', error);
    }
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSchoolData({ ...schoolData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await UserService.updateSchool(schoolId, schoolData, token);
            alert('School updated successfully');
            navigate('/admin/school-management'); // Navigate back to the school management page
        } catch (error) {
            console.error('Error updating school:', error);
            alert('An error occurred while updating the school');
        }
    };

    const handleCancel = () => {
        navigate('/admin/school-management');
    };

    return (
        <div className="auth-container">
            <h2>Update School</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={schoolData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={schoolData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={schoolData.address} onChange={handleInputChange} required />
                </div>
                <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                <button type="submit" className="update-button">Update</button>
            </form>
        </div>
    );
}

export default UpdateSchool;
