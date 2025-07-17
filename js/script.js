document.addEventListener('DOMContentLoaded', () => {
  const ids = ['1355225924018245796', '865792844212207636'];
  fetch(`https://api.lanyard.rest/v1/users/${ids.join(',')}`)
    .then(res => res.json())
    .then(data => {
      const users = data.data;
      users.forEach((user, index) => {
        const userLink = `https://discord.com/users/${user.discord_user.id}/`;
        const profile = createprofile(index, userLink);
        const profileContainer = document.querySelector('.profile-container');
        profileContainer.appendChild(profile);
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
  userData.user = userData.discord_user;
  userData.badges = extractBadgesFromFlags(userData.discord_user.public_flags, userData.discord_user.username);
  userData.connected_accounts = [
    { type: 'discord', name: `@${userData.discord_user.username}` }
  ];

  const imgElement = document.getElementById(`avatar${index + 1}`);
  const nameElement = document.getElementById(`name${index + 1}`);
  const tagElement = document.createElement('p');
  const flagsElement = document.getElementById(`flags${index + 1}`);
  const connsElement = document.getElementById(`conns${index + 1}`);

  let avatarUrl = userData.user.avatar?.startsWith('a_') ?
    `https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.gif` :
    userData.user.avatar ?
    `https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.png` :
    `https://cdn.discordapp.com/embed/avatars/1.png`;

  tagElement.textContent = `@${userData.user.username}`;
  tagElement.className = 'tag';
  imgElement.src = avatarUrl;
  nameElement.textContent = userData.user.global_name || userData.user.username || ' ';
  nameElement.appendChild(tagElement);

  const flags = {
    active_developer: "<img class='flag-icon' title='Desenvolvedor(a) Ativo(a)' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/activedeveloper.svg'>",
    early_supporter: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordearlysupporter.svg' title='Apoiador Inicial'>",
    hypesquad_house_1: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbravery.svg' title='Bravery'>",
    hypesquad_house_2: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbrilliance.svg' title='Brilliance'>",
    hypesquad_house_3: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadbalance.svg' title='Balance'>",
    premium: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordnitro.svg' title='Nitro'>",
    verified_developer: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbotdev.svg' title='Dev Verificado'>",
    hypesquad: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/hypesquadevents.svg' title='HypeSquad Events'>",
    partner: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordpartner.svg' title='Parceiro Discord'>",
    certified_moderator: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordmod.svg' title='Moderador Certificado'>",
    bug_hunter_level_2: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter2.svg' title='Bug Hunter Nível 2'>",
    bug_hunter_level_1: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordbughunter.svg' title='Bug Hunter'>",
    staff: "<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/discordstaff.svg' title='Equipe Discord'>",
    legacy_username: `<img class='flag-icon' src='https://raw.githubusercontent.com/mezotv/discord-badges/main/assets/username.png' title='Username original'>`
  };

  flagsElement.innerHTML = (userData.badges && userData.badges.length > 0)
    ? userData.badges.map(flag => {
        const flagHtml = flags[flag.id];
        const title = (flagHtml.match(/title='(.*?)'/) || [])[1] || '';
        return `<div class="tooltip" style="white-space: nowrap;">${flagHtml}<span class="tooltiptext">${title}</span></div>`;
      }).join('')
    : `<img class='flag-icon' src='https://ogp.wtf/assets/connections/invis.png' alt=' '>`;


  connsElement.innerHTML = `<a href="https://discord.com/users/${userData.user.id}" target="_blank" class="tooltip">
    <img class='conn-icon' src='./assets/discord.svg'>
    <span class="tooltiptext">@${userData.user.username}</span>
  </a>`;

  imgElement.addEventListener('load', () => {
    const profileElement = document.querySelector(`.profile:nth-child(${index + 1})`);
    profileElement.classList.add('loaded');
  });
}

function createprofile(index, userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile';

  const link = document.createElement('a');
  link.href = userLink;
  link.target = "_blank";
  link.title = "Clique para ir para o profile.";

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
  audio.play();
}

document.querySelector('.profile-container').onmousemove = e => {
  for (const profile of document.querySelectorAll('.profile')) {
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("audio");
  var muteButton = document.getElementById("muteButton");
  var muteIcon = document.getElementById("muteIcon");
  var unmuteIcon = document.getElementById("unmuteIcon");

  if (!audio.muted) {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "inline-block";
  }

  muteButton.addEventListener("click", function () {
    if (audio.muted) {
      audio.muted = false;
      muteIcon.style.display = "none";
      unmuteIcon.style.display = "inline-block";
    } else {
      audio.muted = true;
      muteIcon.style.display = "inline-block";
      unmuteIcon.style.display = "none";
    }
  });
});
