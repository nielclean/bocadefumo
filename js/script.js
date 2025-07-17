document.addEventListener('DOMContentLoaded', async () => {
  const userId = '1355225924018245796';
  const profileContainer = document.querySelector('.profile-container');

  const connections = {
    instagram: {
      icon: "<img class='conn-icon' src='images/connections/instagram.svg'>",
      link: 'https://www.instagram.com/',
      user: true
    },
    discord: {
      icon: "<img class='conn-icon' src='images/connections/discord.svg'>",
      link: 'https://discord.com/users/',
      user: true
    },
    tiktok: {
      icon: "<img class='conn-icon' src='images/connections/tiktok.svg'>",
      link: 'https://www.tiktok.com/@',
      user: true
    }
  };

  const userLink = `https://discord.com/users/${userId}`;
  const profile = createProfile(0, userLink);
  profileContainer.appendChild(profile);

  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
    const data = await res.json();
    if (data.success) {
      updateProfile(0, data.data, connections);
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

function updateProfile(index, userData, connections) {
  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const flagsElement = document.getElementById(`flags${index + 1}`);
  const connsElement = document.getElementById(`conns${index + 1}`);

  // Avatar URL
  const avatarUrl = userData.discord_user.avatar?.startsWith('a_')
    ? `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.gif`
    : userData.discord_user.avatar
      ? `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/1.png`;

  imgElement.src = avatarUrl;
  nameElement.textContent = userData.discord_user.global_name || userData.discord_user.username || ' ';

  // Badges (flags)
  const badgeMap = {
    staff: "<img class='flag-icon' title='Discord Staff' src='images/flags/staff.svg'>",
    partner: "<img class='flag-icon' title='Partner' src='images/flags/partner.svg'>",
    hypesquad: "<img class='flag-icon' title='HypeSquad' src='images/flags/hypesquad.svg'>",
    bug_hunter_level_1: "<img class='flag-icon' title='Bug Hunter Level 1' src='images/flags/bughunter1.svg'>",
    bug_hunter_level_2: "<img class='flag-icon' title='Bug Hunter Level 2' src='images/flags/bughunter2.svg'>",
    verified_bot_developer: "<img class='flag-icon' title='Verified Bot Developer' src='images/flags/botdev.svg'>",
    certified_moderator: "<img class='flag-icon' title='Certified Moderator' src='images/flags/mod.svg'>",
    active_developer: "<img class='flag-icon' title='Active Developer' src='images/flags/activedev.svg'>",
    early_supporter: "<img class='flag-icon' title='Early Supporter' src='images/flags/earlysupport.svg'>",
  };

  function getFlagBit(flagName) {
    const mapping = {
      staff: 0,
      partner: 1,
      hypesquad: 2,
      bug_hunter_level_1: 3,
      bug_hunter_level_2: 14,
      verified_bot_developer: 16,
      certified_moderator: 17,
      active_developer: 22,
      early_supporter: 9,
    };
    return mapping[flagName] ?? 0;
  }

  const badgesHtml = userData.discord_user.public_flags
    ? Object.entries(badgeMap)
      .filter(([key]) => (userData.discord_user.public_flags & (1 << getFlagBit(key))) !== 0)
      .map(([, html]) => html)
      .join('')
    : '';

  flagsElement.innerHTML = badgesHtml || `<img class='flag-icon' src='images/flags/none.svg' alt='Nenhuma badge'>`;

  // Conexões: aqui você pode definir quais aparecem para esse usuário
  const userConnections = [
    { type: 'instagram', name: userData.social?.instagram || 'exemplo_insta' },
    { type: 'discord', name: userData.discord_user.username }
  ];

  if (userConnections.length > 0) {
    connsElement.className = 'conn-container';
    connsElement.innerHTML = userConnections.map(conn => {
      const lowerType = conn.type.toLowerCase();
      if (!(lowerType in connections)) return '';
      const connection = connections[lowerType];
      if (connection.user) {
        return `<a href="${connection.link}${conn.name}" target="_blank" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name}</span></a>`;
      }
      return `<a class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name}</span></a>`;
    }).join(' ');
  } else {
    connsElement.className = 'conn-container no-connections';
    connsElement.innerHTML = "<img class='conn-icon' src='images/connections/invis.svg' alt=' '>";
  }
}
