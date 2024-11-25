const tape1 = document.getElementById("cinema-tape-1");
const tape2 = document.getElementById("cinema-tape-2");

let isDragging = false;
let startX;
let scrollLeft;


function startDrag(e, tape) {
  isDragging = true;
  startX = e.pageX;
  scrollLeft = tape.scrollLeft;
  tape.style.cursor = "grabbing";
}

function stopDrag(tape) {
  isDragging = false;
  tape.style.cursor = "grab";
}


function dragMove(e, tape) {
  if (!isDragging) return;
  const x = e.pageX - startX;
  tape.scrollLeft = scrollLeft - x;
}

function handleScroll(e, tape) {
  e.preventDefault();
  
  const scrollAmount = 10;

  tape.scrollLeft += e.deltaY * scrollAmount; 
}

tape1.addEventListener("mousedown", (e) => startDrag(e, tape1));
tape1.addEventListener("mouseleave", () => stopDrag(tape1));
tape1.addEventListener("mouseup", () => stopDrag(tape1));
tape1.addEventListener("mousemove", (e) => dragMove(e, tape1));

tape2.addEventListener("mousedown", (e) => startDrag(e, tape2));
tape2.addEventListener("mouseleave", () => stopDrag(tape2));
tape2.addEventListener("mouseup", () => stopDrag(tape2));
tape2.addEventListener("mousemove", (e) => dragMove(e, tape2));

tape1.addEventListener("wheel", (e) => handleScroll(e, tape1));
tape2.addEventListener("wheel", (e) => handleScroll(e, tape2));

function createStars() {
  const starContainer = document.querySelector(".stars");
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;

      const size = Math.random() * 3 + 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      starContainer.appendChild(star);
  }
}

document.addEventListener("DOMContentLoaded", createStars);
