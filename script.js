// ========== PARTICLE BACKGROUND ==========
particlesJS.load('particles-js', 'particles.json', function () {
  console.log('Particles loaded.');
});

// ========== DISCORD LANYARD ==========
const userId = '1355225924018245796';
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

function updateProfile(data) {
  const user = data.discord_user;
  const discordStatus = data.discord_status;
  const customStatus = data.activities.find(a => a.type === 4); // Type 4 = Custom Status

  // Avatar URL - usa PNG 512px se tiver, ou imagem padrão
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
    : 'images/avatar.png';

  document.getElementById('avatar').src = avatarUrl;
  document.getElementById('username').textContent = `${user.username}#${user.discriminator}`;
  // Opcional: mostra status e custom status se quiser, mas precisa ter os elementos HTML
  //document.getElementById('status').textContent = `Status: ${discordStatus}`;
  //document.getElementById('custom-status').textContent = customStatus ? customStatus.state : '';
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
    btn.textContent = '🔈'; // som ligado
  } else {
    audio.pause();
    btn.textContent = '🔊'; // som desligado
  }
});

// ========== 3D CARD MOUSE MOVE ==========
const card = document.querySelector('.profile-card');

card.addEventListener('mousemove', e => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const cx = rect.width / 2;
  const cy = rect.height / 2;

  const dx = (x - cx) / cx;
  const dy = (cy - y) / cy;

  const maxRot = 10; // graus máximos

  card.style.transform = `translate(-50%, -50%) perspective(600px) rotateX(${dy * maxRot}deg) rotateY(${dx * maxRot}deg)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'translate(-50%, -50%) perspective(600px) rotateX(0deg) rotateY(0deg)';
});
