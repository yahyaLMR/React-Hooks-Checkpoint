import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MoviesContext } from "./contexts/MoviesContext.jsx";
import moviesArray from "./components/moviesarray.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MoviesContext.Provider value={moviesArray}>
        <App />
      </MoviesContext.Provider>
    </BrowserRouter>
  </StrictMode>
);
