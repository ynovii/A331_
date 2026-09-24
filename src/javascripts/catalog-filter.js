export function initCatalogFilter() {
    const section = document.querySelector('.catalog-section');
    if (!section) return;

    const buttons = Array.from(section.querySelectorAll('.filter-btn[data-filter]'));
    const cards = Array.from(section.querySelectorAll('.catalog-card[data-category]'));
    if (!buttons.length || !cards.length) return;

    function applyFilter(filter) {
        buttons.forEach((btn) => {
            const isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        cards.forEach((card) => {
            const categories = card.dataset.category.split(/\s+/);
            const show = filter === 'all' || categories.includes(filter);

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

document.addEventListener('DOMContentLoaded', initCatalogFilter);