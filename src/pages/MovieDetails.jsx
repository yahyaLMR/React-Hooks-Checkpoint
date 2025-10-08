import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  let moviesArrayLS = JSON.parse(sessionStorage.getItem("movies"));
  let moviesContext = useContext(MoviesContext);
  const moviesArray =
    moviesArrayLS && moviesArrayLS.length > 0
      ? moviesArrayLS
      : moviesContext;

  const movie = moviesArray.find((m) => m.id == id);
  console.log(movie);

  return (
    <div class="movie-detail-container">
  <button class="back-button" onClick={() => navigate("/")}>
    ← Back to Home
  </button>
  <div class="movie-content">
    <div class="movie-info">
      <img
        src={movie.posterLink}
        alt={movie.title}
        class="movie-poster"
      />
      <h1 class="movie-title">
        {movie.title}
      </h1>
      <p class="movie-rating">
        Rating: {movie.rating}/10
      </p>
      <p class="movie-description">
        {movie.description}
      </p>
    </div>
    <div class="trailer-section">
      <h2 class="trailer-title">
        Movie Trailer
      </h2>
      <div class="video-container">
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
