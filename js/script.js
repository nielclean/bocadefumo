document.addEventListener('DOMContentLoaded', () => {
  const userId = '1355225924018245796';
  fetch(https://api.lanyard.rest/v1/users/${userId})
    .then(res => res.json())
    .then(({ data }) => {
      const userLink = https://discord.com/users/${data.discord_user.id}/;
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
        badges: data.public_flags_array || [],
        connected_accounts: connectedAccounts
      });
    });
});
function atualizarprofile(index, userData) {
  const imgElement = document.getElementById(avatar${index + 1});
  const nameElement = document.getElementById(name${index + 1});
  const tagElement = document.createElement('p');
  const flagsElement = document.getElementById(flags${index + 1});
  const connsElement = document.getElementById(conns${index + 1});

  connsElement.className = (userData.connected_accounts && userData.connected_accounts.length > 0)
    ? 'conn-container'
    : 'conn-container no-connections';

  tagElement.className = 'tag';

  const avatarUrl = userData.user.avatar?.startsWith('a_')
    ? https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.gif
    : userData.user.avatar
    ? https://cdn.discordapp.com/avatars/${userData.user.id}/${userData.user.avatar}.png
    : https://cdn.discordapp.com/embed/avatars/1.png;

  tagElement.textContent = @${userData.user.username};
  imgElement.src = avatarUrl;
  nameElement.textContent = userData.user.global_name || userData.user.username || ' ';
  nameElement.appendChild(tagElement);

  // ❌ REMOVE FLAGS
  flagsElement.innerHTML = '';

  // ✅ Mantém apenas conexões necessárias
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
      return <a href="${link}${conn.name}" target="_blank" class="tooltip">${icon}<span class="tooltiptext">${conn.name}</span></a>;
    }
    return '';
  }).join(' ') || "<img class='conn-icon' src='https://ogp.wtf/assets/connections/invis.png' alt=' '>";

  imgElement.addEventListener('load', () => {
    const profileElement = document.querySelector(.profile:nth-child(${index + 1}));
    profileElement.classList.add('loaded');
  });
}


  const connections = {
    paypal: {
      icon: "<img class='conn-icon' src='https://discord.com/assets/c44f32fe60d6657fda9f.svg'>",
      off: true
    },
    domain: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/domain.svg'>",
      link: 'https://',
    },
    steam: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/steam.svg'>",
      link: 'https://steamcommunity.com/profiles/',
    },
    epicgames: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/epicgames.svg'>",
      off: true
    },
    spotify: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/spotify.svg'>",
      link: 'https://open.spotify.com/user/',
    },
    battlenet: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/battlenet.svg'>",
      off: true
    },
    crunchyroll: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/crunchyroll.svg'>",
      off: true
    },
    ebay: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/connections/ebay.svg'>",
      off: true
    },
    facebook: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/facebook.svg'>",
      link: 'https://www.facebook.com/@',
    },
    github: {
      icon: "<img class='conn-icon'src='https://ogp.wtf/assets/connections/github.svg'>",
      link: 'https://github.com/',
      user: true
    },
    leagueoflegends: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/leagueoflegends.svg'>",
      off: true
    },
    playstation: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/playstation.svg'>",
      off: true
    },
    reddit: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/reddit.svg'>",
      link: 'https://www.reddit.com/user/',
      user: true
    },
    riotgames: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/riot.svg'>",
      off: true
    },
    tiktok: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/tiktok.svg'>",
      link: 'https://www.tiktok.com/@',
      user: true
    },
    twitch: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/twitch.svg'>",
      link: 'https://www.twitch.tv/',
      user: true
    },
    twitter: {
      icon: "<img class='conn-icon' src='./assets/twitter.png'>",
      link: 'https://twitter.com/',
      user: true
    },
    xbox: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/xbox.svg'>",
      off: true
    },
    youtube: {
      icon: "<img class='conn-icon' src='https://ogp.wtf/assets/connections/youtube.svg'>",
      link: 'https://www.youtube.com/channel/',
    },
    instagram: {
      icon: "<img class='conn-icon' src='https://img.icons8.com/color/48/instagram-new--v2.png'>",
      link: 'https://www.instagram.com/',
      user: true
    },
    discord: {
      icon: "<img class='conn-icon' src='./assets/discord.svg'>",
      link: 'https://discord.com/users/',
      user: true
    },
  }
  connsElement.innerHTML = (userData.connected_accounts && userData.connected_accounts.length > 0)
    ? userData.connected_accounts.map((conn) => {
      if ((userData.user.id == '762781563040825385' || userData.user.id == '1147641364989890630') && conn.type == 'twitter') return ''
      const lowerCaseType = conn.type.toLowerCase();
      if (lowerCaseType in connections) {
        const connection = connections[lowerCaseType];
        if (connection.off) {
          return <a title="${conn.name || ''}" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>;
        }
        if (connection.user) {
          return <a href="${connection.link}${conn.type == 'discord' ? userData.user.id : conn.name}" target="_blank" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>;
        } else {
          return <a href="${connection.link}" target="_blank" class="tooltip">${connection.icon}<span class="tooltiptext">${conn.name || ''}</span></a>;
        }
      }
      return '';
    }).join(' ')
    : "<img class='conn-icon' src='https://ogp.wtf/assets/connections/invis.png' alt=' '>";

  nameElement.appendChild(tagElement);

  imgElement.addEventListener('load', () => {
    const profileElement = document.querySelector(.profile:nth-child(${index + 1});
    profileElement.classList.add('loaded');
  });
}

function createprofile(index, userLink) {
  const profile = document.createElement('div');
  profile.className = 'profile';
  const link = document.createElement('a');
  link.href = userLink || https://discord.com/users/${index + 1};
  link.target = "_blank";
  link.title = Clique para ir para o profile.;

  const avatar = document.createElement('img');
  avatar.id = avatar${index + 1};
  avatar.alt = '';

  const nameContainer = document.createElement('div');
  nameContainer.className = 'name-container';

  const nameParagraph = document.createElement('p');
  nameParagraph.id = name${index + 1};
  nameParagraph.textContent = ' ';

  const flagsParagraph = document.createElement('p');
  flagsParagraph.id = flags${index + 1};
  flagsParagraph.innerHTML = ' ';

  const connsParagraph = document.createElement('p');
  connsParagraph.id = conns${index + 1};
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
  audio.muted = false
  audio.volume = 0.3;
  audio.play();
}

function getKey(e) {
  var n = e.keyCode;
  if (console.log(n), 16 != n && 17 != n || (mode = 2), 1 == mode) {
    if (123 == n)
      return !1
  } else {
    if (73 == n || 74 == n || 85 == n)
      return !1;
    if (123 == n)
      return !1
  }
}
var rev = "fwd";
function titlebar(t) {
  var e = "urso.cc"
    , i = t
    , r = (e = "" + e).length;
  if ("fwd" == rev)
    i < r ? (i += 1,
      scroll = e.substr(0, i),
      document.title = scroll,
      timer = window.setTimeout("titlebar(" + i + ")", 145)) : (rev = "bwd",
        timer = window.setTimeout("titlebar(" + i + ")", 145));
  else if (i > 0) {
    var a = r - (i -= 1);
    scrol = e.substr(a, r),
      document.title = scrol,
      timer = window.setTimeout("titlebar(" + i + ")", 145)
  } else
    rev = "fwd",
      timer = window.setTimeout("titlebar(" + i + ")", 145)
}
//titlebar(0);

let mode = 1;
document.oncontextmenu = new Function("return false;");
// window.onkeydown = getKey;

document.querySelector('.profile-container').onmousemove = e => {
  for (const profile of document.querySelectorAll('.profile')) {
    const rect = profile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    document.documentElement.style.setProperty('--mouse-x', ${x}px);
    document.documentElement.style.setProperty('--mouse-y', ${y}px);
  }
};


document.addEventListener("DOMContentLoaded", async function () {
  var audio = document.getElementById("audio");
  var muteButton = document.getElementById("muteButton");
  var muteIcon = document.getElementById("muteIcon");
  var unmuteIcon = document.getElementById("unmuteIcon");

  if (!audio.muted) {
    muteIcon.style.display = "none";
    unmuteIcon.style.display = "inline-block";
  }
  let views = await fetch(https://ogp.wtf/api/starsviews, { method: 'POST' }).then(res => res.json());
  document.getElementById("views").innerHTML = views.views;
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
