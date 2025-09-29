export function ratingfilter(arr, e) {
  return arr.filter((movie) => movie.rating == e.target.value);
}
export function titlefilter(arr, e) {
  return arr.filter((movie) =>
    movie.title.startsWith(e.target.value.toLowerCase())
  );
}
