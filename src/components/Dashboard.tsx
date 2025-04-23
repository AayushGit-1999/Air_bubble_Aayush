import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FileText, LogOut } from 'lucide-react';
import frame16 from '../Assets/Frame 16.png';
import DownArrow from '../Assets/svg/Advanced';

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userData] = useState({
    name: "Akhil Nishtala",
    email: "akhilnishtala14@gmail.com",
    photoUrl: "/api/placeholder/60"
  });

  const handleSignOut = () => {
    signOut(auth);
  };

  // Add a style tag for the Century Gothic font
  const fontStyle = {
    fontFamily: '"Century Gothic", CenturyGothic, AppleGothic, sans-serif'
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white" style={fontStyle}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            <img src={frame16} alt="airbubble logo" className="h-6" />
          </span>
          <span className="font-bold text-2xl">air bubble</span>
        </div>

        <nav className="hidden mt-4 md:flex items-center gap-8 font-bold">
          <span className="text-xs">Features</span>
          <span className="text-xs">Pricing</span>
          <span className="text-xs">Support</span>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="text-sm  font-bold px-3 py-1 rounded-md border border-gray-700 flex items-center gap-1"
            >
              <span className='w-[70px]'>Sign in</span>
            </button>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="text-sm px-3 py-1 rounded-md border border-gray-700 font-bold"
            >
              Sign in
            </button>
          )}
          <button className="text-sm px-3 py-1 bg-white font-bold text-black rounded-md">Download</button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-14">
        <h1 className="text-4xl font-bold mb-1">Dashboard</h1>
        <p className="text-sm text-gray-400 mb-8">You can manage your account, billing, and team settings here.</p>

        {/* Top row with Basic Information and Usage aligned horizontally */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Basic Information */}
          <div className="bg-zinc-900 w-[400px] h-[180px] text-white rounded-lg p-6 border border-gray-800 max-w-lg">
            <div>
              <h2 className="text-xl font-medium mb-6 flex items-center justify-between ">
                Basic Information
                <div className="bg-gray-600 rounded-full w-12 h-12 overflow-hidden">
                  <img
                    src={userData.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Name</p>
                  <p className="text-right">{userData.name}</p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Email</p>
                  <p className="text-gray-300 text-sm text-right">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Section */}
          <div className="bg-zinc-900 text-white rounded-lg p-2 max-w-full border border-zinc-600 h-[180px] w-[990px]">
            <h2 className="text-xl font-medium mb-4">Usage</h2>

            <div className="bg-zinc-900 rounded-lg border border-zinc-600 p-2 h-[120px]">
              <h3 className="text-xs mb-1">Usage (Last 30 days)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Premium Models Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs">Premium models</span>
                    <span className="text-xs text-gray-300">0/150</span>
                  </div>
                  <div className="w-full bg-zinc-800 border border-zinc-600 h-px mb-3"></div>
                  <p className="text-gray-400 text-xs">
                    You've used no requests out of your <br /> 150 fast requests quota.
                  </p>
                </div>

                {/* gpt-4o-mini Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs">gpt-4o-mini or airbubble-small</span>
                    <span className="text-xs text-gray-300">0 / No Limit</span>
                  </div>
                  <div className="w-full bg-zinc-800 border border-zinc-600 h-px mb-3"></div>
                  <p className="text-gray-400 text-xs">
                    You've used 0 fast requests of this model. You have <br /> no monthly quota.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area - Account and Active Sessions */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Account and Active Sessions */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            {/* Account */}
            <div className="bg-zinc-900 w-[400px] h-[180px] text-white rounded-lg p-5 max-w-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Account</h2>
                <div className="text-xs px-3 py-1 rounded-full text-gray-100">
                  <span className='text-sm font-medium'>Pro Trial </span><span className="text-gray-400">9 days remaining</span>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <button className="text-sm px-4 py-2 bg-white text-black rounded-md font-bold flex-1">
                  Upgrade to Pro
                </button>
                <button className="text-sm px-4 py-2 bg-black border border-zinc-600 text-white rounded-md font-bold flex-1">
                  Upgrade to O.G
                </button>
              </div>

              <button className="flex items-center text-sm font-semibold text-gray-400 mt-8">
                Advanced  <span className="ml-2">
                  <DownArrow />

                </span>
              </button>
            </div>

            {/* Active Sessions */}
            <div className="bg-black text-white p-5 rounded-lg max-w-md bg-zinc-900 w-[400px]">
              <h2 className="text-xl font-medium mb-6">Active Sessions</h2>

              {/* Session Item 1 */}
              <div className="bg-zinc rounded-lg p-4 mb-3 flex items-center justify-between bg-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-8 bg-transparent  rounded flex items-center justify-center opacity-70">
                    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4H9M11.786 1H3.214C2.268 1 1.5 1.806 1.5 2.8V17.2C1.5 18.194 2.268 19 3.214 19H11.786C12.733 19 13.5 18.194 13.5 17.2V2.8C13.5 1.806 12.733 1 11.786 1Z"
                        stroke="white"
                        strokeOpacity="0.3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Web Session</p>
                    <p className="text-gray-500 text-xs">Created 5 days ago</p>
                  </div>
                </div>
                <button className="bg-black text-white text-xs font-medium px-4 py-1 rounded border border-zinc-600 h-[30px] w-[75px]">
                  Revoke
                </button>
              </div>

              {/* Session Item 2 */}
              <div className="bg-zinc rounded-lg p-4 mb-5 flex items-center justify-between bg-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-8 bg-transparent  rounded flex items-center justify-center opacity-70">
                    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 4H9M11.786 1H3.214C2.268 1 1.5 1.806 1.5 2.8V17.2C1.5 18.194 2.268 19 3.214 19H11.786C12.733 19 13.5 18.194 13.5 17.2V2.8C13.5 1.806 12.733 1 11.786 1Z"
                        stroke="white"
                        strokeOpacity="0.3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Web Session</p>
                    <p className="text-gray-500 text-xs">Created 5 days ago</p>
                  </div>
                </div>
                <button className="bg-black text-white text-xs font-medium px-4 py-1 border border-zinc-600 rounded h-[30px] w-[75px]">
                  Revoke
                </button>
              </div>

              {/* Note */}
              <p className="text-center text-gray-500 text-xs px-6">
                Note: Session revocation may take up to 10 <br /> minutes to take effect.
              </p>
            </div>
          </div>

          {/* Right Section - Additional space for future content */}
          <div className="w-full lg:w-2/3">
            {/* Space for additional content */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">
                <img src={frame16} alt="airbubble logo" className="h-6" />
              </span>
              <span className="font-bold text-2xl">air bubble</span>
            </div>
            <p className="text-xs text-gray-400  mt-2">
              Air bubble is the AI-powered platform that makes Minecraft moddding instant <br /> and accessible to everyone. Simply describe your desired mods, and watch <br />them come to life in your game within seconds, opening up a universe of <br />personalized experiences.
            </p>
            <img className='h-[20px] mt-4' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2nHeo6lNQM6sO5waCE4RNZlU-bnGWdc7RAg&s" alt="" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-[160px] relative right-[20%] bottom-[-19px]">
            <div>
              <h3 className="text-sm mb-3">Ecosystem</h3>
              <ul className="text-xs text-gray-500 space-y-4">
                <li>planckHub</li>
                <li>$PLANCK</li>
                <li>Bridge</li>
                <li>PlanckScan</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm mb-3">Resources</h3>
              <ul className="text-xs text-gray-500 space-y-4">
                <li>Website</li>
                <li>Docs</li>
                <li>Blog</li>
                <li>Media kit</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10 text-sm text-gray-200 relative bottom-[-50px] right-[-40px]">
          Made with ♥️ in The <span className='h-auto w-[20px]'> <img src={frame16} alt="airbubble logo" /> </span> bubble
        </div>
      </footer>
    </div>
  );
}
