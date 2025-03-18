import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ethers} from "ethers";

import indianJudiciaryLogo from "../assets/logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [metamaskAccount, setMetamaskAccount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  // Initial check for login state
  useEffect(() => {
    const checkInitialState = async () => {
      await checkLoginState();
    };
    checkInitialState();
  }, []); // Run only once on mount

  // Check login state on route change
  useEffect(() => {
    const checkStateOnRoute = async () => {
      await checkLoginState();
    };
    checkStateOnRoute();
  }, [location.pathname]);

  // MetaMask account change listener
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  }, []);

  const checkLoginState = async () => {
    try {
      const storedUserType = localStorage.getItem("userType");
      const walletAddress = localStorage.getItem("walletAddress");
      const aadharUID = localStorage.getItem("aadharUID");
      const token = localStorage.getItem("token");
      
      console.log("Checking login state:", { storedUserType, walletAddress, aadharUID, token });
      
      // Check if MetaMask is still connected
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const isConnected = accounts && accounts.length > 0;
        
        console.log("MetaMask connection:", { isConnected, accounts });
        
        if (storedUserType && walletAddress && aadharUID && token && isConnected) {
          console.log("Setting logged in state to true");
          setIsLoggedIn(true);
          setIsMetamaskConnected(true);
          setMetamaskAccount(walletAddress);
          setUserType(storedUserType);
        } else {
          console.log("Missing required data, logging out");
          // If any required data is missing or MetaMask is disconnected, clear everything
          setIsLoggedIn(false);
          setUserType(null);
          if (!isConnected) {
            setIsMetamaskConnected(false);
            setMetamaskAccount("");
          }
        }
      } else {
        console.log("MetaMask not available");
        setIsLoggedIn(false);
        setIsMetamaskConnected(false);
        setMetamaskAccount("");
        setUserType(null);
      }
    } catch (error) {
      console.error("Error checking login state:", error);
      setIsLoggedIn(false);
      setIsMetamaskConnected(false);
      setMetamaskAccount("");
      setUserType(null);
    }
  };

  useEffect(() => {
    console.log("Login state changed:", { isLoggedIn, userType });
  }, [isLoggedIn, userType]);

  const handleAccountChange = async (accounts) => {
    if (accounts.length === 0) {
      await handleLogout(true);
    } else {
      const newAddress = accounts[0];
      setMetamaskAccount(newAddress);
      localStorage.setItem("walletAddress", newAddress);
      await checkLoginState();
    }
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Show admin routes if user is logged in, regardless of current path
  const showAdminRoutes = isLoggedIn || location.pathname.startsWith("/admin/");

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        if (accounts && accounts.length > 0) {
          setIsMetamaskConnected(true);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setMetamaskAccount(address);
          localStorage.setItem("walletAddress", address);
          await checkLoginState();
        }
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    }
  };

  const handleLogout = async (shouldRedirect = true) => {
    try {
      // Clear all localStorage items
      localStorage.clear(); // Clear all items to ensure complete logout
      
      // Reset all states
      setIsLoggedIn(false);
      setIsMetamaskConnected(false);
      setMetamaskAccount("");
      setUserType(null);

      // Attempt to disconnect from MetaMask
      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }]
          });
        } catch (error) {
          console.log("Error resetting MetaMask connection:", error);
        }
      }

      // Only redirect if explicitly requested
      if (shouldRedirect) {
        // Use window.location.replace for a complete page refresh and redirect
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during logout:", error);
      if (shouldRedirect) {
        window.location.href = "/";
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={indianJudiciaryLogo}
              alt="Indian Judiciary Logo"
              className="w-12 h-12 object-contain mr-3 transition-transform duration-300 hover:scale-105"
            />
            <div className="font-montserrat text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              <Link to="/" className="hover:opacity-80 transition-opacity">Project E-Vault</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/search"
              className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
            >
              Get Case Details
            </Link>
            <Link
              to="/info"
              className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
            >
              About Evault
            </Link>
            {isLoggedIn ? (
              <>
                {userType === "lawyer" && (
                  <Link
                    to="/admin/register-new-case"
                    className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
                  >
                    Register New Case
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
              >
                Login
              </Link>
            )}
            
            {!isMetamaskConnected ? (
              <button
                onClick={connectMetamask}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-montserrat py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Connect Metamask
              </button>
            ) : (
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-montserrat py-2 px-6 rounded-full shadow-lg">
                ✓ Connected
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm" onClick={toggleNavbar}></div>
        <div className="absolute right-0 h-full w-64 bg-white shadow-xl">
          <div className="flex flex-col p-6 space-y-6">
            <Link
              to="/get-case-details"
              className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
              onClick={toggleNavbar}
            >
              Get Case Details
            </Link>
            <Link
              to="/info"
              className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
              onClick={toggleNavbar}
            >
              About Evault
            </Link>
            {isLoggedIn ? (
              <>
                {userType === "lawyer" && (
                  <Link
                    to="/admin/register-new-case"
                    className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
                    onClick={toggleNavbar}
                  >
                    Register New Case
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleNavbar();
                  }}
                  className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 font-montserrat hover:text-blue-600 transition-colors duration-200"
                onClick={toggleNavbar}
              >
                Login
              </Link>
            )}
            {!isMetamaskConnected ? (
              <button
                onClick={() => {
                  connectMetamask();
                  toggleNavbar();
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-montserrat py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Connect Metamask
              </button>
            ) : (
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-montserrat py-2 px-6 rounded-full shadow-lg">
                ✓ Connected
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
