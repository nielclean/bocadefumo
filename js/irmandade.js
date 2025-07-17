let currentIndex = 0;
const musicTracks = [
    'imagens/igarata6.mp3',
    'imagens/antioruam.mp3',
    'imagens/polousa.mp3',
    'imagens/semginsemela3.mp3',
    'imagens/desabafo2.mp3'
];

const videoTracks = [
    'imagens/igarata6.mp4',
    'imagens/antioruam.mp4',
    'imagens/polousa.mp4',
    'imagens/semginsemela3.mp4',
    'imagens/desabafo2.mp4'
];

const audio = document.getElementById('audio');
const video = document.getElementById('video-background');
const volumeControl = document.getElementById('volumeControl');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const voucherBtn = document.getElementById('voucherBtn');
const overlay = document.querySelector('.black-overlay');

document.addEventListener('DOMContentLoaded', () => {
    volumeControl.addEventListener('input', () => {
        adjustVolume(volumeControl.value);
    });

    prevBtn.addEventListener('click', previousTrack);
    nextBtn.addEventListener('click', nextTrack);

    voucherBtn.addEventListener('click', () => {
        startMedia();
        removeOverlay();
    });

    audio.pause();
    video.pause();

    audio.addEventListener('ended', nextTrack);
    
    loadProfileData();
});

function adjustVolume(value) {
    audio.volume = value;
}

function updateMedia() {
    audio.src = musicTracks[currentIndex];
    video.src = videoTracks[currentIndex];
    
    audio.oncanplay = () => {
        video.play();
        audio.play();
    };
}

function nextTrack() {
    currentIndex = (currentIndex + 1) % musicTracks.length;
    updateMedia();
}

function previousTrack() {
    currentIndex = (currentIndex - 1 + musicTracks.length) % musicTracks.length;
    updateMedia();
}

function startMedia() {
    audio.play();
    video.play();
}

function removeOverlay() {
    overlay.classList.add('hidden');
}

const userIds = ['1355225924018245796'];
let currentTracks = {};
let intervalIds = {};

function updateProfileImage(userId) {
    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            const user = data.data.discord_user;
            const elements = getProfileElements(userId);
            
            elements.profileImage.src = user.avatar 
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=512`
                : 'https://cdn.discordapp.com/embed/avatars/1.png';
            
            elements.username.textContent = user.display_name || user.username;
            elements.nickname.textContent = `@${user.username}`;
            updateStatus(elements.status, data.data.discord_status);
            
            if (data.data.listening_to_spotify) {
                updateSpotify(elements, data.data.spotify, userId);
            } else {
                hideSpotify(elements);
            }
        })
        .catch(console.error);
}

function getProfileElements(userId) {
    return {
        profileImage: document.querySelector(`.profile-pic[data-user-id="${userId}"]`),
        username: document.querySelector(`.username[data-user-id="${userId}"]`),
        nickname: document.querySelector(`.nickname[data-user-id="${userId}"]`),
        status: document.querySelector(`.status[data-user-id="${userId}"]`),
        spotifyInfo: document.querySelector(`.spotify-info[data-user-id="${userId}"]`),
        spotifyImage: document.querySelector(`.spotify-image[data-user-id="${userId}"]`),
        spotifySong: document.querySelector(`.spotify-song[data-user-id="${userId}"]`),
        spotifyArtist: document.querySelector(`.spotify-artist[data-user-id="${userId}"]`),
        spotifyProgress: document.querySelector(`.spotify-progress[data-user-id="${userId}"]`),
        spotifyTimeStart: document.querySelector(`.spotify-time-start[data-user-id="${userId}"]`),
        spotifyTimeEnd: document.querySelector(`.spotify-time-end[data-user-id="${userId}"]`)
    };
}

function updateStatus(element, status) {
    element.className = `status ${status}`;
}

function updateSpotify(elements, spotify, userId) {
    elements.spotifyInfo.style.display = 'flex';
    elements.spotifyImage.src = spotify.album_art_url;
    elements.spotifySong.textContent = spotify.song;
    elements.spotifyArtist.textContent = spotify.artist;
    
    const startTime = spotify.timestamps.start;
    const endTime = spotify.timestamps.end;
    const duration = endTime - startTime;
    
    const updateProgress = () => {
        const currentTime = Date.now();
        const progress = Math.min(currentTime - startTime, duration);
        const progressPercent = (progress / duration) * 100;
        
        elements.spotifyProgress.style.width = `${progressPercent}%`;
        elements.spotifyTimeStart.textContent = formatTime(progress);
        elements.spotifyTimeEnd.textContent = formatTime(duration);
    };
    
    if (currentTracks[userId] !== spotify.song) {
        currentTracks[userId] = spotify.song;
        clearInterval(intervalIds[userId]);
        intervalIds[userId] = setInterval(updateProgress, 500);
    }
    
    updateProgress();
}

function hideSpotify(elements) {
    elements.spotifyInfo.style.display = 'none';
    clearInterval(intervalIds[userId]);
}

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function loadProfileData() {
    userIds.forEach(userId => {
        updateProfileImage(userId);
        setInterval(() => updateProfileImage(userId), 10000);
    });
}
document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'a')) {
        e.preventDefault();
        return false;
    }

    if (e.key === 'F12') {
        e.preventDefault();
        showProtectionAlert();
        return false;
    }

    if (e.ctrlKey && e.shiftKey && ['C', 'I', 'J', 'K'].includes(e.key)) {
        e.preventDefault();
        showProtectionAlert();
        return false;
    }

    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        setTimeout(checkDevTools, 100);
    }
});

function showProtectionAlert() {
    alert('chama no Discord caso tenha interesse no site: @qc8x');
}

let devToolsOpened = false;
function checkDevTools() {
    const threshold = 100;
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;

    if (widthDiff > threshold || heightDiff > threshold || devToolsOpened) {
        if (!devToolsOpened) {
            document.body.innerHTML = '<div style="padding:20px;text-align:center;"><h1>🔒 Acesso não autorizado</h1><p>Feche as ferramentas de desenvolvedor para continuar.</p></div>';
            devToolsOpened = true;
        }
        window.location.reload();
    }
}
