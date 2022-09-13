// console.log('hii');
let songindex = 0;
let masterplay = document.getElementById('masterplay');
let iditemplay = document.getElementById('iditemplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitemplay = document.getElementsByClassName('songitemplay')
let songitem = Array.from(document.getElementsByClassName('songitem'));
let audioelement = new Audio();
audioelement.preload = 'metadata';
let duration, min, sec, min1, sec1, currtime=0, currindex=-1;
let songs = [
    { songname: "Falak tak",artist:'Udit Narayan', filepath: 'songs/Falak Tak.mp3', coverpath: 'covers/tujanena.jpg' },
    { songname: "Havana",artist:'Camila Cabello', filepath: 'songs/Camila Cabello.mp3', coverpath: 'covers/havana.jpg' },
    { songname: "In the end",artist:'Linin park', filepath: 'songs/In The End.mp3', coverpath: 'covers/cover1.jpg' },
    { songname: "Kala Chashma",artist:'Badshah', filepath: 'songs/Kala Chashma.mp3', coverpath: 'covers/cover3.jfif' },
    { songname: "Agar tum sath ho",artist:'Alka/Arijit', filepath: 'songs/tumsathho.mp3', coverpath: 'covers/cover2.jpg' },
    { songname: "Kesariya",artist:'Arijit', filepath: 'songs/Kesariya.mp3', coverpath: 'covers/kesariya.jpg' },
    { songname: "Cheap Thrills",artist:'Sia', filepath: 'songs/Cheap Thrills.mp3', coverpath: 'covers/cheapt.jfif' },
    { songname: "Chaand baaliyan",artist:'Aditya A', filepath: 'songs/Chaand Baaliyan.mp3', coverpath: 'covers/chandbal.jpg' },
]

songitem.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
    element.getElementsByClassName('artist')[0].innerText=songs[i].artist;
})



//listen to events
audioelement.addEventListener('timeupdate', () => {
    progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioelement.currentTime = (myprogressbar.value * audioelement.duration) / 100;
})

const makeallplay = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        // playtime=0;
        // duration=0;
        element.classList.add('fa-play');
        element.classList.remove('fa-pause');
    });
}
const makealldefault=()=>{
    Array.from(document.getElementsByClassName('songname')).forEach((element)=>{
        element.style.color="black";
    })
}

let playtime;
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // if(currindex==songindex){
        //     playtime=audioelement.currentTime;
        // }
        // else{
        //     playtime=0;
        // }
        
        if (audioelement.paused || audioelement.currentTime <= 0) {
            makeallplay();
            // duration=0;
            // audioelement.currentTime=0;
            songindex = parseInt(e.target.id);
            if(currindex==songindex){
                playtime=audioelement.currentTime;
            }
            else{
                playtime=0;
                document.getElementById(`${songindex}`).style.color="black";
            }
            currindex=songindex;
            mastersongname.innerText = songs[songindex].songname;
            gif.style.opacity = 1;
            makealldefault();
            document.getElementById(`10${songindex}`).style.color="green";
            const path = songs[songindex].filepath;
            console.log(songindex);
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioelement.src = path;
            audioelement.currentTime=playtime;
            audioelement.play();
            console.log(`curen tim ${currtime}`);
            masterplay.classList.remove('fa-play');
            masterplay.classList.add('fa-pause');
        }
        else {
            // playtime=audioelement.currentTime;
            audioelement.pause();
            gif.style.opacity = 0;
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterplay.classList.remove('fa-pause');
            masterplay.classList.add('fa-play');
        }
    })
});


audioelement.addEventListener('timeupdate', () => {
    duration = audioelement.duration;
    min = Math.floor(duration / 60)
    sec = Math.floor(duration % 60)
    if (sec < 10) {
        sec = `0${sec}`;
    }
    if (min < 10) {
        min = `0${min}`;
    }
    document.getElementById('end').innerText = `${min}:${sec}`
    playtime = audioelement.currentTime;
    currtime=audioelement.currentTime;
    min1 = Math.floor(playtime / 60)
    sec1 = Math.floor(playtime % 60)
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    if (min1 < 10) {
        min1 = `0${min1}`;
    }
    document.getElementById('start').innerText = `${min1}:${sec1}`;
})


document.getElementById('next').addEventListener('click', () => {
    if (songindex >= (songs.length - 1)) {
        songindex = 0;
    }
    else {
        songindex += 1;
    }
    makeallplay();
    mastersongname.innerText = songs[songindex].songname;
    path = songs[songindex].filepath;
    audioelement.src = path;
    audioelement.play();
    makealldefault();
    document.getElementById(`10${songindex}`).style.color="green";
    gif.style.opacity = 1;
    audioelement.currentTime = 0;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    document.getElementById(`${songindex}`).classList.add('fa-pause');
    document.getElementById(`${songindex}`).classList.remove('fa-play');
    duration = 0;
})
document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = (songs.length - 1);
    }
    else {
        songindex -= 1;
    }
    makeallplay()
    mastersongname.innerText = songs[songindex].songname;
    path = songs[songindex].filepath;
    audioelement.src = path;
    audioelement.play();
    gif.style.opacity = 1;
    makealldefault();
    document.getElementById(`10${songindex}`).style.color="green";
    audioelement.currentTime = 0;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    document.getElementById(`${songindex}`).classList.add('fa-pause');
    document.getElementById(`${songindex}`).classList.remove('fa-play');
    duration = 0;
})
masterplay.addEventListener('click', (e) => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        console.log(`from masterplay : ${songindex}`);
        document.getElementById(`${songindex}`).classList.add('fa-pause');
        document.getElementById(`${songindex}`).classList.remove('fa-play');
        gif.style.opacity = 1;
    }
    else {
        audioelement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play')
        document.getElementById(`${songindex}`).classList.remove('fa-pause');
        document.getElementById(`${songindex}`).classList.add('fa-play');
        gif.style.opacity = 0;
    }
})