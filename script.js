const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

//Save selected movie index and price
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Get data from local storage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  selectedSeats !== null && selectedSeats.length > 0
    ? seats.forEach((seat, index) => {
        selectedSeats.indexOf(index) > -1
          ? seat.classList.add("selected")
          : null;
      })
    : null;

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  selectedMovieIndex !== null
    ? (movieSelect.selectedIndex = selectedMovieIndex)
    : null;
};

populateUI();

//Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener(
  "click",
  (onClick = (e) => {
    e.preventDefault();

    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      updateSelectedCount();
    }
  })
);

// Initil count and total set

updateSelectedCount();
