document.addEventListener('DOMContentLoaded', () => {
  const userId = '1355225924018245796';
  fetch(`https://api.lanyard.rest/v1/users/${userId}`)
    .then(res => res.json())
    .then(({ data }) => {
      const userLink = `https://discord.com/users/${data.discord_user.id}/`;
      const profile = createprofile(0, userLink);
      const profileContainer = document.querySelector('.profile-container');
      profileContainer.appendChild(profile);

      const connectedAccounts = data.connected_accounts || [];

      // Adiciona manualmente as redes
      connectedAccounts.push({ type: 'tiktok', name: 'nogamblenocrypto' });
      connectedAccounts.push({ type: 'instagram', name: 'outfeast' });

      atualizarprofile(0, {
        user: {
          id: data.discord_user.id,
          username: data.discord_user.username,
          avatar: data.discord_user.avatar,
          global_name: data.discord_user.global_name,
        },
        badges: [],
        connected_accounts: connectedAccounts
      });
    });
});

function atualizarprofile(index, userData) {
  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const tagElement = document.createElement('p');
  const flagsElement = document.getElementById(`flags${index + 1}`);
  const connsElement = document.getElementById(`conns${index + 1}`);

  connsElement.className = (userData.connected_accounts && userData.connected_accounts.length > 0)
    ? 'conn-container'
    : 'conn-container no-connections';

  tagElement.className = 'tag';

  const avatarUrl = userData.user.avatar?.startsWith('a_')
    ? `https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.gif`
    : userData.user.avatar
    ? `https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/1.png`;

  tagElement.textContent = `@${userData.user.username}`;
  imgElement.src = avatarUrl;
  nameElement.textContent = userData.user.global_name || userData.user.username || ' ';
  nameElement.appendChild(tagElement);

  // Remover flags
  flagsElement.innerHTML = '';

  // Mostrar apenas Instagram e TikTok
  const connections = {
    instagram: {
      icon: "<img class='conn-icon' src='https://img.icons8.com/color/48/instagram-new--v2.png'>",
      link: 'https://www.instagram.com/',
      user: true
    },
    tiktok: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/tiktok.svg'>",
      link: 'https://www.tiktok.com/@',
      user: true
    }
  };

  connsElement.innerHTML = userData.connected_accounts?.map(conn => {
    const type = conn.type.toLowerCase();
    if (connections[type]) {
      const { icon, link } = connections[type];
      return `<a href="${link}${conn.name}" target="_blank" class="tooltip">${icon}<span class="tooltiptext">${conn.name}</span></a>`;
    }
    return '';
  }).join(' ') || "<img class='conn-icon' src='https://ogp.wtf/assets/connections/invis.png' alt=' '>";

  imgElement.addEventListener('load', () => {
    const profileElement = document.querySelector(`.profile:nth-child(${index + 1})`);
    profileElement.classList.add('loaded');
  });
}

function createprofile(index, userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile';
  const link = document.createElement('a');
  link.href = userLink || `https://discord.com/users/${index + 1}`;
  link.target = "_blank";
  link.title = `Clique para ir para o profile.`;

  const avatar = document.createElement('img');
  avatar.id = `avatar${index + 1}`;
  avatar.alt = '';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name-container';

  const nameParagraph = document.createElement('p');
  nameParagraph.id = `name${index + 1}`;
  nameParagraph.textContent = ' ';

  const flagsParagraph = document.createElement('p');
  flagsParagraph.id = `flags${index + 1}`;
  flagsParagraph.innerHTML = ' ';

  const connsParagraph = document.createElement('p');
  connsParagraph.id = `conns${index + 1}`;
  connsParagraph.innerHTML = ' ';

  link.appendChild(avatar);
  nameContainer.appendChild(nameParagraph);
  nameContainer.appendChild(flagsParagraph);
  nameContainer.appendChild(connsParagraph);
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
