// ========== PARTICLE BACKGROUND ==========
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('Particles loaded.');
});

// ========== DISCORD LANYARD ==========
const userId = '1355225924018245796';
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

function updateProfile(data) {
  const user = data.discord_user;

  // Avatar URL
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
    : 'images/avatar.png';

  document.getElementById('avatar').src = avatarUrl;
  document.getElementById('username').textContent = `${user.username}#${user.discriminator}`;
}

fetch(apiUrl)
  .then(res => res.json())
  .then(json => {
    if (json.success) updateProfile(json.data);
  })
  .catch(err => {
    console.error('Failed to fetch Lanyard data:', err);
  });

// ========== VIEW COUNTER ==========
const viewKey = 'profile_views';
let views = localStorage.getItem(viewKey);
if (!views) views = 0;
views++;
localStorage.setItem(viewKey, views);
document.getElementById('view-count').textContent = views;

// ========== AUDIO CONTROLLER ==========
const audio = document.getElementById('bg-audio');
const btn = document.getElementById('audio-btn');

btn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = '🔈';
  } else {
    audio.pause();
    btn.textContent = '🔊';
  }
});

// ========== CARD PARALLAX EFFECT ==========
const card = document.querySelector('.profile-card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const offsetX = (x / rect.width) * 2 - 1;
  const offsetY = (y / rect.height) * 2 - 1;

  const rotateX = offsetY * 10;
  const rotateY = offsetX * 10;

  card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});
