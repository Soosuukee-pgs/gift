// Gestion du défilement pour le header et les paroles
const header = document.getElementById("header");
const cover = document.getElementById("cover");
const songDetails = document.getElementById("song-details");
const mainContent = document.querySelector("main");
const lyricsLines = document.querySelectorAll(".lyrics li");
const windowElement = document.querySelector(".window");

// Paramètres initiaux pour le header
const headerInitialHeight = 70; // en vh
const headerMinHeight = 15; // Hauteur minimale du header (vh)
const coverInitialSize = 100; // Taille initiale de l'image (en %)
const coverMinSize = 50; // Taille minimale de l'image (en %)
const titleInitialFontSize = 3; // Taille initiale de la police (en rem)
const titleMinFontSize = 1.5; // Taille minimale de la police (en rem)

// Gestion du défilement
mainContent.addEventListener("scroll", () => {
  const scrollTop = mainContent.scrollTop;
  const maxScroll = 300; // Ajuster cette valeur pour contrôler la transition
  const progress = Math.min(scrollTop / maxScroll, 1);

  // Hauteur dynamique du header
  const headerHeight = headerInitialHeight - (headerInitialHeight - headerMinHeight) * progress;
  header.style.height = `${headerHeight}vh`;

  // Taille dynamique de l'image (cover)
  const coverSize = coverInitialSize - (coverInitialSize - coverMinSize) * progress;
  cover.style.width = `${coverSize}%`;
  cover.style.height = `${coverSize}%`;

  // Taille dynamique du titre
  const titleFontSize = titleInitialFontSize - (titleInitialFontSize - titleMinFontSize) * progress;
  songDetails.style.fontSize = `${titleFontSize}rem`;

  // Gestion du floutage et mise en avant des paroles
  const windowRect = windowElement.getBoundingClientRect();
  lyricsLines.forEach((line) => {
    const lineRect = line.getBoundingClientRect();

    // Vérifie si une partie de la ligne est visible dans la "fenêtre" invisible
    if (
      lineRect.bottom > windowRect.top &&
      lineRect.top < windowRect.bottom
    ) {
      line.classList.add("active"); // Ligne visible et nette
      line.classList.remove("hidden"); // Assure qu'elle n'est pas masquée
    } else {
      line.classList.remove("active"); // Ligne floutée
      line.classList.add("hidden"); // Masque les lignes hors fenêtre
    }
  });
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

  // Animation : les pièces se déplacent
  pieces.forEach((piece) => {
    if (piece.classList.contains("top")) {
      piece.style.transform = "translateY(-200%)";
    } else if (piece.classList.contains("bottom")) {
      piece.style.transform = "translateY(200%)";
    } else if (piece.classList.contains("left")) {
      piece.style.transform = "translateX(-200%)";
    } else if (piece.classList.contains("right")) {
      piece.style.transform = "translateX(200%)";
    }
    piece.style.opacity = "0";
  });

  // Révéler le projet après l'animation
  setTimeout(() => {
    giftWrap.style.display = "none"; // Masquer le papier cadeau
    header.style.opacity = "1"; // Rendre le header visible
    mainContent.style.opacity = "1"; // Rendre le contenu visible
  }, 1000); // Correspond à la durée de l'animation CSS
});
