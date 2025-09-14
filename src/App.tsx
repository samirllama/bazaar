import { useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import ProductList from "./components/ProductList";
import { WizardContainer } from "./components/listing-wizard/Container";
import SignupForm from "./components/SignupForm";
import Home from "./pages/Home";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

function App() {
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
      <div className="p-4 space-x-4">
        <Link to="/products" className="text-blue-600">
          Products
        </Link>
        <Link to="/sell" className="text-green-600">
          Sell Products
        </Link>
        <Link to="/login" className="text-gray-600">
          Login
        </Link>
        <Link to="/signup" className="text-gray-600">
          Sign Up
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/sell" element={<WizardContainer />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </>
  );
}

export default App;
