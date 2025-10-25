// transactions.js — Génération de fausses transactions (SIMULATION)

const transactionTypes = {
  deposit: { icon: '💵', label: 'Dépôt initial', class: 'deposit' },
  profit: { icon: '📈', label: 'Gains automatiques', class: 'profit' },
  withdrawal: { icon: '💸', label: 'Demande de retrait', class: 'withdrawal' }
};

// Génération de transactions fictives
function generateFakeTransactions() {
  const transactions = [];
  const now = new Date();

  // Dépôt initial
  transactions.push({
    type: 'deposit',
    amount: 100,
    date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // Il y a 7 jours
    status: 'completed',
    description: 'Dépôt initial'
  });

  // Gains automatiques quotidiens (fictifs)
  for (let i = 6; i >= 0; i--) {
    const profitAmount = Math.random() * 50 + 20; // Entre 20$ et 70$
    transactions.push({
      type: 'profit',
      amount: profitAmount,
      date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000),
      status: 'completed',
      description: `Gains du ${formatDate(new Date(now.getTime() - i * 24 * 60 * 60 * 1000))}`
    });
  }

  // Quelques tentatives de retrait "en attente"
  transactions.push({
    type: 'withdrawal',
    amount: -150,
    date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    status: 'pending',
    description: 'Retrait vers compte bancaire'
  });

  transactions.push({
    type: 'withdrawal',
    amount: -200,
    date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    status: 'pending',
    description: 'Retrait vers portefeuille crypto'
  });

  return transactions.sort((a, b) => b.date - a.date);
}

// Formatage de la date
function formatDate(date) {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Formatage de la monnaie
function formatCurrency(num) {
  return Math.abs(num).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Affichage des transactions
function displayTransactions(filter = 'all') {
  const container = document.getElementById('transactionsList');
  const transactions = generateFakeTransactions();

  let filteredTransactions = transactions;
  if (filter !== 'all') {
    filteredTransactions = transactions.filter(t => t.type === filter);
  }

  container.innerHTML = '';

  filteredTransactions.forEach(transaction => {
    const typeInfo = transactionTypes[transaction.type];
    const statusClass = transaction.status;
    const statusText = {
      completed: 'Terminé',
      pending: 'En attente',
      failed: 'Échoué'
    }[transaction.status];

    const sign = transaction.amount > 0 ? '+' : '';
    const amountColor = transaction.amount > 0 ? 'color: #52c41a' : 'color: #ff4d4f';

    const item = document.createElement('div');
    item.className = 'transaction-item';
    item.innerHTML = `
      <div class="transaction-info">
        <div class="transaction-icon ${typeInfo.class}">${typeInfo.icon}</div>
        <div class="transaction-details">
          <div class="transaction-type">${transaction.description}</div>
          <div class="transaction-date">${formatDate(transaction.date)}</div>
        </div>
      </div>
      <div class="transaction-amount">
        <div class="amount" style="${amountColor}">${sign}${formatCurrency(transaction.amount)}$</div>
        <div class="status ${statusClass}">${statusText}</div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Affichage des retraits en attente
function displayPendingWithdrawals() {
  const container = document.getElementById('pendingList');
  const transactions = generateFakeTransactions();
  const pendingWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending');

  container.innerHTML = '';

  if (pendingWithdrawals.length === 0) {
    container.innerHTML = '<p style="color: var(--muted); text-align: center;">Aucun retrait en attente</p>';
    return;
  }

  pendingWithdrawals.forEach((transaction, index) => {
    const item = document.createElement('div');
    item.className = 'transaction-item';
    item.innerHTML = `
      <div class="transaction-info">
        <div class="transaction-icon withdrawal">⏳</div>
        <div class="transaction-details">
          <div class="transaction-type">${transaction.description}</div>
          <div class="transaction-date">Demandé le ${formatDate(transaction.date)}</div>
        </div>
      </div>
      <div class="transaction-amount">
        <div class="amount" style="color: #ff4d4f">${formatCurrency(transaction.amount)}$</div>
        <div class="status pending">En attente depuis ${getDaysSince(transaction.date)} jours</div>
      </div>
    `;
    container.appendChild(item);
  });
}

// Calcul du nombre de jours depuis une date
function getDaysSince(date) {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Gestion des filtres
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach(b => b.classList.remove('active'));
      // Ajouter la classe active au bouton cliqué
      btn.classList.add('active');

      // Afficher les transactions filtrées
      const filter = btn.getAttribute('data-filter');
      displayTransactions(filter);
    });
  });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  displayTransactions('all');
  displayPendingWithdrawals();
  setupFilters();

  // Simuler l'ajout de nouvelles transactions toutes les 10 secondes
  setInterval(() => {
    const container = document.getElementById('transactionsList');
    const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';

    // Effet de mise à jour visuel
    container.style.opacity = '0.7';
    setTimeout(() => {
      displayTransactions(currentFilter);
      container.style.opacity = '1';
    }, 300);
  }, 10000);
});
