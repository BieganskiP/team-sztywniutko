let toTopButton = document.getElementById('toTopBtn');

window.onscroll = function () {
  scrollFunction();
};

toTopButton.addEventListener('click', topFunction);

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.style.display = 'block';
  } else {
    toTopButton.style.display = 'none';
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
