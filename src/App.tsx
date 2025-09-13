import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { ProductList } from "./components/ProductList";
import { WizardContainer } from "./components/listing-wizard/Container";

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
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/sell" element={<WizardContainer />} />
    </Routes>
  );
}

export default App;
