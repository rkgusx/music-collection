const pretzel = document.getElementById('pretzel');
const pretzelChoco = document.getElementById('pretzel-choco');
const chocoFront = document.getElementById('choco-front');
const chocoBack = document.getElementById('choco-back');

let offsetX, offsetY, isDragging = false;

pretzel.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - pretzel.getBoundingClientRect().left;
  offsetY = e.clientY - pretzel.getBoundingClientRect().top;
  pretzel.style.cursor = 'grabbing';
});

pretzelChoco.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - pretzelChoco.getBoundingClientRect().left;
  offsetY = e.clientY - pretzelChoco.getBoundingClientRect().top;
  pretzelChoco.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    if (pretzel.style.display !== 'none') {
      pretzel.style.left = `${x}px`;
      pretzel.style.top = `${y}px`;
    } else {
      pretzelChoco.style.left = `${x}px`;
      pretzelChoco.style.top = `${y}px`;
    }

    if (isOverlapping(pretzel, chocoFront)) {
      pretzel.style.display = 'none';
      pretzelChoco.style.display = 'block';
      setTimeout(() => {
        resetPretzel();
      }, 7000);
    } else {
      pretzel.style.display = 'block';
      pretzelChoco.style.display = 'none';
    }
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  pretzel.style.cursor = 'grab';
  pretzelChoco.style.cursor = 'grab';
});

function isOverlapping(el1, el2) {
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();
  
  return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

function resetPretzel() {
  pretzel.style.display = 'block';
  pretzelChoco.style.display = 'none';
  pretzel.style.left = '30%';  // 원래 위치로 리셋
  pretzel.style.top = '50%';   // 원래 위치로 리셋
}
