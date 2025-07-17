document.addEventListener('DOMContentLoaded', async () => {
  const userId = '1355225924018245796';
  const profileContainer = document.querySelector('.profile-container');

  const userLink = `https://discord.com/users/${userId}`;
  const profile = createProfile(0, userLink);
  profileContainer.appendChild(profile);

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await res.json();
    if (data.success) {
      updateProfile(0, data.data);
    } else {
      console.warn('Lanyard API error for user', userId);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
});

function createProfile(index, userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile';

  const link = document.createElement('a');
  link.href = userLink;
  link.target = '_blank';
  link.title = `Clique para ir para o perfil.`;

  const avatar = document.createElement('img');
  avatar.id = `avatar${index + 1}`;
  avatar.alt = '';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name-container';

  const nameParagraph = document.createElement('p');
  nameParagraph.id = `name${index + 1}`;
  nameParagraph.textContent = ' ';

  link.appendChild(avatar);
  nameContainer.appendChild(nameParagraph);

  profile.appendChild(link);
  profile.appendChild(nameContainer);

  avatar.addEventListener('load', () => {
    VanillaTilt.init(profile, {
      max: 25,
      speed: 1000,
      glare: true,
      "max-glare": 0.2,
      gyroscope: true,
    });
  });

  return profile;
}

function updateProfile(index, userData) {
  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);

  // Avatar URL
  const avatarUrl = userData.discord_user.avatar?.startsWith('a_')
    ? `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.gif`
    : userData.discord_user.avatar
      ? `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/1.png`;

  imgElement.src = avatarUrl;
  nameElement.textContent = userData.discord_user.global_name || userData.discord_user.username || ' ';
}
