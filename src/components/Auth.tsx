import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LogIn, UserPlus } from 'lucide-react';
// import logoImage from '../Assets/Frame 10.png';
import frame10 from '../Assets/Frame 10.png'
import bgImage from '../Assets/2cd25f408f43a8f2c47a487dd0f2b65b.png'

const MinecraftAuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // MongoDB save function
  const saveUserToMongo = async (uid: string, email: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid,
          email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save user to MongoDB');
      }
    } catch (error) {
      console.error('MongoDB save error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userCredential;
      if (isSignIn) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Save to MongoDB after creating user
        await saveUserToMongo(userCredential.user.uid, email);
      }

      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = (mode: 'signin' | 'signup') => {
    setIsSignIn(mode === 'signin');
    setShowForm(true);
    setError('');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>



      <div className="absolute inset-0 flex items-center justify-center">
        {!showForm ? (
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-[20px] p-8 w-[435px] h-[180px] text-center shadow-xl border-2 border-zinc-700">
            <div className="mb-6 flex flex-col items-center">
              <img src={frame10} alt="Logo" className="h-6 mb-2" />
              <p className="text-sm text-gray-300">Minecraft mods, created in a flash</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => toggleForm('signin')}
                className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200 shadow-md"
              >
                Sign in
              </button>
              <button
                onClick={() => toggleForm('signup')}
                className="w-1/2 bg-black hover:bg-blue-500 text-white py-2 px-4 rounded transition duration-200 shadow-md"
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900 bg-opacity-85 backdrop-blur-sm rounded-lg p-8 w-96 max-w-md text-center shadow-xl">
            <div className="mb-4 flex flex-col items-center">
              <img src={frame10} alt="Logo" className="h-12 mb-2" />
              <p className="text-sm text-gray-300">Minecraft mods, created in a flash</p>
            </div>
            <h2 className="text-xl font-bold text-white mb-4">
              {isSignIn ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            {error && (
              <div className="bg-red-900 bg-opacity-70 border border-red-700 text-red-100 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white ${isSignIn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'
                    } transition duration-200 shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      {isSignIn ? <LogIn className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
                      {isSignIn ? 'Sign in' : 'Sign up'}
                    </>
                  )}
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-300 text-xs"
              >
                Back to main screen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinecraftAuthPage;
