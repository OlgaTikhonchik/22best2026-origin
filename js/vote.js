

// ------------------------без фиксированого футера
document.addEventListener('DOMContentLoaded', () => {
  const voteButtons = document.querySelectorAll('.votes-button');
  const modal = document.getElementById('vote-modal');
  const voteResult = document.getElementById('vote-result');
  const modalClose = document.getElementById('modal-close');

  let votes = {};
  let votedCategories = {};

  // === Всплывающий лейбл ===
  function showVoteLabel(message) {
    const label = document.createElement('div');
    label.className = 'modal-label-top';
    label.textContent = message;
    document.body.appendChild(label);

    requestAnimationFrame(() => label.classList.add('show'));
    setTimeout(() => {
      label.classList.remove('show');
      label.addEventListener('transitionend', () => label.remove(), { once: true });
    }, 3000);
  }

  // === Блокировка прокрутки ===
  let scrollY = 0;
  function lockBodyScroll() {
    scrollY = window.scrollY || window.pageYOffset;
    document.body.classList.add('scroll-locked');
    document.body.style.top = `-${scrollY}px`;
  }
  function unlockBodyScroll() {
    document.body.classList.remove('scroll-locked');
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    document.body.style.top = '';
  }

  // === Обновление процентов и баров ===
  function updateCategoryResults(category) {
    const cards = document.querySelectorAll(`.vote-card[data-category="${category}"]`);
    let totalVotes = 0;
    cards.forEach(card => totalVotes += votes[card.dataset.id] || 0);

    const maxVotes = Math.max(...Array.from(cards).map(c => votes[c.dataset.id] || 0));

    cards.forEach(card => {
      const id = card.dataset.id;
      const cardVotes = votes[id] || 0;
      const percent = totalVotes ? Math.round((cardVotes / totalVotes) * 100) : 0;
      const countSpan = card.querySelector('.votes-count');
      const percentSpan = card.querySelector('.votes-percent');
      const bar = card.querySelector('.bar');
      const barText = card.querySelector('.bar-text');
      const btn = card.querySelector('.votes-button');

      if (countSpan) countSpan.textContent = `${cardVotes} votes`;
      if (percentSpan) percentSpan.textContent = `${percent}%`;
      if (bar) {
        bar.style.width = `${percent}%`;
        if (barText) barText.textContent = `${percent}%`;
      }

      if (cardVotes === maxVotes && maxVotes > 0) btn.classList.add('voted');
      else btn.classList.remove('voted');
    });
  }

  // === Голос по клику ===
  voteButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const card = button.closest('.vote-card');
      const category = card.dataset.category;
      const id = card.dataset.id;

      // уже голосовал в этой категории — выходим
      if (votedCategories[category]) return;

      // засчитываем голос
      votes[id] = (votes[id] || 0) + 1;
      votedCategories[category] = true;

      // обновляем состояние кнопок и бейджей
      const cards = document.querySelectorAll(`.vote-card[data-category="${category}"]`);
      cards.forEach(c => {
        const btn = c.querySelector('.votes-button');
        btn.disabled = true;
        btn.classList.add('disabled');
        btn.textContent = 'VOTED';
        const badge = c.querySelector('.badge');
        if (badge) badge.style.display = (c.dataset.id === id) ? 'inline-block' : 'none';
      });

      showVoteLabel("Your vote has been recorded ✅");
      updateCategoryResults(category);

      // показываем модалку
      if (modal && voteResult) {
        const title = card.querySelector('h4')?.textContent.trim() || `Nominee ${id}`;
        const count = votes[id] || 0;
        voteResult.innerHTML = `<div><strong>${category}:</strong> ${title} — ${count} votes</div>`;
        modal.style.display = 'flex';
        lockBodyScroll();
      }
    });
  });

  // === Закрытие модалки ===
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    unlockBodyScroll();
  });
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      unlockBodyScroll();
    }
  });
});
