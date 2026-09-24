export function initRoutesSlider() {
    const track = document.querySelector('.routes-cards-container');
    const btnPrev = document.querySelector('.routes-controls .btn-prev');
    const btnNext = document.querySelector('.routes-controls .btn-next');
    if (!track) return;

    const sources = Array.from(track.querySelectorAll('.route-card'));
    const n = sources.length;
    if (n < 2) return;

    const html = sources.map((c) => c.innerHTML);
    sources.forEach((c) => c.remove());

    const RING = 6;
    const DURATION = 500;
    const mod = (a, m) => ((a % m) + m) % m;

    let offset = 0;
    let busy = false;

    const itemAt = (slot) => mod(offset + slot - 1, n);
    const slotOf = (e) => mod(e - offset + 1, RING) - 1;

    const els = Array.from({ length: RING }, () => {
        const el = document.createElement('div');
        el.className = 'route-card';
        track.appendChild(el);
        return el;
    });

    const place = (el, slot, animate = true) => {
        if (!animate) el.style.transition = 'none';
        el.dataset.slot = String(slot);
        if (!animate) {
            void el.offsetWidth;
            el.style.transition = '';
        }
    };

    const setContent = (el, slot) => {
        el.innerHTML = html[itemAt(slot)];
    };

    const slots = els.map((_, e) => slotOf(e));
    els.forEach((el, e) => {
        setContent(el, slots[e]);
        place(el, slots[e], false);
    });

    function move(dir) {
        if (busy) return;
        busy = true;
        offset += dir;

        els.forEach((el, e) => {
            const oldSlot = slots[e];
            const newSlot = slotOf(e);
            slots[e] = newSlot;

            if (dir > 0 && oldSlot === -1 && newSlot === 4) {
                place(el, 5, false);
                setContent(el, 4);
                void el.offsetWidth;
                place(el, 4, true);
            } else if (dir < 0 && oldSlot === 4 && newSlot === -1) {
                place(el, 5, true);
                setTimeout(() => {
                    setContent(el, -1);
                    place(el, -1, false);
                }, DURATION);
            } else {
                place(el, newSlot, true);
            }
        });

        setTimeout(() => { busy = false; }, DURATION);
    }

    btnNext?.addEventListener('click', () => move(1));
    btnPrev?.addEventListener('click', () => move(-1));
}

document.addEventListener('DOMContentLoaded', initRoutesSlider);
