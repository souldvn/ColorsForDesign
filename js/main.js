// import 'boxicons'
// import 'boxicons'
const cols = document.querySelectorAll(".col");
let lock = "lock-open"; // объявляем переменную lock вне обработчика click



document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLocaleLowerCase() === "space") {
    setRandomColors();
  }
  console.log(event.code);
});



document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type == "lock") {
    const node =
      event.target.tagName.toLocaleLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("bi-lock-fill");
    node.classList.toggle("bi-unlock-fill");
  } else if (type === "copy") {
    copyToClickBoard(event.target.textContent);
  }
});

function generateRandomColor() {
  const hexCods = "0123456789ABCDEF";

  let color = "";

  for (let i = 0; i < 6; i++) {
    color += hexCods[Math.floor(Math.random() * hexCods.length)];
  }
  return "#" + color;
}

function copyToClickBoard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("bi-lock-fill");

    const text = col.querySelector("h2");

    

    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    const color = isInitial 
    ? colors[index]  
        ? colors[index]
        :chroma.random()
    : chroma.random()

    if (!isInitial){
        colors.push(color);
    }
    

    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
  });

  updateColorsHash(colors);
}

function setTextColor(text, color) {
  const luminanse = chroma(color).luminance();
  text.style.color = luminanse > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

document.addEventListener("click", (event) => {
  setTimeout(function popup (){
    const h2 = event.target.dataset.type;
    console.log(h2);
    if (h2 === "copy") {
      alert('HEX скопирован')
    }
  }, 1)
});




setRandomColors(true);

// function setRandomColors(){
//     cols.forEach(col =>{
//         const text = col.querySelector('h2')

//         const color = generateRandomColor()

//         const button = col.querySelector('button')

//         text.textContent = color
//         col.style.background = color

//     console.log(lock);
//         if (lock = 'lock-alt'){
//             return
//         }

//         setTextColor(text, color)

//     })
// }
