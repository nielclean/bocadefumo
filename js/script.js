

document.addEventListener('DOMContentLoaded', () => {
  fetch(`https://ogp.wtf/api/thestars`).then(res => res.json().then(json => {
    json.forEach((user, index) => {
      const userLink = `https://discord.com/users/${user.user.id}/`;
      const profile = createprofile(index, userLink);
      const profileContainer = document.querySelector('.profile-container');
      profileContainer.appendChild(profile);
      setTimeout(() => {
        atualizarprofile(index, user);
      }, 100 * index);
    })
  }))
})

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

    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
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
  let views = await fetch(`https://ogp.wtf/api/starsviews`, { method: 'POST' }).then(res => res.json());
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


