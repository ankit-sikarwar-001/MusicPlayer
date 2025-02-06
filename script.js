let pause = document.getElementById("pause");
let play = document.getElementById("play");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

async function getSongs() {
  let response = await fetch("http://127.0.0.1:5500/Songs/Popular_songs/");
  let a = await response.text();
  let div = document.createElement("div");
  div.innerHTML = a;
  let list = Array.from(div.getElementsByTagName("a"));
  let songlist = list.slice(4, list.length);
  let songs = [];
  let titles = [];
  for (let i = 0; i < songlist.length; i++) {
    songs.push(songlist[i].href);
    titles.push(songlist[i].title);
  }
  console.log(div);
  console.log(songs);
  localStorage.setItem("titles", titles);
  return songs;
}
// let value = 0;
let player = [];
// localStorage.setItem("index", value);
async function main() {
  let glory = await getSongs();
  glory.forEach((element) => {
    element = new Audio(element);
    player.push(element);
  });
  let block = 1;
  play.addEventListener("click", () => {
    let index = localStorage.getItem("index");
    pause.style.display = "block";
    play.style.display = "none";
    player[index].play();
    block = 0;
  });
  pause.addEventListener("click", () => {
    let index = localStorage.getItem("index");
    pause.style.display = "none";
    play.style.display = "block";
    player[index].pause();
    block = 1;
  });
  console.log(block);

  prev.addEventListener("click", () => {
    if (block == 1) {
      let index = localStorage.getItem("index");
      if (index == 0) index = player.length - 1;
      else index--;
      if (index >= 0) localStorage.setItem("index", index);
    }
  });
  next.addEventListener("click", () => {
    if (block == 1) {
      let index = localStorage.getItem("index");
      if (index == player.length - 1) index = 0;
      else index++;
      if (index < player.length) localStorage.setItem("index", index);
    }
  });
  let controller = document.getElementById("controller");
  let store = localStorage.getItem("titles");
  let storedTitle = Array.from(store.toString().split(","));
  storedTitle = storedTitle.map((element) => element.replace(".mp3", ""));
  controller.addEventListener("click", () => {
    // console.log(storedTitle);
    let index = localStorage.getItem("index");
    let title = Array.from(document.querySelectorAll(".title"));
    title = title.map((tit) => tit.getAttribute("class"));
    title = title.map((tit) => tit.split(" ")[0]);
    console.log(title);
    for (let i = 0; i < storedTitle.length; i++) {
      if (title[i] === storedTitle[index]) {
        document.querySelector(`.${title[i]}`).style.background =
          "rgb(69, 187, 151)";
      } else {
        document.querySelector(`.${title[i]}`).style.background = "";
      }
    }
  });
  let playbtn = document.querySelectorAll("#playbutton");
  // let shortTitle = storedTitle.map(element=> element.reduce(".mp3"," "))
  console.log(storedTitle);
  playbtn.forEach((element) => {
    element.addEventListener("click", () => {
      console.log(element.parentElement);
      // let index = localStorage.getItem("index");
      let title = element.parentElement.getAttribute("class");
      title = title.split(" ")[0];
      console.log(title);
      for (let i = 0; i < storedTitle.length; i++) {
        if (title == storedTitle[i]) {
          document.querySelector(`.${storedTitle[i]}`).style.background =
            "rgb(69, 187, 151)";
          console.log(storedTitle[i]);
          localStorage.setItem("index", i);
          playe();
          block = 0;
        } else {
          document.querySelector(`.${storedTitle[i]}`).style.background = "";
        }
      }
    });
  });
}
function playe() {
    
    let index = localStorage.getItem("index");
    pause.style.display = "block";
    play.style.display = "none";
    player.forEach((song,indi)=>{
      if(index == indi){
        song.play();
      }
      else{
        song.pause();
      }
    })
}

// console.log(title[0].innerText)

main();
