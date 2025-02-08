let player = [];
let block = 1;
let pause = document.getElementById("pause");
let play = document.getElementById("play");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let index = parseInt(localStorage.getItem("index"));
let songinfo = document.querySelector(".songInfo");
let songTime = document.querySelector(".songTime");
let circle = document.querySelector(".circle");
let bar = document.querySelector(".color");
let seekbar =document.querySelector(".seekbar");
let perComplete ;
// convert secconds into minute
function convertSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds) % 60;
  
  // Ensure two-digit formatting using padStart
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}


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
// it will store the audio into player array
async function main() {
  let glory = await getSongs();
  glory.forEach((element) => {
    element = new Audio(element);
    player.push(element);
  });
  
  // seekbar.addEventListener("click",(e)=>{
  //   perComplete = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
  //   bar.style.width= `${perComplete}%`
  //   circle.style.left= `${perComplete}%`
  //   player[index].currentTime = (perComplete*player[index].duration)/100
  //   console.log((e.offsetX/e.target.getBoundingClientRect().width)*100);
  // })
  
  play.addEventListener("click", () => {
    let index = parseInt(localStorage.getItem("index"));
    pause.style.display = "block";
    play.style.display = "none";
    player[index].play();
    songinfo.innerHTML  = player[index].src.split("/Popular_songs/")[1].replace(".mp3"," ")
    console.log(player[index].duration, player[index].src, player[index].currentTime);
    timer(index)
    block = 0;
  });
  pause.addEventListener("click", () => {
    let index = localStorage.getItem("index");
    pause.style.display = "none";
    play.style.display = "block";
    player[index].pause();
    // timer(index)
    block = 1;
  });
  console.log(block);

  prev.addEventListener("click", () => {
    if (block == 1) {
      let index = localStorage.getItem("index");
      if (index == 0) index = player.length - 1;
      else index--;
      if (index >= 0) localStorage.setItem("index", index);
      timer(index);
    }
  });
  next.addEventListener("click", () => {
    let index = localStorage.getItem("index");
    if (block == 1) {
      if (index == player.length - 1) index = 0;
      else index++;
      if (index < player.length) localStorage.setItem("index", index);
      timer(index);
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
          songinfo.innerHTML = document.querySelector(
            `.${title[i]}`
          ).children[1].innerHTML;
          // player[i].addEventListener("timeupdate", () => {
          //   let current = convertSeconds(player[i].currentTime);
          //   let duration = convertSeconds(player[i].duration);
          //   songTime.innerHTML = `${current} /${duration} `;
          // });
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
            songinfo.innerHTML = document.querySelector(
              `.${storedTitle[i]}`
            ).children[1].innerHTML;
            
          console.log(storedTitle[i]);
          localStorage.setItem("index", i);
          playe();
          timer(i);
          block = 0;
        } else {
          document.querySelector(`.${storedTitle[i]}`).style.background = "";
        }
      }
    });
  });
  
}
function timer(index){
  console.log("clicked")
  let duration = convertSeconds(player[index].duration);
  songTime.innerHTML = `00:00 /${duration} `;
  circle.style.left = `0%`;
  bar.style.width = `0%`;
  player[index].addEventListener("timeupdate", () => {
    let current = convertSeconds(player[index].currentTime);
  songTime.innerHTML = `${current} /${duration} `;
  circle.style.left = `${(player[index].currentTime / player[index].duration)*100}%`;
  bar.style.width = `${(player[index].currentTime / player[index].duration)*100}%`;
  if (current == duration) {
    pause.style.display = "none";
    play.style.display = "block";
    block = 1;
  }
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
        song.currentTime = 0
      }
    })
}

// console.log(title[0].innerText)

main();
