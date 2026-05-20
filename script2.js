//tasklist
const input = document.getElementById('taskinput');
const list = document.getElementById('tasklist');

function addtask() {
    if (input.value === '') return;
    let li = document.createElement("li");
    let check = document.createElement("input");
    let text = document.createElement("span");
    text.textContent = input.value;
    check.type = 'checkbox';

    check.addEventListener('change', function () {
        if (check.checked) {
            text.style.textDecoration = 'line-through';
            text.style.opacity = '0.5'
        } else {
            text.style.textDecoration = 'none';
            text.style.opacity = '1'
        }
        saveData();
    })

    let del = document.createElement('button');
    del.textContent = "X"
    del.className = "del"
    del.addEventListener('click', function () {
        li.remove()
        saveData();
    })


    li.appendChild(check);
    li.appendChild(text)
    li.appendChild(del);
    list.appendChild(li);
    input.value = '';
    saveData();
}

function saveData() {
    list.querySelectorAll('input[type="checkbox"]').forEach(function (check) {
        if (check.checked) {
            check.setAttribute('checked', 'true');
        } else {
            check.removeAttribute('checked');
        }
    });
    localStorage.setItem("data", list.innerHTML);
}

function showData() {
    list.innerHTML = localStorage.getItem("data");
    list.querySelectorAll('li').forEach(function (li) {
        let check = li.querySelector('input[type="checkbox"]');
        let text = li.querySelector('span');
        let del = li.querySelector('button');

        if (check.checked) {
            text.style.textDecoration = 'line-through';
            text.style.opacity = '0.5'
        }

        check.addEventListener('change', function () {
            if (check.checked) {
                text.style.textDecoration = 'line-through';
                text.style.opacity = '0.5'
            } else {
                text.style.textDecoration = 'none';
                text.style.opacity = '1'
            }
            saveData();
        });

        del.addEventListener('click', function () {
            li.remove()
            saveData();
        });
    });
}
showData();
//tasklist

document.getElementById('taskinput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addtask();
    }
})

//tasklist btn
document.getElementById('drawerbtn').addEventListener('click', function () {
    document.querySelector('.TODO').classList.toggle('open');

    const openbtn = document.querySelector('.openbtn');
    if (document.querySelector('.TODO').classList.contains('open')) {
        openbtn.src = 'left-arrow.png'
    } else {
        openbtn.src = 'right-arrow.png'
    }
});
//tasklist btn


//music player
let trackname = document.querySelector('.name');
let playpausebtn = document.querySelector('.playpause');
let nextbtn = document.querySelector('.nexttrack');
let pervbtn = document.querySelector('.prevtrack');
let seekslider = document.querySelector('.slider');
let volumeslider = document.querySelector('.volumeslider');
let currenttime = document.querySelector('.current_time');
let totaltime = document.querySelector('.totaltime');
let currenttrack = document.createElement('audio');

let trackindex = 0;
let isPlaying = false;
let uptadetimer;

const musiclist = [
    {
        name: 'Calm Ambient',
        music: 'calmambient.mp3'
    },
    {
        name: 'Campfire',
        music: 'campfire.wav'
    },
    {
        name: 'Rain',
        music: 'rain.wav'
    }
];

loadTrack(trackindex);
function loadTrack(trackindex) {
    clearInterval(uptadetimer);
    reset();
    currenttrack.src = musiclist[trackindex].music;
    currenttrack.loop = true;
    currenttrack.load();
    if (trackname) trackname.textContent = musiclist[trackindex].name;
    uptadetimer = setInterval(setUpdate, 1000);
    currenttrack.addEventListener('ended', nexttrack);
    isPlaying = false;
    playpausebtn.innerHTML = '<img src="play.png" class="play-pause">';
}

function reset() {
    currenttime.textContent = "00:00";
    totaltime.textContent = "00:00";
    seekslider.value = 0;
}

function playpause() {
    isPlaying ? pausetrack() : playtrack();
}

function playtrack() {
    currenttrack.play();
    isPlaying = true;
    playpausebtn.innerHTML = '<img src="pause.png" class="play-pause">'
}

function pausetrack() {
    currenttrack.pause();
    isPlaying = false;
    playpausebtn.innerHTML = '<img src="play.png" class="play-pause">'
}

function nexttrack() {
    if (trackindex < musiclist.length - 1) {
        trackindex += 1;
    }
    loadTrack(trackindex);
    playtrack();
}

function prevtrack() {
    if (trackindex > 0) {
        trackindex -= 1;
    } else {
        trackindex = musiclist.length - 1;
    }
    loadTrack(trackindex);
    playtrack();
}

function seekTo() {
    let seekto = currenttrack.duration * (seekslider.value / 100);
    currenttrack.currentTime = seekto;
}

function setvolume() {
    currenttrack.volume = volumeslider.value / 100;
}

function setUpdate() {
    let seekposition = 0;
    if (!isNaN(currenttrack.duration)) {
        seekposition = currenttrack.currentTime * (100 / currenttrack.duration);
        seekslider.value = seekposition;

        let currentminutes = Math.floor(currenttrack.currentTime / 60);
        let currentseconds = Math.floor(currenttrack.currentTime - currentminutes * 60);
        let durationminutes = Math.floor(currenttrack.duration / 60);
        let durationseconds = Math.floor(currenttrack.duration - durationminutes * 60);

        if (currentseconds < 10) { currentseconds = "0" + currentseconds; }
        if (durationseconds < 10) { durationseconds = "0" + durationseconds; }
        if (currentminutes < 10) { currentminutes = "0" + currentminutes; }
        if (durationminutes < 10) { durationminutes = "0" + durationminutes; }

        currenttime.textContent = currentminutes + ":" + currentseconds;
        totaltime.textContent = durationminutes + ":" + durationseconds;

    }
}

const Start = document.querySelector(".Start");
const Pause = document.querySelector(".Pause");
const Reset = document.querySelector(".Reset");
const timer = document.querySelector("#time2");
const timeinput = document.querySelector('.timeinput');


let timeleft = 0;
let current_time = 0;
let interval;

const uptadeTimer = () => {
    const hours = Math.floor(timeleft / 3600)
    const minutes = Math.floor((timeleft % 3600) / 60);
    const seconds = timeleft % 60;
    timer.innerHTML = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    localStorage.setItem('timeleft', timeleft);
    localStorage.setItem('isrunnung', isPlaying ? 'true' : 'false');
};

//settimer
function setcustomtime() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    clearInterval(interval);
    current_time = (hours * 3600) + (minutes * 60) + seconds;
    timeleft = current_time;
    uptadeTimer();

    timer.style.display = 'block';
    timeinput.style.display = 'none';
}

const starttimer = () => {
    clearInterval(interval);
    localStorage.setItem('starttime', Date.now());
    localStorage.setItem('totaltime', timeleft);
    interval = setInterval(() => {
        timeleft--;
        uptadeTimer();
        if (timeleft <= 0) {
            clearInterval(interval);
            shownotification();
            timeleft = 0;
            uptadeTimer();
        }
    }, 1000);
};

const stoptimer = () => {
    clearInterval(interval);
    localStorage.removeItem('starttime');
    localStorage.setItem('timeleft', timeleft);
}

const resettimer = () => {
    clearInterval(interval);
    timeleft = current_time;
    uptadeTimer();
    if (timer) timer.style.display = 'none';
    if (timeinput) timeinput.style.display = 'flex';
}

Start.addEventListener('click', starttimer);
Pause.addEventListener('click', stoptimer);
Reset.addEventListener('click', resettimer);

const focusbtn = document.querySelector(".Focus");
const shortbreakbtn = document.querySelector(".Shortbreak");
const longbreakbtn = document.querySelector(".Longbreak");

focusbtn.addEventListener("click", () => {
    clearInterval(interval);
    timeleft = current_time;
    uptadeTimer();
    timer.style.display = 'block';
    timeinput.style.display = 'none';
});

shortbreakbtn.addEventListener("click", () => {
    clearInterval(interval);
    timeleft = 600;
    uptadeTimer();
    timer.style.display = 'block';
    timeinput.style.display = 'none';
});

longbreakbtn.addEventListener("click", () => {
    clearInterval(interval);
    timeleft = 2700;
    uptadeTimer();
    timer.style.display = 'block';
    timeinput.style.display = 'none';
});

const savedtime = localStorage.getItem('timeleft');
if (savedtime !== null) {
    timeleft = parseInt(savedtime);
    current_time = timeleft;
    uptadeTimer();
    timer.style.display = 'block';
    timeinput.style.display = 'none';
}