export function initQuizFilter() {
    const section = document.querySelector('.quiz-section');
    if (!section) return;

    const columns = section.querySelector('.quiz-columns');
    const buttons = Array.from(section.querySelectorAll('.filter-btn[data-filter]'));
    const cards = Array.from(section.querySelectorAll('.quiz-card[data-level]'));
    if (!columns || !buttons.length || !cards.length) return;

    function applyFilter(filter) {
        buttons.forEach((btn) => {
            const isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        columns.classList.toggle('is-filtered', filter !== 'all');

        cards.forEach((card) => {
            const show = filter === 'all' || card.dataset.level === filter;
            card.classList.toggle('is-hidden', !show);
            card.classList.remove('is-entering');
            if (show) {
                void card.offsetWidth;
                card.classList.add('is-entering');
            }
        });
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    applyFilter('all');
}

document.addEventListener('DOMContentLoaded', initQuizFilter);