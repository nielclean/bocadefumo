const userId = '1355225924018245796';

// === Funções de perfil e Spotify ===

function getProfileElements() {
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

let currentSong = null;
let progressInterval = null;

function updateProfile() {
  fetch(`https://api.lanyard.rest/v1/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      const d = data.data;
      const user = d.discord_user;
      const elements = getProfileElements();

      // Avatar
      elements.profileImage.src = user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=512`
        : 'https://cdn.discordapp.com/embed/avatars/1.png';

      // Nome e nick
      elements.username.textContent = user.display_name || user.username;
      elements.nickname.textContent = `@${user.username}`;

      // Status
      elements.status.className = `status ${d.discord_status}`;

      // Spotify
      if (d.listening_to_spotify) {
        updateSpotify(d.spotify, elements);
      } else {
        hideSpotify(elements);
      }
    })
    .catch(console.error);
}

function updateSpotify(spotify, elements) {
  elements.spotifyInfo.style.display = 'flex';
  elements.spotifyImage.src = spotify.album_art_url;
  elements.spotifySong.textContent = spotify.song;
  elements.spotifyArtist.textContent = spotify.artist;

  const start = spotify.timestamps.start;
  const end = spotify.timestamps.end;
  const duration = end - start;

  if (currentSong !== spotify.song) {
    currentSong = spotify.song;
    clearInterval(progressInterval);

    progressInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1) * 100;

      elements.spotifyProgress.style.width = `${progress}%`;
      elements.spotifyTimeStart.textContent = formatTime(elapsed);
      elements.spotifyTimeEnd.textContent = formatTime(duration);
    }, 500);
  }
}

function hideSpotify(elements) {
  elements.spotifyInfo.style.display = 'none';
  clearInterval(progressInterval);
  currentSong = null;
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// === Atualização contínua ===
updateProfile();
setInterval(updateProfile, 10000);
