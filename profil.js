// profil.js — Logique de la page profil (SIMULATION)

// Données de profil fictives
const userProfile = {
  name: 'Utilisateur Demo',
  userId: 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  email: 'demo@exemple.com',
  phone: '+33 6 XX XX XX XX',
  joinDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Il y a 7 jours
  referralCode: 'DEMO-REF-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  referrals: 0,
  referralBonus: 0
};

// Formatage de la date
function formatDate(date) {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Mise à jour des informations du profil
function updateProfileInfo() {
  document.getElementById('userName').textContent = userProfile.name;
  document.getElementById('userId').textContent = userProfile.userId;
  document.getElementById('userEmail').textContent = userProfile.email;
  document.getElementById('userPhone').textContent = userProfile.phone;
  document.getElementById('joinDate').textContent = formatDate(userProfile.joinDate);
}

// Fonction pour créer un pop-up personnalisé (version profil)
function showCustomPopup(type, data = {}) {
  const popup = document.createElement('div');
  popup.className = 'custom-popup-overlay';

  let title, message, emoji;

  if (type === 'password') {
    title = '🔐 DANGER - Vos mots de passe !';
    emoji = '⚠️';
    message = `
      <p style="font-size: 1.3rem; font-weight: 700; color: #ff4d4f; margin-bottom: 20px;">
        Message de Darius, votre fils
      </p>
      ${data.password ? `<p style="background: rgba(255,77,79,0.2); padding: 12px; border-radius: 8px; margin-bottom: 16px;">
        Vous avez tapé : <strong>"${data.password}"</strong>
      </p>` : ''}
      <p style="font-size: 1.1rem; margin-bottom: 16px;">
        <strong>S'il vous plaît, prenez conscience :</strong>
      </p>
      <ul style="text-align: left; margin: 20px auto; max-width: 500px; line-height: 1.8;">
        <li>🚨 Les vrais sites d'arnaque <strong>VOLENT vos mots de passe</strong></li>
        <li>🔓 Ils essaient ces mots de passe sur vos banques, emails, réseaux sociaux</li>
        <li>💳 Ils peuvent vider vos comptes bancaires</li>
        <li>📧 Ils accèdent à vos emails et arnaquer vos contacts</li>
        <li>🛡️ <strong>NE JAMAIS</strong> entrer vos vrais mots de passe sur un site suspect</li>
      </ul>
      <p style="font-size: 1.2rem; font-weight: 700; color: #ffd666; margin-top: 24px;">
        Un vrai site ne vous demandera JAMAIS de changer votre mot de passe de cette façon !
      </p>
      <p style="margin-top: 20px; font-size: 0.95rem; color: #94a3b8;">
        Votre sécurité est précieuse ❤️ - Darius
      </p>
    `;
  } else if (type === 'delete') {
    title = '❌ Suppression impossible !';
    emoji = '🚫';
    message = `
      <p style="font-size: 1.3rem; font-weight: 700; color: #ff4d4f; margin-bottom: 20px;">
        C'est Darius - Écoutez bien ceci
      </p>
      <p style="font-size: 1.1rem; margin-bottom: 16px;">
        <strong>Dans les vraies arnaques :</strong>
      </p>
      <ul style="text-align: left; margin: 20px auto; max-width: 500px; line-height: 1.8;">
        <li>🚫 La suppression de compte <strong>NE FONCTIONNE JAMAIS</strong></li>
        <li>⏰ Ils disent "Délai de 30-90 jours" qui ne finit jamais</li>
        <li>💰 "Vous devez retirer vos fonds d'abord" (impossible !)</li>
        <li>📞 Ils continuent à vous harceler par téléphone/email</li>
        <li>🗄️ Vos données personnelles sont <strong>DÉJÀ VOLÉES</strong></li>
      </ul>
      <p style="font-size: 1.2rem; font-weight: 700; color: #ffd666; margin-top: 24px;">
        Si vous avez vraiment donné vos infos à une arnaque :
      </p>
      <ol style="text-align: left; margin: 20px auto; max-width: 500px; line-height: 1.8;">
        <li>📞 Appelez votre banque IMMÉDIATEMENT</li>
        <li>🔒 Changez TOUS vos mots de passe</li>
        <li>🚔 Signalez sur Pharos.gouv.fr</li>
        <li>👮 Portez plainte au commissariat</li>
      </ol>
      <p style="margin-top: 20px; font-size: 0.95rem; color: #94a3b8;">
        Je suis là pour vous aider ❤️ - Darius
      </p>
    `;
  }

  popup.innerHTML = `
    <div class="custom-popup">
      <div class="popup-emoji">${emoji}</div>
      <h2 class="popup-title">${title}</h2>
      <div class="popup-content">
        ${message}
      </div>
      <button class="popup-close-btn">J'ai compris - Merci Darius</button>
    </div>
  `;

  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add('show'), 10);

  popup.querySelector('.popup-close-btn').addEventListener('click', () => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 300);
    }
  });
}

// Gestion du bouton "Changer le mot de passe"
document.getElementById('changePasswordBtn')?.addEventListener('click', () => {
  const fakePassword = prompt('⚠️ SIMULATION ÉDUCATIVE\n\nEntrez votre "nouveau" mot de passe (ceci ne sera PAS sauvegardé) :');

  if (fakePassword) {
    showCustomPopup('password', { password: fakePassword });
  }
});

// Gestion du bouton "Activer 2FA"
document.getElementById('add2FABtn')?.addEventListener('click', () => {
  alert('⚠️ SIMULATION ÉDUCATIVE\n\nFausse sécurité !\n\nLes arnaques affichent souvent des fonctionnalités de sécurité (2FA, KYC, SSL) pour :\n• Paraître légitimes\n• Inspirer confiance\n• Collecter encore plus d\'informations personnelles\n\nVérifiez TOUJOURS la légitimité d\'une plateforme avant d\'activer quoi que ce soit.');
});

// Gestion du bouton "Supprimer le compte"
document.getElementById('deleteAccountBtn')?.addEventListener('click', () => {
  const confirm = window.confirm('⚠️ SIMULATION ÉDUCATIVE\n\nVoulez-vous vraiment "supprimer" ce compte fictif ?\n(Ceci démontre comment les arnaques gèrent les suppressions)');

  if (confirm) {
    showCustomPopup('delete');
  }
});

// Copier le code de parrainage (simulation)
document.querySelector('.code-display')?.addEventListener('click', function() {
  const code = this.textContent;

  // Simulation de copie dans le presse-papier
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      // Feedback visuel
      const original = this.textContent;
      this.textContent = '✓ Copié !';
      this.style.background = 'rgba(82, 196, 26, 0.2)';

      setTimeout(() => {
        this.textContent = original;
        this.style.background = 'rgba(139,92,246,0.15)';
      }, 2000);

      // Message éducatif
      setTimeout(() => {
        alert('⚠️ TECHNIQUE D\'ARNAQUE : PARRAINAGE\n\nLes systèmes de parrainage transforment les victimes en recruteurs :\n\n• Vous partagez le lien à vos amis/famille\n• Ils investissent et perdent leur argent\n• Vous vous sentez coupable\n• Les escrocs gagnent encore plus\n\nNE JAMAIS partager des liens d\'investissement suspects, même avec des "bonus" !');
      }, 2500);
    });
  } else {
    alert('Code de parrainage (FICTIF) : ' + code + '\n\n⚠️ Ne partagez JAMAIS de vrais liens d\'arnaque !');
  }
});

// Animation des statistiques de parrainage (augmentation fictive)
function animateReferralStats() {
  let referrals = 0;
  let bonus = 0;

  const interval = setInterval(() => {
    if (referrals < 3) {
      referrals++;
      bonus += Math.floor(Math.random() * 50) + 25; // Entre 25$ et 75$

      document.querySelector('.reward-item:nth-child(1) .reward-number').textContent = referrals;
      document.querySelector('.reward-item:nth-child(2) .reward-number').textContent = bonus + '$';
    } else {
      clearInterval(interval);
    }
  }, 3000);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  updateProfileInfo();

  // Démarrer l'animation des stats de parrainage après 2 secondes
  setTimeout(animateReferralStats, 2000);
});
