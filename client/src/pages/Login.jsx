import React, {useState} from 'react'
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const handleLogin = async (data) => {
      try {
        const response = await login(data);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userName', response.rest.name) // Store token for session management
        navigate('/products');
      } catch (error) {
        setError("Login failed")
        
      }
    };
  
    return <AuthForm type="login" onSubmit={handleLogin} error = {error} />;
}
