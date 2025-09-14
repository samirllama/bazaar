import { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "./lib/AuthContext";
import ProductList from "./components/ProductList";
import { WizardContainer } from "./components/listing-wizard/Container";
import LandingPage from "./pages/Landing";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

function App() {
  const { userId, signOut } = useAuth();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const htmlElement = document.documentElement;

    const handleThemeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    };

    if (mediaQuery.matches) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <>
      <div className="p-4 space-x-4 flex items-center justify-between">
        <div>
          <Link to="/products" className="text-blue-600 mr-4">
            Products
          </Link>
          {userId && (
            <Link to="/sell" className="text-green-600 mr-4">
              Sell Products
            </Link>
          )}
        </div>

        <div>
          {!userId ? (
            <>
              <Link to="/login" className="text-gray-600 mr-4">
                Login
              </Link>
              <Link to="/signup" className="text-gray-600">
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={signOut} className="text-red-600 hover:underline">
              Sign Out
            </button>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        {userId && <Route path="/sell" element={<WizardContainer />} />}
        {!userId && <Route path="/login" element={<LoginPage />} />}
        {!userId && <Route path="/signup" element={<SignupPage />} />}
      </Routes>
    </>
  );
}
export default App;
