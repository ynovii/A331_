export function initFaq() {
    const items = Array.from(document.querySelectorAll('.faq-item'));
    if (!items.length) return;

    const setOpen = (item, open) => {
        item.classList.toggle('is-open', open);
        item.querySelector('.faq-question')?.setAttribute('aria-expanded', String(open));
    };

    items.forEach((item) => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const willOpen = !item.classList.contains('is-open');
            items.forEach((other) => setOpen(other, false));
            setOpen(item, willOpen);
        });
    });
}

document.addEventListener('DOMContentLoaded', initFaq);