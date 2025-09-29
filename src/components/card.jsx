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
          width: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "20px",
          justifyContent: "space-between",
          backgroundColor: "rgba(83, 94, 255, 0.75)",
          margin: "20px",
        }}
      >
        <img
          style={{ width: "100%", borderRadius: "20px 20px 0px 0px" }}
          src={imgLink}
          alt=""
        />
        <h1>{title}</h1>
        <h4 style={{ margin: "10px", textAlign: "center", fontSize: "17px" }}>
          {description}
        </h4>
        <h4>{rating}/10</h4>
        <button
          onClick={() => {
            handelDelete();
          }}
          className="add"
        >
          delete
        </button>
      </div>
    </>
  );
}
