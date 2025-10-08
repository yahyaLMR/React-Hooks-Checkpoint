import { Link } from "react-router-dom";
export default function Card({
  id,
  imgLink,
  title,
  description,
  rating,
  handelDelete,
}) {
  return (
    <>
      <div
        key={id}
        id={id}
        style={{
          width: "280px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          margin: "16px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          ":hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        <Link
          key={id}
          to={`/movieDetails/${id}`}
          style={{ textDecoration: "none" }}
        >
          <img
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "12px 12px 0 0",
            }}
            src={imgLink}
            alt={title}
          />
        </Link>
        <div
          style={{
            padding: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Link
            key={id}
            to={`/movieDetails/${id}`}
            style={{ textDecoration: "none" }}
          >
            <h1
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1a1a1a",
                marginBottom: "8px",
                lineHeight: "1.4",
              }}
            >
              {title}
            </h1>
            <h4
              style={{
                margin: "8px 0",
                color: "#4b5563",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                fontWeight: "400",
              }}
            >
              {description}
            </h4>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
            }}
          >
            <h4
              style={{
                color: "#2563eb",
                fontSize: "1rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span style={{ color: "#fbbf24" }}>★</span>
              {rating}/10
            </h4>
            <button
              onClick={handelDelete}
              className="add"
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                ":hover": {
                  backgroundColor: "#dc2626",
                },
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
