function removeOverlay() {
  var _0x34bdb6 = document.querySelector(".black-overlay");
  Musica();
  _0x34bdb6.style.transition = "opacity 1s";
  _0x34bdb6.style.opacity = '0';
  setTimeout(() => {
    _0x34bdb6.style.display = "none";
  }, 0x3e8);
}
function Musica() {
  const _0x2f7b25 = document.getElementById('audio');
  _0x2f7b25.muted = false;
  _0x2f7b25.volume = 0.3;
  _0x2f7b25.play();
}
function getKey(_0x2af598) {
  var _0x4a5e69 = _0x2af598.keyCode;
  console.log(_0x4a5e69);
  if (!(0x10 != _0x4a5e69 && 0x11 != _0x4a5e69)) {
    mode = 0x2;
  }
  if (0x1 == mode) {
    if (0x7b == _0x4a5e69) {
      return false;
    }
  } else {
    if (0x49 == _0x4a5e69 || 0x4a == _0x4a5e69 || 0x55 == _0x4a5e69) {
      return false;
    }
    if (0x7b == _0x4a5e69) {
      return false;
    }
  }
}
document.title = " Richboy";
let mode = 0x1;
document.oncontextmenu = new Function("return false;");
document.querySelector(".profile-container").onmousemove = _0x28c42b => {
  for (const _0x4eb1c5 of document.querySelectorAll(".profile")) {
    const _0x55715b = _0x4eb1c5.getBoundingClientRect();
    const _0x45feed = _0x28c42b.clientX - _0x55715b.left;
    const _0x5db844 = _0x28c42b.clientY - _0x55715b.top;
    document.documentElement.style.setProperty("--mouse-x", _0x45feed + 'px');
    document.documentElement.style.setProperty("--mouse-y", _0x5db844 + 'px');
  }
};
document.addEventListener("DOMContentLoaded", function () {
  var _0x5967f6 = document.getElementById("audio");
  var _0x5b15a6 = document.getElementById("muteButton");
  var _0x2824f3 = document.getElementById("muteIcon");
  var _0x2f6f44 = document.getElementById("unmuteIcon");
  if (!_0x5967f6.muted) {
    _0x2824f3.style.display = 'none';
    _0x2f6f44.style.display = 'inline-block';
  }
  _0x5b15a6.addEventListener('click', function () {
    if (_0x5967f6.muted) {
      _0x5967f6.muted = false;
      _0x2824f3.style.display = "none";
      _0x2f6f44.style.display = "inline-block";
    } else {
      _0x5967f6.muted = true;
      _0x2824f3.style.display = "inline-block";
      _0x2f6f44.style.display = "none";
    }
  });
});
