// dashboard.js — Logique du dashboard (SIMULATION)

// Données fictives du portefeuille
let portfolioData = {
  btc: { amount: 0.0023, price: 56000, change: 0 },
  eth: { amount: 0.031, price: 3200, change: 0 },
  alt: { amount: 238.5, price: 0.42, change: 0 }
};

let totalBalance = 100; // Départ à 100$
let investmentStart = 100;

// Fonction pour calculer le solde total
function calculateTotalBalance() {
  const btcValue = portfolioData.btc.amount * portfolioData.btc.price;
  const ethValue = portfolioData.eth.amount * portfolioData.eth.price;
  const altValue = portfolioData.alt.amount * portfolioData.alt.price;
  return btcValue + ethValue + altValue;
}

// Fonction pour formater les nombres
function formatCurrency(num) {
  return num.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Fonction pour mettre à jour l'affichage du dashboard
function updateDashboard() {
  totalBalance = calculateTotalBalance();
  const totalProfit = totalBalance - investmentStart;
  const dailyChange = ((Math.random() * 20) + 10).toFixed(2); // 10-30% fictif

  // Mise à jour des statistiques principales
  document.getElementById('totalBalance').textContent = formatCurrency(totalBalance) + '$';
  document.getElementById('totalProfit').textContent = formatCurrency(totalProfit) + '$';
  document.getElementById('dailyChange').textContent = dailyChange;

  // Calcul des valeurs individuelles
  const btcValue = portfolioData.btc.amount * portfolioData.btc.price;
  const ethValue = portfolioData.eth.amount * portfolioData.eth.price;
  const altValue = portfolioData.alt.amount * portfolioData.alt.price;

  // Changements aléatoires
  portfolioData.btc.change = (Math.random() * 10 + 5).toFixed(2);
  portfolioData.eth.change = (Math.random() * 12 + 4).toFixed(2);
  portfolioData.alt.change = (Math.random() * 25 + 8).toFixed(2);

  // Mise à jour du portfolio
  document.getElementById('btcAmount').textContent = portfolioData.btc.amount.toFixed(4);
  document.getElementById('btcValue').textContent = formatCurrency(btcValue) + '$';
  document.getElementById('btcChange').textContent = portfolioData.btc.change;

  document.getElementById('ethAmount').textContent = portfolioData.eth.amount.toFixed(4);
  document.getElementById('ethValue').textContent = formatCurrency(ethValue) + '$';
  document.getElementById('ethChange').textContent = portfolioData.eth.change;

  document.getElementById('altAmount').textContent = portfolioData.alt.amount.toFixed(2);
  document.getElementById('altValue').textContent = formatCurrency(altValue) + '$';
  document.getElementById('altChange').textContent = portfolioData.alt.change;
}

// Simulation d'augmentation progressive des valeurs (arnaque typique)
function simulateGrowth() {
  // Augmentation aléatoire entre 0.5% et 2%
  const growthFactor = 1 + (Math.random() * 0.015 + 0.005);

  portfolioData.btc.amount *= growthFactor;
  portfolioData.eth.amount *= growthFactor;
  portfolioData.alt.amount *= growthFactor;

  updateDashboard();
}

// Graphique du portefeuille
let portfolioChart;
function initPortfolioChart() {
  const ctx = document.getElementById('portfolioChart').getContext('2d');
  const labels = Array.from({length: 30}, (_, i) => '');
  const data = Array.from({length: 30}, (_, i) => investmentStart * (1 + i * 0.03));

  portfolioChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Valeur du portefeuille (FICTIF)',
        data: data,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return value.toFixed(0) + '$';
            }
          }
        },
        x: { display: false }
      }
    }
  });

  // Mise à jour du graphique toutes les 2 secondes
  setInterval(() => {
    const ds = portfolioChart.data.datasets[0];
    const last = ds.data[ds.data.length - 1];
    ds.data.push(last * (1 + Math.random() * 0.02));
    ds.data.shift();
    portfolioChart.update('none');
  }, 2000);
}

// Fonction pour créer un pop-up personnalisé
function showCustomPopup(type) {
  const popup = document.createElement('div');
  popup.className = 'custom-popup-overlay';

  let title, message, emoji;

  if (type === 'withdraw') {
    title = '🛑 ARRÊTEZ-VOUS !';
    emoji = '❤️';
    message = `
      <p style="font-size: 1.3rem; font-weight: 700; color: #ff4d4f; margin-bottom: 20px;">
        C'est votre fils Darius qui vous parle
      </p>
      <p style="font-size: 1.1rem; margin-bottom: 16px;">
        <strong>S'il vous plaît, prenez conscience :</strong>
      </p>
      <ul style="text-align: left; margin: 20px auto; max-width: 500px; line-height: 1.8;">
        <li>🚫 <strong>AUCUN investissement ne garantit 100% de retour</strong></li>
        <li>⚠️ Les vrais sites d'arnaque <strong>bloquent TOUJOURS les retraits</strong></li>
        <li>💸 Ils demandent des "frais supplémentaires" que vous ne reverrez jamais</li>
        <li>⏰ Ils inventent des délais de "30 jours" qui ne finissent jamais</li>
        <li>💔 Des milliers de personnes perdent leurs économies chaque jour</li>
      </ul>
      <p style="font-size: 1.2rem; font-weight: 700; color: #ffd666; margin-top: 24px;">
        Si quelqu'un vous promet des gains garantis, C'EST UNE ARNAQUE !
      </p>
      <p style="margin-top: 20px; font-size: 0.95rem; color: #94a3b8;">
        Je vous aime et je ne veux pas que vous perdiez votre argent ❤️
      </p>
    `;
  } else {
    title = '🛑 ATTENTION DANGER !';
    emoji = '❤️';
    message = `
      <p style="font-size: 1.3rem; font-weight: 700; color: #ff4d4f; margin-bottom: 20px;">
        C'est votre fils Darius qui vous supplie
      </p>
      <p style="font-size: 1.1rem; margin-bottom: 16px;">
        <strong>N'INVESTISSEZ PAS UN CENTIME DE PLUS !</strong>
      </p>
      <ul style="text-align: left; margin: 20px auto; max-width: 500px; line-height: 1.8;">
        <li>🎯 <strong>C'est exactement leur technique :</strong> vous montrer de faux gains</li>
        <li>💰 Vous faire croire que "plus vous investissez, plus vous gagnez"</li>
        <li>🪤 C'est un PIÈGE pour soutirer encore plus d'argent</li>
        <li>😢 Une fois envoyé, votre argent est PERDU À JAMAIS</li>
        <li>🚔 Les escrocs disparaissent avec tout votre argent</li>
      </ul>
      <p style="font-size: 1.2rem; font-weight: 700; color: #ffd666; margin-top: 24px;">
        Les gains affichés sont FAUX ! C'est du HTML, pas de l'argent réel !
      </p>
      <p style="margin-top: 20px; font-size: 0.95rem; color: #94a3b8;">
        Protégez votre argent durement gagné, s'il vous plaît ❤️
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

  // Animation d'entrée
  setTimeout(() => popup.classList.add('show'), 10);

  // Fermeture du popup
  popup.querySelector('.popup-close-btn').addEventListener('click', () => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
  });

  // Fermeture en cliquant sur l'overlay
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('show');
      setTimeout(() => popup.remove(), 300);
    }
  });
}

// Gestionnaires d'événements pour les boutons d'action
document.getElementById('withdrawBtn')?.addEventListener('click', () => {
  showCustomPopup('withdraw');
});

document.getElementById('investMoreBtn')?.addEventListener('click', () => {
  showCustomPopup('invest');
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  initPortfolioChart();

  // Simulation de croissance toutes les 3 secondes
  setInterval(simulateGrowth, 3000);
});
