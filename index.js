// console.log('hii');
let songindex=0;
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let mastersongname=document.getElementById('mastersongname');
let songitemplay=document.getElementsByClassName('songitemplay')
let songitem=Array.from(document.getElementsByClassName('songitem'));
let audioelement=new Audio();
let songs=[
    {songname: "Falak tak", filepath:'songs/Falak Tak.mp3',coverpath: 'covers/tujanena.jpg'},
    {songname: "Havana - Camila Cabello", filepath:'songs/Camila Cabello.mp3',coverpath: 'covers/havana.jpg'},
    {songname: "In the end", filepath:'songs/In The End.mp3',coverpath: 'covers/cover1.jpg'},
    {songname: "Kala Chashma", filepath:'songs/Kala Chashma.mp3',coverpath: 'covers/cover3.jfif'},
    {songname: "Agar tum sath ho", filepath:'songs/tumsathho.mp3',coverpath: 'covers/cover2.jpg'},
]

songitem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverpath; 
    element.getElementsByClassName('songname')[0].innerText=songs[i].songname; 
})

let elt;
const findid=()=>{
    songs.forEach((element)=>{
        console.log(`file path ${elt}`)
        if(element.filepath==audioelement.src.toString){
            elt=element;
            // return songs.indexOf(element,0);
            // console.log(songs.indexOf(elt)); 
        }
    })
}

//handle play pause
masterplay.addEventListener('click',(e)=>{
    songindex=e.target.id;
    if(audioelement.paused|| audioelement.currentTime<=0){
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        // console.log(audioelement.src);
        // findid();
        gif.style.opacity=1;
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play')
        gif.style.opacity=0;
    }
})

//listen to events
audioelement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
    myprogressbar.value=progress;
});

myprogressbar.addEventListener('change',()=>{
    audioelement.currentTime=(myprogressbar.value*audioelement.duration)/100;
})

const makeallplay=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
            element.classList.add('fa-play');
            element.classList.remove('fa-pause');
    });    
}
let playtime;
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        playtime=audioelement.currentTime;
        
        if(audioelement.paused|| audioelement.currentTime<=0){
            makeallplay();
            // console.log(`from my sdie ${playtime}`);
            audioelement.currentTime=0;
            songindex=parseInt(e.target.id);
            mastersongname.innerText=songs[songindex].songname;
            gif.style.opacity=1;
            const path=songs[songindex].filepath;
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioelement.src=path;
            audioelement.currentTime=playtime;
            audioelement.play();
            masterplay.classList.remove('fa-play');
            masterplay.classList.add('fa-pause');
        }
        else{
            playtime=audioelement.currentTime;
            // console.log(playtime);
            audioelement.pause();
            gif.style.opacity=0;
            e.target.classList.remove('fa-pause');
            e.target.classList.add('fa-play');
            masterplay.classList.remove('fa-pause');
            masterplay.classList.add('fa-play');
        }
    })
});
document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=(songs.length-1)){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    mastersongname.innerText=songs[songindex].songname;
    path=songs[songindex].filepath;
    audioelement.src=path;
    audioelement.play();
    gif.style.opacity=1;
    audioelement.currentTime=0;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=(songs.length-1);
    }
    else{
        songindex-=1;
    }
    mastersongname.innerText=songs[songindex].songname;
    path=songs[songindex].filepath;
    audioelement.src=path;
    audioelement.play();
    gif.style.opacity=1;
    audioelement.currentTime=0;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})