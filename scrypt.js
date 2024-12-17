// Gestion du défilement pour le header et les paroles
const header = document.getElementById("header");
const cover = document.getElementById("cover");
const songDetails = document.getElementById("song-details");
const mainContent = document.querySelector("main");
const lyricsLines = document.querySelectorAll(".lyrics li");

// Paramètres pour le header
const headerInitialHeight = 70; // en vh
const headerMinHeight = 15; // Hauteur minimale du header (vh)
const coverInitialSize = 100; // Taille initiale de l'image (%)
const coverMinSize = 50; // Taille minimale de l'image (%)
const titleInitialFontSize = 3; // Taille initiale de la police (rem)
const titleMinFontSize = 1.5; // Taille minimale de la police (rem)

// Fonction d'affichage des lignes visibles (quatrains dynamiques)
function updateLyricsVisibility() {
  const viewportHeight = window.innerHeight;
  lyricsLines.forEach((line) => {
    const lineRect = line.getBoundingClientRect();
    if (lineRect.top >= viewportHeight / 3 && lineRect.bottom <= (viewportHeight / 3) * 2) {
      line.classList.add("visible");
    } else {
      line.classList.remove("visible");
    }
  });
}

// Gestion du scroll principal
mainContent.addEventListener("scroll", () => {
  const scrollTop = mainContent.scrollTop;
  const maxScroll = 300; // Contrôle la vitesse d'animation
  const progress = Math.min(scrollTop / maxScroll, 1);

  // Dynamique du header
  const headerHeight = headerInitialHeight - (headerInitialHeight - headerMinHeight) * progress;
  header.style.height = `${headerHeight}vh`;

  // Dynamique de l'image (cover)
  const coverSize = coverInitialSize - (coverInitialSize - coverMinSize) * progress;
  cover.style.width = `${coverSize}%`;
  cover.style.height = `${coverSize}%`;

  // Dynamique du titre
  const titleFontSize = titleInitialFontSize - (titleInitialFontSize - titleMinFontSize) * progress;
  songDetails.style.fontSize = `${titleFontSize}rem`;

  // Mise à jour des paroles visibles
  updateLyricsVisibility();
});

// Gestion de l'ouverture du papier cadeau
document.getElementById("open-gift").addEventListener("click", () => {
  const pieces = document.querySelectorAll(".gift-piece");
  const giftWrap = document.getElementById("gift-wrap");
  const ribbonHorizontal = document.querySelector(".ribbon-horizontal");
  const ribbonVertical = document.querySelector(".ribbon-vertical");

  // Animation : couper le ruban
  ribbonHorizontal.style.transform = "scaleX(0)";
  ribbonVertical.style.transform = "scaleY(0)";

  // Animation : pièces du cadeau qui s'écartent
  pieces.forEach((piece) => {
    if (piece.classList.contains("top")) piece.style.transform = "translateY(-200%)";
    else if (piece.classList.contains("bottom")) piece.style.transform = "translateY(200%)";
    else if (piece.classList.contains("left")) piece.style.transform = "translateX(-200%)";
    else if (piece.classList.contains("right")) piece.style.transform = "translateX(200%)";
    piece.style.opacity = "0";
  });

  // Révélation du contenu
  setTimeout(() => {
    giftWrap.style.display = "none";
    header.style.opacity = "1";
    mainContent.style.opacity = "1";
    updateLyricsVisibility(); // Affiche les premières lignes
  }, 1000);
});

// Mise à jour initiale des paroles au chargement
window.addEventListener("load", updateLyricsVisibility);

