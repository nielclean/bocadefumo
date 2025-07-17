// Função para remover a sobreposição (overlay)
function removeOverlay() {
  const overlay = document.getElementById('black-overlay');
  playMusic();

  overlay.style.transition = 'opacity 1s';
  overlay.style.opacity = '0';

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);
}

// Função para tocar a música (audio)
function playMusic() {
  const audio = document.querySelector('audio');
  audio.muted = false;
  audio.volume = 0.3;
  audio.play();
}

// Variável de controle de modo
let mode = 1;

// Função para tratar eventos de tecla pressionada
function getKey(event) {
  const keyCode = event.keyCode;
  console.log(keyCode);

  // Se for tecla Shift (16) ou Ctrl (17), seta mode para 2
  if (keyCode === 16 || keyCode === 17) {
    mode = 2;
  }

  if (mode === 1) {
    // Se modo 1 e tecla F12 (123), bloqueia a ação
    if (keyCode === 123) return false;
  } else {
    // Se modo 2, bloqueia tecla I(73), J(74), U(85) e F12(123)
    if ([73, 74, 85, 123].includes(keyCode)) return false;
  }
}

// Adiciona um evento para atualizar as variáveis CSS de posição do mouse
document.querySelectorAll('.profile-container').forEach(element => {
  element.onmousemove = function(event) {
    const rect = element.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
    document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
  };
});

// Previne menu de contexto (botão direito do mouse)
document.addEventListener('contextmenu', e => e.preventDefault());

// Configura título da página
document.title = ' Richboy';

// Evento DOMContentLoaded para configurar botão mute/unmute
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.querySelector('audio');
  const muteButton = document.getElementById('muteButton');
  const muteIcon = document.getElementById('muteIcon');
  const unmuteIcon = document.getElementById('unmuteIcon');

  if (!audio.muted) {
    muteIcon.style.display = 'none';
    unmuteIcon.style.display = 'inline-block';
  }

  muteButton.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      muteIcon.style.display = 'none';
      unmuteIcon.style.display = 'inline-block';
    } else {
      audio.muted = true;
      muteIcon.style.display = 'inline-block';
      unmuteIcon.style.display = 'none';
    }
  });
});
