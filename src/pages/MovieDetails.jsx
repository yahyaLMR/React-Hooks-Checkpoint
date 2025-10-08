import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  let moviesArrayLS = JSON.parse(localStorage.getItem("movies"));
  let moviesContext = useContext(MoviesContext);
  const moviesArray =
    moviesArrayLS && moviesArrayLS.length > 0
      ? moviesArrayLS
      : moviesContext;

  const movie = moviesArray.find((m) => m.id == id);
  console.log(movie);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: "pointer",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "background-color 0.2s",
          hover: {
            backgroundColor: "#1d4ed8",
          },
        }}
      >
        ← Back to Home
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <img
            src={movie.posterLink}
            alt={movie.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              marginBottom: "1rem",
            }}
          />
          <h1
            style={{
              fontSize: "2rem",
              color: "#1a1a1a",
              marginBottom: "1rem",
            }}
          >
            {movie.title}
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#2563eb",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            Rating: {movie.rating}/10
          </p>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.6",
              color: "#4b5563",
            }}
          >
            {movie.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            Movie Trailer
          </h2>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%", // 16:9 aspect ratio
              height: 0,
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <iframe
              width="560"
              height="315"
              src={movie.trailerLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
