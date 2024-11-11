import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link, useNavigate } from 'react-router-dom';

function SchoolManagementPage() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAllSchools(token);
            setSchools(response);
        } catch (error) {
            console.error('Error fetching schools:', error);
        }
    };

    const deleteSchool = async (schoolId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this school?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                await UserService.deleteSchool(schoolId, token);
                alert('School deleted successfully');
                fetchSchools(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting school:', error);
                alert('An error occurred while deleting the school');
            }
        }
    };

    return (
        <div className="school-management-container">
            <h2>School Management</h2>
            <button className="add-school-button">
                <Link to="/add-school">Add School</Link>
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.map(school => (
                        <tr key={school.id}>
                            <td>{school.id}</td>
                            <td>{school.name}</td>
                            <td>{school.email}</td>
                            <td>{school.address}</td>
                            <td>
                                <button className="delete-button" onClick={() => deleteSchool(school.id)}>Delete</button>
                                <button className="update-button">
                                    <Link to={`/update-school/${school.id}`}>Update</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SchoolManagementPage;