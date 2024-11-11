import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"

    static async login(email, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async register(userData, token){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updateUser(userId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${userId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async addSchool(schoolData, token) {
    try {
        const response = await axios.post(`${UserService.BASE_URL}/school/admin/add-school`, schoolData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllSchools(token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/school/admin/get-all-schools`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    

    static async getSchoolById(schoolId, token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/school/admin/get-school/${schoolId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data; // Ensure this returns the expected structure
        } catch (error) {
            throw error;
        }
    }

    static async updateSchool(schoolId, schoolData, token) {
        try {
            const response = await axios.put(`${UserService.BASE_URL}/school/admin/update-school/${schoolId}`, schoolData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteSchool(schoolId, token) {
        try {
            const response = await axios.delete(`${UserService.BASE_URL}/school/admin/delete/${schoolId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isTeacher() {
        const role = localStorage.getItem('role');
        return role === 'TEACHER';
    }

    static isStudent() {
        const role = localStorage.getItem('role');
        return role === 'STUDENT';
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;