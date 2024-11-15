import React,{useState} from 'react'

export default function AuthForm({type, onSubmit, error}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = type === 'login' ? { email, password } : { name, email, password };
      onSubmit(formData);
    };
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-blue-600">
              {type === 'signup' ? 'Sign Up' : 'Login'}
            </h2>
    
            {type === 'signup' && (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
    
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
    
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
    
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Error Message */}
    
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
            >
              {type === 'signup' ? 'Sign Up' : 'Login'}
            </button>
          </form>
        </div>
      );
}
