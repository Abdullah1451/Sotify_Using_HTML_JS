//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = document.getElementsByClassName('songItem');

let songs =[
    {songName: "Salam-ee-Ishq", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg"},
    {songName: "bring me back", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpg"},
    {songName: "arabic kuttu", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpg"},
    {songName: "bom diggy diggy bum", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg"},
    {songName: "toofan kgf chapter 2", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpg"},
    {songName: "Salamdc dc ff-e-Ishq", filePath: "./songs/6.mp3", coverPath: "./covers/6.jpg"},
    {songName: "Salam-ggghbgbe-Ishq", filePath: "./songs/7.mp3", coverPath: "./covers/7.jpg"},
    {songName: "Salafdfdm-e-Ishq", filePath: "./songs/8.mp3", coverPath: "./covers/8.jpg"},
    {songName: "fdcdfv fgSalam-e-Ishq", filePath: "./songs/9.mp3", coverPath: "./covers/9.jpg"},
    {songName: "rgbjjjjuj tg Salam-e-Ishq", filePath: "./songs/10.mp3", coverPath: "./covers/10.jpg"},
]


function foo (){
    
    const fs = require("fs");
    const files = fs.readdirSync("/assets/photos/");
}

Array.from(songItems).forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})


//Handle Play/Pause clicks 
masterPlay.addEventListener('click', ()=>{

    songPlaying = document.getElementById(songIndex);

    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        gif.style.opacity = 1;

        songPlaying.classList.remove('fa-circle-play');
        songPlaying.classList.add('fa-circle-pause');

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        gif.style.opacity = 0;

        songPlaying.classList.remove('fa-circle-pause');
        songPlaying.classList.add('fa-circle-play');

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{

        if(audioElement.paused != true && e.target.id == songIndex){

            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
        else if(audioElement.paused || audioElement.currentTime <= 0 || e.target.id != songIndex ){
            
            songIndex = parseInt(e.target.id);
            makeAllPlays();

            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `./songs/${songIndex+1}.mp3`
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    songPlaying = document.getElementById(songIndex);
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    songPlaying.classList.remove('fa-circle-play');
    songPlaying.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})


document.getElementById('previous').addEventListener('click', (e)=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    songPlaying = document.getElementById(songIndex);
    makeAllPlays();
    audioElement.src = `./songs/${songIndex}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    songPlaying.classList.remove('fa-circle-play');
    songPlaying.classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
