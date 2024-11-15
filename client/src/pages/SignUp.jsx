import React, {useState} from 'react'
import AuthForm from '../components/AuthForm'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../services/authService'
export default function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const handleSignUp = async (data) => {
      try {
        await signUp(data);
        navigate('/login');
      } catch (error) {
        setError(error.response.data.message)
        console.error('Sign up failed:', error);
      }
    };
  
    return <AuthForm type="signup" onSubmit={handleSignUp} error = {error} />;
}
