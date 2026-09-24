export function initWindowsSlider() {
    const track = document.querySelector('.static-windows-container');
    if (!track) return;

    const sources = Array.from(track.querySelectorAll('.static-window'));
    const n = sources.length;
    if (n < 2) return;

    const AUTOPLAY_MS = 4500;
    const DURATION = 700;
    const RING = 5;
    const mod = (a, m) => ((a % m) + m) % m;

    const html = sources.map((w) => w.innerHTML);
    sources.forEach((w) => w.remove());

    let offset = 0;
    let busy = false;
    let timer = null;

    const itemAt = (slot) => mod(offset + slot - 1, n);
    const slotOf = (e) => mod(e - offset + 1, RING) - 1;

    const els = Array.from({ length: RING }, () => {
        const el = document.createElement('div');
        el.className = 'static-window';
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

    const slots = els.map((_, e) => slotOf(e));
    els.forEach((el, e) => {
        el.innerHTML = html[itemAt(slots[e])];
        place(el, slots[e], false);
    });

    const fitHeight = () => {
        const center = els[slots.indexOf(1)];
        if (center) track.style.height = `${center.offsetHeight * 1.0}px`;
    };
    const ro = new ResizeObserver(fitHeight);
    els.forEach((el) => ro.observe(el));
    track.querySelectorAll('img').forEach((img) => img.addEventListener('load', fitHeight));
    fitHeight();

    function move(dir) {
        if (busy) return;
        busy = true;
        offset += dir;

        els.forEach((el, e) => {
            const oldSlot = slots[e];
            const newSlot = slotOf(e);
            slots[e] = newSlot;

            const wrapped = Math.abs(newSlot - oldSlot) > 1;
            if (wrapped) {
                el.innerHTML = html[itemAt(newSlot)];
                place(el, newSlot, false);
            } else {
                place(el, newSlot, true);
            }
        });

        setTimeout(() => { busy = false; }, DURATION);
    }

    const restart = () => {
        clearInterval(timer);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        timer = setInterval(() => move(1), AUTOPLAY_MS);
    };

    track.addEventListener('click', (ev) => {
        const win = ev.target.closest('.static-window');
        if (!win) return;
        if (win.dataset.slot === '2') { move(1); restart(); }
        if (win.dataset.slot === '0') { move(-1); restart(); }
    });

    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', restart);

    restart();
}

document.addEventListener('DOMContentLoaded', initWindowsSlider);