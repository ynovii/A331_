const ANSWERS = ['Да', 'Скорее да, чем нет', 'Скорее нет, чем да', 'Нет'];

const QUESTIONS = [
    { text: 'Готовы ли вы жить в небольшом пространстве, где кухня, спальня и гостиная — это одна комната?' },
    { text: 'Готовы ли вы провести 10 дней в пути без стабильной связи и Wi-Fi, наслаждаясь тишиной?' },
    { text: 'Вас пугает перспектива ехать 1050 км там, где почти нет асфальта, ради лучшего вида в жизни?', reverse: true },
    { text: 'Сможете ли вы прожить 3 дня, используя всего 100 литров воды на двоих, экономя каждый литр?' },
    { text: 'Готовы ли вы готовить ужин на газовой горелке, если аккумулятор дома на колесах сел?' },
    { text: 'Чувствуете ли вы уверенность за рулем крупного, высокого автомобиля на узких дорогах и при парковке?' },
    { text: 'Останетесь ли вы спокойны, если увидите дикую природу или медведя в 10 метрах от окна автодома?' },
    { text: 'Ваш идеальный вечер в путешествии — это уединенная дикая стоянка у подножия вулкана?' },
    { text: 'Сможете ли вы самостоятельно обслужить системы (туалет, слив воды, газ) в условиях дикой природы?' },
    { text: 'Готовы ли вы планировать рацион на неделю вперед, полагаясь только на свои запасы и маленькую плитку?' }
];

const RESULTS = [
    {
        min: 8,
        paragraphs: [
            'Вы — настоящий кочевник. Ограниченное пространство вас не пугает, а автономные системы автодома кажутся логичными и понятными.',
            'Вы готовы к самым сложным маршрутам — от узких серпантинов Кавказа до бездорожья Камчатки, где асфальт встречается редко. Медведи за окном и 10 дней без связи для вас не испытание, а долгожданный отдых.'
        ]
    },
    {
        min: 5,
        paragraphs: [
            'Вы — уверенный путешественник. Быт в автодоме вас не смущает, хотя к некоторым вещам ещё придётся привыкнуть.',
            'Начните с маршрутов средней сложности — Карелии, Алтая или Байкала. Там хватает дикой природы, но есть и обустроенные стоянки, где можно пополнить воду и зарядить аккумулятор.'
        ]
    },
    {
        min: 0,
        paragraphs: [
            'Вы — начинающий караванер. Жизнь на колёсах пока кажется непривычной, и это нормально: все с чего-то начинали.',
            'Попробуйте короткую поездку на 2–3 дня по лёгкому маршруту с кемпингами и связью. А перед стартом загляните в наши статьи — там собраны лайфхаки для новичков.'
        ]
    }
];

function initTest() {
    const page = document.querySelector('.test-page');
    if (!page) return;

    const form = page.querySelector('.test-quiz');
    const current = page.querySelector('.test-step-current');
    const total = page.querySelector('.test-step-total');
    const question = page.querySelector('.test-question');
    const options = page.querySelector('.test-options');
    const prevBtn = page.querySelector('.test-prev');
    const nextBtn = page.querySelector('.test-next');
    const result = page.querySelector('.test-result');
    const score = page.querySelector('.test-result-score');
    const desc = page.querySelector('.test-result-desc');
    const restartBtn = page.querySelector('.test-restart');

    const answers = new Array(QUESTIONS.length).fill(null);
    let step = 0;

    function renderStep() {
        const isLast = step === QUESTIONS.length - 1;

        current.textContent = step + 1;
        total.textContent = QUESTIONS.length;
        question.textContent = QUESTIONS[step].text;

        options.innerHTML = '';
        ANSWERS.forEach((label, i) => {
            const option = document.createElement('label');
            option.className = 'test-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = i;
            input.checked = answers[step] === i;
            input.addEventListener('change', () => {
                answers[step] = i;
                nextBtn.disabled = false;
            });

            const mark = document.createElement('span');
            mark.className = 'test-radio';

            option.append(input, mark, label);
            options.append(option);
        });

        prevBtn.disabled = step === 0;
        nextBtn.disabled = answers[step] === null;
        nextBtn.textContent = isLast ? 'Показать результат' : 'Следующий вопрос';

        form.classList.remove('is-entering');
        void form.offsetWidth;
        form.classList.add('is-entering');
    }

    function showResult() {
        const points = answers.reduce((sum, answer, i) => {
            const ready = QUESTIONS[i].reverse ? answer >= 2 : answer <= 1;
            return sum + (ready ? 1 : 0);
        }, 0);
        const text = RESULTS.find((r) => points >= r.min);

        score.textContent = `${points}/${QUESTIONS.length}`;
        desc.innerHTML = '';
        text.paragraphs.forEach((p) => {
            const el = document.createElement('p');
            el.textContent = p;
            desc.append(el);
        });

        form.hidden = true;
        result.hidden = false;
        window.scrollTo({ top: 0 });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (answers[step] === null) return;
        if (step < QUESTIONS.length - 1) {
            step += 1;
            renderStep();
        } else {
            showResult();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (step === 0) return;
        step -= 1;
        renderStep();
    });

    restartBtn.addEventListener('click', () => {
        answers.fill(null);
        step = 0;
        result.hidden = true;
        form.hidden = false;
        renderStep();
    });

    renderStep();
}

document.addEventListener('DOMContentLoaded', initTest);
