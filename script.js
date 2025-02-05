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
  localStorage.setItem("titles",titles)
  return songs;
}
async function main() {
  let glory = await getSongs();
  let player = [];
  glory.forEach((element) => {
    element = new Audio(element);
    player.push(element);
  });
  let pause = document.getElementById("pause");
  let play = document.getElementById("play");
  let prev = document.getElementById("prev");
  let next = document.getElementById("next");
  let value = 0;
  let block = 1;
  localStorage.setItem("index", value);
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
        block=1;
    });
    console.log(block);
    
  
        prev.addEventListener("click", () => {
            if(block == 1){
            var index = localStorage.getItem("index");
            index--;
            if(index>=0)
              localStorage.setItem("index", index);
        }
      });
      next.addEventListener("click", () => {
        if(block == 1){
          let index = localStorage.getItem("index");
          index++;
          if(index<player.length)
              localStorage.setItem("index", index);
        }
      });
      let controller = document.getElementById("controller")
      controller.addEventListener("click",()=>{
        let store = localStorage.getItem("titles");
        let storedTitle = Array.from(store.toString().split(","));
        storedTitle = storedTitle.map((element) => element.replace(".mp3", ""));
        console.log(storedTitle);
        let index = localStorage.getItem("index");
        let title = Array.from(document.querySelectorAll(".title"))
        title = title.map(tit => tit.getAttribute("class"))
        title = title.map((tit) => tit.split(" ")[0]);
        console.log(title)
        for(let i = 0 ;i<storedTitle.length;i++){
          for(let j=0;j<title[i].length;j++){
            if(title[i].charAt(j)===storedTitle[index].charAt(j)){
              console.log(title[i]);
             console.log(storedTitle[index].charAt(j));
             document.querySelector(`.${title[i]}`).style.background =
               "rgb(69, 187, 151)";
          }
          else{
             document.querySelector(`.${title[i]}`).style.background = "";

          }
        }
        }
        
      })
      
    }
    
  // console.log(title[0].innerText)

main();
