console.log("Welcome to Spotify");


let songIndex =0;
let audioElement = new Audio('songs/Chalte Chalte Yun Hi Koi.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songsName: "Chalte Chalte", filePath: "songs/Chalte Chalte Yun Hi Koi.mp3", coverPath: "covers/chalte chalte.png"},

    {songsName: "Chhap Tilak", filePath: "songs/Chhap Tilak Sab Chhini Re.mp3", coverPath: "covers/chhap tilak.png"},

    {songsName: "Ehsan tera", filePath: "songs/Ehsan Tera Hoga Mujh Par.mp3", coverPath: "covers/ehsaan tera.png"},

    {songsName: "Gali mein aaj chand", filePath: "songs/Gali Mein Chand.mp3", coverPath: "covers/gali mein aaj.png"},

    {songsName: "Isharon Isharon", filePath: "songs/Isharon Isharon Men Dil.mp3", coverPath: "covers/isharo isharo.png"},

    {songsName: "Ishq ka Haafiz", filePath: "songs/Ishq Ka Haafiz.mp3", coverPath: "covers/ishq ka haafiz.png"},

    {songsName: "Khoya Khoya Chand", filePath: "songs/Khoya Khoya Chand.mp3", coverPath: "covers/khoya khoya chand.png"},

    {songsName: "Monta Re", filePath: "songs/Monta Re.mp3", coverPath: "covers/Monta re.png"},

    {songsName: "O Re Piya", filePath: "songs/O Re Piya.mp3", coverPath: "covers/o re piya.png"},

    {songsName: "O Saki Saki", filePath: "songs/O Saki Saki.mp3", coverPath: "covers/o saki saki.png"},
]


songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songsName; 
})


masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', ()=>{
    //update the seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime =( myProgressBar.value/100) * audioElement.duration;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        // Check if the clicked song is already playing
        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Reset all play buttons first
            makeAllPlays();
            
            // Set the new song index and play the song
            songIndex = clickedIndex;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songsName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;

            // Update the master play button to "pause" state
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});



document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})