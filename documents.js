// documents.js — Gestion des téléchargements de faux documents (SIMULATION)

// Fonction pour créer un pop-up personnalisé
function showDocumentWarning(docType) {
  const popup = document.createElement('div');
  popup.className = 'custom-popup-overlay';

  let title, message;

  title = '📄 ATTENTION - Faux Document !';
  message = `
    <p style="font-size: 1.3rem; font-weight: 700; color: #ff4d4f; margin-bottom: 20px;">
      Message de Darius, votre fils
    </p>
    <p style="font-size: 1.1rem; margin-bottom: 16px;">
      <strong>Vous êtes sur le point de télécharger un FAUX document.</strong>
    </p>
    <div style="background: rgba(255,77,79,0.2); padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff4d4f;">
      <p style="margin: 0; font-size: 1rem;">
        Ce document est <strong>TOTALEMENT FICTIF</strong>. J'ai créé ceci pour vous montrer à quel point c'est facile de fabriquer de "faux papiers officiels".
      </p>
    </div>
    <p style="font-size: 1rem; margin-bottom: 16px;">
      <strong>Les VRAIS escrocs font exactement la même chose :</strong>
    </p>
    <ul style="text-align: left; margin: 20px auto; max-width: 500px; line-height: 1.8;">
      <li>📝 Ils créent de faux certificats en quelques heures</li>
      <li>🖨️ Ils utilisent des logos volés d'entreprises légitimes</li>
      <li>🎨 Ils ajoutent des signatures, tampons, filigranes pour faire "officiel"</li>
      <li>🔢 Ils inventent des numéros d'enregistrement impossibles à vérifier</li>
      <li>👔 Ils volent des photos de vrais PDG ou utilisent l'IA pour créer de fausses personnes</li>
    </ul>
    <p style="font-size: 1.2rem; font-weight: 700; color: #ffd666; margin-top: 24px;">
      UN DOCUMENT PDF N'EST PAS UNE PREUVE !
    </p>
    <div style="background: rgba(139,92,246,0.2); padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #8b5cf6;">
      <p style="margin: 0; font-size: 0.95rem; color: #c4b5fd;">
        <strong>✅ Comment vérifier :</strong><br>
        • SIRET/SIREN : <a href="https://www.sirene.fr" target="_blank" style="color: #a78bfa;">sirene.fr</a><br>
        • Licences ACPR : <a href="https://www.regafi.fr" target="_blank" style="color: #a78bfa;">regafi.fr</a><br>
        • Liste noire AMF : <a href="https://www.amf-france.org" target="_blank" style="color: #a78bfa;">amf-france.org</a><br>
        • Photos suspectes : <a href="https://images.google.com" target="_blank" style="color: #a78bfa;">Recherche d'image inversée Google</a>
      </p>
    </div>
    <p style="margin-top: 20px; font-size: 0.95rem; color: #94a3b8;">
      Téléchargez ce document pour comprendre les techniques, mais <strong>JAMAIS</strong> ne faites confiance à un document d'une plateforme suspecte.
      <br><br>
      Je vous protège ❤️ - Darius
    </p>
  `;

  popup.innerHTML = `
    <div class="custom-popup" style="max-width: 700px;">
      <div class="popup-emoji">⚠️</div>
      <h2 class="popup-title">${title}</h2>
      <div class="popup-content">
        ${message}
      </div>
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="popup-close-btn" style="flex: 1; min-width: 200px;" id="confirmDownload">
          J'ai compris - Télécharger le faux document
        </button>
        <button class="popup-close-btn" style="flex: 1; min-width: 200px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);" id="cancelDownload">
          Annuler
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add('show'), 10);

  // Gestion des boutons
  popup.querySelector('#confirmDownload').addEventListener('click', () => {
    popup.classList.remove('show');
    setTimeout(() => {
      popup.remove();
      downloadDocument(docType);
    }, 300);
  });

  popup.querySelector('#cancelDownload').addEventListener('click', () => {
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

// Fonction pour télécharger le PDF
function downloadDocument(docType) {
  // Créer un message de téléchargement
  const downloading = document.createElement('div');
  downloading.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
    z-index: 10000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  downloading.textContent = '📥 Téléchargement du faux document...';
  document.body.appendChild(downloading);

  // Simulation de téléchargement
  setTimeout(() => {
    // Créer le lien de téléchargement vers le PDF
    const link = document.createElement('a');
    link.href = 'faux_entreprises_simulation.pdf';
    link.download = `faux_document_${docType}_SIMULATION.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Message de succès
    downloading.style.background = 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)';
    downloading.textContent = '✅ Document téléchargé !';

    setTimeout(() => {
      downloading.style.opacity = '0';
      downloading.style.transition = 'opacity 0.3s ease';
      setTimeout(() => downloading.remove(), 300);
    }, 2000);
  }, 1000);
}

// Gestion des clics sur les boutons de téléchargement
document.addEventListener('DOMContentLoaded', () => {
  const downloadButtons = document.querySelectorAll('.document-download-btn');

  downloadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const docType = btn.getAttribute('data-doc');
      showDocumentWarning(docType);
    });
  });
});

// Animation CSS pour le message de téléchargement
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
