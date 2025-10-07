import { useMemo, useState } from "react";
import Card from "./card";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

export default function Movies() {
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  // Data state
  let moviesArray = useContext(MoviesContext);
  const [movies, setMovies] = useState(moviesArray);
  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    imgLink: "",
  });

  const handleDelete = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAdd = () => {
    const ratingNum = Number(form.rating);
    const isValid =
      form.title.trim() &&
      form.description.trim() &&
      form.imgLink.trim() &&
      !Number.isNaN(ratingNum) &&
      ratingNum >= 0 &&
      ratingNum <= 10;

    if (!isValid) return;

    const nextId =
      movies.length > 0 ? Math.max(...movies.map((m) => m.id)) + 1 : 1;

    const newMovie = {
      id: nextId,
      title: form.title.trim(),
      description: form.description.trim(),
      imgLink: form.imgLink.trim(),
      rating: ratingNum,
    };

    setMovies((prev) => [...prev, newMovie]);
    setForm({ title: "", description: "", rating: "", imgLink: "" });
    setShowForm(false);
  };

  const filteredMovies = useMemo(() => {
    let list = movies;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((m) => m.title.toLowerCase().includes(q));
    }

    if (ratingFilter !== "all") {
      const r = Number(ratingFilter);
      list = list.filter((m) => Number(m.rating) === r);
    }

    return list;
  }, [movies, query, ratingFilter]);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <button
        onClick={() => setShowForm(true)}
        className="add"
        style={{
          display: showForm ? "none" : "block",
          backgroundColor: "#3b82f6",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "none",
          fontSize: "1rem",
          fontWeight: "500",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          marginBottom: "24px",
          ":hover": { backgroundColor: "#2563eb" },
        }}
      >
        Add a Movie
      </button>

      <div
        style={{
          position: "sticky",
          top: "20px",
          zIndex: 10,
          backgroundColor: "white",
          padding: "16px",
          borderRadius: "12px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "32px",
          border: "1px solid #0055ffff",
        }}
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="Search movies..."
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
            width: "250px",
            fontSize: "0.95rem",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label style={{ color: "#4b5563", fontSize: "0.95rem" }}>
            Rating:
          </label>
          <select
            id="rating"
            onChange={(e) => setRatingFilter(e.target.value)}
            value={ratingFilter}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              backgroundColor: "white",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            <option value="all">All Ratings</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Movie Form Modal */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: showForm ? "flex" : "none",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          zIndex: 1000,
          border: "2px solid #0055ffff",
        }}
      >
        <button
          onClick={() => setShowForm(false)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          ✕
        </button>

        <h2
          style={{
            margin: "0 0 16px",
            color: "#1f2937",
            textAlign: "center",
          }}
        >
          Add a Movie
        </h2>

        {["Title", "Description", "Rating", "Poster URL"].map((label) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <label
              style={{
                color: "#4b5563",
                fontSize: "0.9rem",
              }}
            >
              {label}:
            </label>
            <input
              onChange={(e) =>
                setForm((s) => ({
                  ...s,
                  [label.toLowerCase().replace(" url", "Link")]: e.target.value,
                }))
              }
              value={form[label.toLowerCase().replace(" url", "Link")]}
              type={label === "Rating" ? "number" : "text"}
              max={label === "Rating" ? 10 : undefined}
              min={label === "Rating" ? 0 : undefined}
              placeholder={
                label === "Rating" ? "0-10" : `Enter ${label.toLowerCase()}...`
              }
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                fontSize: "0.95rem",
              }}
            />
          </div>
        ))}

        <button
          className="add"
          onClick={handleAdd}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            marginTop: "8px",
            transition: "background-color 0.2s ease",
            ":hover": { backgroundColor: "#2563eb" },
          }}
        >
          Add Movie
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          padding: "16px",
        }}
      >
        {filteredMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movieDetails/${movie.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              title={movie.title}
              description={movie.description}
              rating={movie.rating}
              imgLink={movie.imgLink}
              handelDelete={() => handleDelete(movie.id)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
