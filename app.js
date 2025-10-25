// app.js — logique principale
let deferredPrompt = null;
const installBtn = document.getElementById('installBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Gestion de l'event beforeinstallprompt pour la PWA
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return alert('L’installation PWA n’est pas disponible dans ce contexte (nécessite HTTPS ou localhost).');
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
});

// Fonction : génère des données aléatoires et met à jour les charts
function randWalk(last) {
  return Math.max(0, last + (Math.random()-0.48) * (last * (Math.random()*0.02 + 0.008)));
}

// Initialisation Chart.js
function makeChart(ctx, label, start=10000) {
  const labels = Array.from({length:40}, (_,i) => '');
  const data = {labels, datasets:[{label, data: Array.from({length:40}, ()=> start*(0.98+Math.random()*0.04)), tension:0.4, fill:true}]};
  const chart = new Chart(ctx, {type:'line', data, options:{
    animation:{duration:0}, responsive:true, plugins:{legend:{display:false}}, scales:{x:{display:false}}
  }});
  // update every 700ms
  setInterval(()=> {
    const ds = chart.data.datasets[0];
    const last = ds.data[ds.data.length-1];
    ds.data.push(randWalk(last));
    ds.data.shift();
    chart.update('none');
  }, 700 + Math.random()*400);
  return chart;
}

document.addEventListener('DOMContentLoaded', ()=> {
  makeChart(document.getElementById('chartBTC').getContext('2d'), 'BTC', 56000);
  makeChart(document.getElementById('chartETH').getContext('2d'), 'ETH', 3200);
  makeChart(document.getElementById('chartALT').getContext('2d'), 'ALT', 0.42);
});

// Téléchargement ZIP du PWA (génère un zip côté client avec JSZip)
downloadBtn.addEventListener('click', async () => {
  downloadBtn.disabled = true;
  downloadBtn.textContent = 'Préparation...';

  const zip = new JSZip();

  // fichiers à inclure (simplifiés) - on peut étendre
  const files = {
    'index.html': document.documentElement.outerHTML,
    'app.js': `/* Fichier app.js simplifié — récupérer la version complète fournie séparément */\n${(await (await fetch('app.js')).text())}`,
    'style.css': (await (await fetch('style.css')).text()),
    'manifest.json': (await (await fetch('manifest.json')).text()),
    'service-worker.js': (await (await fetch('service-worker.js')).text())
  };

  for (const [name, content] of Object.entries(files)) {
    zip.file(name, content);
  }

  const blob = await zip.generateAsync({type:'blob'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'demo-pwa-simulation.zip';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  downloadBtn.textContent = 'Télécharger l\'application (ZIP)';
  downloadBtn.disabled = false;
});
