const header = document.getElementById("header");
const cover = document.getElementById("cover");
const songDetails = document.getElementById("song-details");
const mainContent = document.querySelector("main");

// Hauteurs initiales
const initialHeaderHeight = 70; // en vh
const finalHeaderHeight = 10; // en vh
const initialCoverSize = 100; // en %
const finalCoverSize = 10; // en %

mainContent.addEventListener("scroll", () => {
  // Calcul de la progression entre 0 (en haut) et 1 (position finale)
  const scrollTop = mainContent.scrollTop;
  const maxScroll = 200; // Ajuste selon le scroll maximal attendu
  const progress = Math.min(scrollTop / maxScroll, 1);

  // Calcul de la hauteur du header
  const headerHeight =
    initialHeaderHeight - (initialHeaderHeight - finalHeaderHeight) * progress;
  header.style.height = `${headerHeight}vh`;

  // Calcul de la taille du cover
  const coverSize =
    initialCoverSize - (initialCoverSize - finalCoverSize) * progress;
  cover.style.width = `${coverSize}%`;
  cover.style.height = `${coverSize}%`;

  // Positionnement du titre et de l'artiste
  songDetails.style.transform = `translateY(-${progress * 50}px)`;
  songDetails.style.opacity = `${1 - progress}`;
});
