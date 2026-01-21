

document.querySelectorAll('.lazy-html5-video').forEach(container => {
    const button = container.querySelector('.play-button');
    const preview = container.querySelector('img');
    const video = container.querySelector('video');

    button.addEventListener('click', () => {
      preview.style.display = 'none';
      button.style.display = 'none';
      video.classList.remove('hidden');
      video.play();
    });
  });