function updateProfileImage(userId) {
    fetch('https://api.lanyard.rest/v1/users/' + userId)
        .then(response => response.json())
        .then(data => {
            const user = data.data.discord_user;
            const profileImage = document.querySelector('.profile-img[data-user-id="' + userId + '"]');
            const usernameElement = document.querySelector('.nickr[data-user-id="' + userId + '"]');
            const subnickElement = document.querySelector('.subnick[data-user-id="' + userId + '"]'); 
            const badgesContainer = document.querySelector('.badges[badges-user-id="' + userId + '"]'); 
  
            profileImage.src = user.avatar
                ? 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.' + (user.avatar.startsWith('a_') ? 'gif' : 'png') + '?size=512'
                : 'https://cdn.discordapp.com/embed/avatars/1.png';
  
            
            usernameElement.textContent = user.display_name ? user.display_name : user.username; 
  
      
            subnickElement.textContent = user.username;
  
      
            badgesContainer.innerHTML = '';
  
            for (let badge of user.public_flags.badges) {
                let badgeElement = document.createElement('div');
                badgeElement.className = 'badge';
                badgeElement.style.backgroundImage = badge.id === 'premium' 
                    ? "url('https://raw.githubusercontent.com/Rep7/badges/main/svg/discordnitro.svg')" 
                    : "url('https://raw.githubusercontent.com/mezotv/discord-badges/" + badge.id + ".svg')";
                badgeElement.dataset.tooltip = badge.description;
                badgesContainer.appendChild(badgeElement);
            }
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
  }


  updateProfileImage('887794559759814656');
  updateProfileImage('1307460123509264508');


  
  
  