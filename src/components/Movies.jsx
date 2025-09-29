import { useMemo, useState } from "react";
import Card from "./card";
import moviesArray from "./moviesarray";

export default function Movies() {
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  // Data state
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
    <>
      <button
        onClick={() => setShowForm(true)}
        className="add"
        style={{ display: showForm ? "none" : "block" }}
      >
        add a movie
      </button>

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "100px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          placeholder="search"
        />
        <label style={{ margin: "10px" }}>
          Rating:
          <select
            id="rating"
            onChange={(e) => setRatingFilter(e.target.value)}
            value={ratingFilter}
          >
            <option value="all">ALL</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
      </div>

      <div
        style={{
          width: "300px",
          position: "relative",
          display: showForm ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "orange",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <button
          onClick={() => setShowForm(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(248, 47, 47, 1)",
            fontWeight: "700",
            cursor: "pointer",
            height: "30px",
            width: "30px",
            fontSize: "15px",
          }}
        >
          X
        </button>

        <h2 style={{ textAlign: "center" }}>Add a movie</h2>

        <label>name :</label>
        <input
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          value={form.title}
          type="text"
        />

        <label>description: </label>
        <input
          onChange={(e) =>
            setForm((s) => ({ ...s, description: e.target.value }))
          }
          value={form.description}
          type="text"
        />

        <label>Rating: </label>
        <input
          onChange={(e) => setForm((s) => ({ ...s, rating: e.target.value }))}
          value={form.rating}
          type="number"
          max={10}
          min={0}
          placeholder="0-10"
        />

        <label>Poster URL: </label>
        <input
          onChange={(e) => setForm((s) => ({ ...s, imgLink: e.target.value }))}
          value={form.imgLink}
          type="text"
        />

        <button className="add" onClick={handleAdd}>
          ADD
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin: "40px 0 40px 0",
        }}
      >
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            description={movie.description}
            rating={movie.rating}
            imgLink={movie.imgLink}
            handelDelete={() => handleDelete(movie.id)}
          />
        ))}
      </div>
    </>
  );
}
