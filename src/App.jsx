import "./App.css";
import Movies from "./components/Movies";
import { Routes, Route, useNavigate } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const navigate = useNavigate();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="/*" element={
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <h1 style={{
              fontSize: '4rem',
              color: '#2563eb',
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              404
            </h1>
            <h2 style={{
              fontSize: '2rem',
              color: '#1f2937',
              marginBottom: '2rem'
            }}>
              Page Not Found
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#4b5563',
              marginBottom: '2rem',
              maxWidth: '500px'
            }}>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Go Back Home
            </button>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;
