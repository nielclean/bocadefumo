document.addEventListener('DOMContentLoaded', () => {
  const ids = ['1355225924018245796', '865792844212207636'];

  Promise.all(
    ids.map(id =>
      fetch(`https://api.lanyard.rest/v1/users/${id}`).then(res => res.json())
    )
  ).then(responses => {
    responses.forEach((response, index) => {
      const user = response.data;
      const userLink = `https://discord.com/users/${user.discord_user.id}`;
      const profile = createprofile(index, userLink);
      document.querySelector('.profile-container').appendChild(profile);
      setTimeout(() => {
        atualizarprofile(index, user);
      }, 100 * index);
    });
  });
});

function extractBadgesFromFlags(flags, legacy_username) {
  const badgeMap = {
    1: "staff",
    2: "partner",
    4: "hypesquad",
    8: "bug_hunter_level_1",
    64: "hypesquad_house_1",
    128: "hypesquad_house_2",
    256: "hypesquad_house_3",
    512: "premium",
    16384: "bug_hunter_level_2",
    65536: "verified_developer",
    131072: "certified_moderator",
    4194304: "active_developer",
    1073741824: "legacy_username"
  };

  const badges = [];

  for (const bit in badgeMap) {
    if ((flags & bit) != 0) {
      badges.push({ id: badgeMap[bit], legacy_username });
    }
  }

  return badges;
}

function atualizarprofile(index, userData) {
  const user = userData.discord_user;

  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const tagElement = document.createElement('p');
  const flagsElement = document.getElementById(`flags${index + 1}`);
  const connsElement = document.getElementById(`conns${index + 1}`);

  tagElement.className = 'tag';

  const avatarUrl = user.avatar?.startsWith('a_')
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif`
    : user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/1.png`;

  tagElement.textContent = `@${user.username}`;
  imgElement.src = avatarUrl;
  nameElement.textContent = user.global_name || user.username || ' ';
  nameElement.appendChild(tagElement);

  // Badges
  const flags = extractBadgesFromFlags(user.public_flags, user.legacy_username);
  const badgeIcons = {
    staff: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordstaff.svg',
    partner: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordpartner.svg',
    hypesquad: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadevents.svg',
    bug_hunter_level_1: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter1.svg',
    hypesquad_house_1: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbravery.svg',
    hypesquad_house_2: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbrilliance.svg',
    hypesquad_house_3: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbalance.svg',
    premium: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordnitro.svg',
    bug_hunter_level_2: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter2.svg',
    verified_developer: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbotdev.svg',
    certified_moderator: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordmod.svg',
    active_developer: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/activedeveloper.svg',
    legacy_username: 'https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/username.png',
  };

  flagsElement.innerHTML = flags.length > 0
    ? flags.map(flag => {
        const icon = badgeIcons[flag.id];
        const title = flag.id === "legacy_username" ? `Originalmente ${flag.legacy_username}` : flag.id.replace(/_/g, ' ');
        return `<div class="tooltip"><img class='flag-icon' src='${icon}' title='${title}'><span class="tooltiptext">${title}</span></div>`;
      }).join('')
    : `<img class='flag-icon' src='https://ogp.wtf/assets/connections/invis.png' alt=' '>`;

  // Conexões (pode adicionar outras se quiser)
  const conns = userData.connected_accounts || [];
  connsElement.className = conns.length > 0 ? 'conn-container' : 'conn-container no-connections';

  const connIcons = {
    spotify: { icon: 'https://ogp.wtf/assets/connections/spotify.svg', link: 'https://open.spotify.com/user/' },
    github: { icon: 'https://ogp.wtf/assets/connections/github.svg', link: 'https://github.com/' },
    twitter: { icon: './assets/twitter.png', link: 'https://twitter.com/' },
    instagram: { icon: './assets/instagram.png', link: 'https://www.instagram.com/' },
    discord: { icon: './assets/discord.svg', link: 'https://discord.com/users/' },
  };

  connsElement.innerHTML = conns.length > 0
    ? conns.map(conn => {
        const type = conn.type.toLowerCase();
        if (!(type in connIcons)) return '';
        const { icon, link } = connIcons[type];
        const username = type === 'discord' ? user.id : conn.name;
        return `<a href="${link}${username}" target="_blank" class="tooltip"><img class='conn-icon' src='${icon}'><span class="tooltiptext">${conn.name}</span></a>`;
      }).join(' ')
    : `<img class='conn-icon' src='https://ogp.wtf/assets/connections/invis.png' alt=' '>`;


  imgElement.addEventListener('load', () => {
    const profileElement = document.querySelector(`.profile:nth-child(${index + 1})`);
    profileElement?.classList.add('loaded');
  });
}

function createprofile(index, userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile';

  const link = document.createElement('a');
  link.href = userLink;
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

function removeOverlay() {
  var overlay = document.querySelector('.black-overlay');
  Musica();
  overlay.style.transition = 'opacity 1s';
  overlay.style.opacity = '0';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
}

function Musica() {
  const audio = document.getElementById('audio');
  audio.muted = false;
  audio.volume = 0.3;
  audio.play().catch(() => {});
}

document.addEventListener("DOMContentLoaded", async function () {
  const audio = document.getElementById("audio");
  const muteButton = document.getElementById("muteButton");
  const muteIcon = document.getElementById("muteIcon");
  const unmuteIcon = document.getElementById("unmuteIcon");

  if (!audio.muted) {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "inline-block";
  }

  try {
    const views = await fetch(`https://ogp.wtf/api/starsviews`, { method: 'POST' }).then(res => res.json());
    document.getElementById("views").innerHTML = views.views;
  } catch (e) {
    console.warn("Falha ao carregar visualizações.");
  }

  muteButton.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteIcon.style.display = audio.muted ? "inline-block" : "none";
    unmuteIcon.style.display = audio.muted ? "none" : "inline-block";
  });
});

document.querySelector('.profile-container').onmousemove = e => {
  for (const profile of document.querySelectorAll('.profile')) {
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  }
};
