document.addEventListener('DOMContentLoaded', async () => {
  const userId = '1355225924018245796';
  const profileContainer = document.querySelector('.profile-container');

  if (!profileContainer) {
    console.error('Elemento .profile-container não encontrado!');
    return;
  }

  const userLink = `https://discord.com/users/${userId}`;
  const profile = createProfile(userLink);
  profileContainer.appendChild(profile);

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await res.json();

    if (data.success) {
      updateProfile(data.data);
    } else {
      console.warn('Lanyard retornou erro para o usuário:', userId);
    }
  } catch (error) {
    console.error('Erro ao buscar dados do Lanyard:', error);
  }
});

function createProfile(userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile';

  const link = document.createElement('a');
  link.href = userLink;
  link.target = '_blank';
  link.title = 'Clique para ir ao perfil no Discord';

  const avatar = document.createElement('img');
  avatar.id = `avatar`;
  avatar.alt = 'Avatar';

  const name = document.createElement('p');
  name.id = `name`;
  name.textContent = 'Carregando...';

  link.appendChild(avatar);
  profile.appendChild(link);
  profile.appendChild(name);

  return profile;
}

function updateProfile(userData) {
  const avatarElement = document.getElementById('avatar');
  const nameElement = document.getElementById('name');

  const user = userData.discord_user;

  const avatarUrl = user.avatar?.startsWith('a_')
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif`
    : user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/1.png`;

  avatarElement.src = avatarUrl;
  nameElement.textContent = user.global_name || user.username || 'Usuário';
}
