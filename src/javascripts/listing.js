const DEFAULT_PAGE_SIZE = 5;

const LAYOUTS = {
    articles: [[1, 1, 1], [1, 2], [2, 1], [1, 1, 1], [2, 1], [1, 2], [1, 1, 1], [1, 1, 1], [2, 1]],
    pairs: [[3, 3], [4, 2], [3, 3], [2, 4]]
};

function initListing(page) {
    const grid = page.querySelector('.listing-grid');
    const buttons = Array.from(page.querySelectorAll('.filter-btn[data-filter]'));
    const cards = Array.from(page.querySelectorAll('.listing-card[data-category]'));
    const decor = page.querySelector('.listing-card--decor');
    const moreBtn = page.querySelector('.listing-more');
    const empty = page.querySelector('.listing-empty');
    if (!grid || !buttons.length || !cards.length) return;

    const spans = (LAYOUTS[grid.dataset.layout] || LAYOUTS.articles).flat();
    const pageSize = Number(page.dataset.pageSize) || DEFAULT_PAGE_SIZE;
    const filters = buttons.map((btn) => btn.dataset.filter);
    let filter = 'all';
    let limit = pageSize;

    function matches(card) {
        return filter === 'all' || card.dataset.category.split(/\s+/).includes(filter);
    }

    function render(animateFrom = 0) {
        const matched = cards.filter(matches);
        const tiles = [];

        if (decor) {
            decor.hidden = filter !== 'all';
            if (!decor.hidden) tiles.push(decor);
        }

        const cardLimit = limit - tiles.length;
        const shown = matched.slice(0, cardLimit);

        cards.forEach((card) => {
            card.hidden = !shown.includes(card);
        });
        tiles.push(...shown);

        tiles.forEach((tile, i) => {
            tile.style.setProperty('--span', spans[i % spans.length]);
            tile.classList.remove('is-entering');
            if (i >= animateFrom) {
                void tile.offsetWidth;
                tile.classList.add('is-entering');
            }
        });

        if (moreBtn) moreBtn.hidden = matched.length <= cardLimit;
        if (empty) empty.hidden = matched.length > 0;
    }

    function applyFilter(next) {
        filter = filters.includes(next) ? next : 'all';
        limit = pageSize;

        buttons.forEach((btn) => {
            const isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        const url = new URL(window.location.href);
        if (filter === 'all') url.searchParams.delete('filter');
        else url.searchParams.set('filter', filter);
        window.history.replaceState(null, '', url);

        render();
    }

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });

    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            const from = limit;
            limit += pageSize;
            render(from);
        });
    }

    applyFilter(new URLSearchParams(window.location.search).get('filter'));
}

export function initListings() {
    document.querySelectorAll('.listing-page').forEach(initListing);
}

document.addEventListener('DOMContentLoaded', initListings);
