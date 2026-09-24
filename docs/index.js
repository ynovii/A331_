/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 993:
/***/ (() => {

var ANSWERS = ['Да', 'Скорее да, чем нет', 'Скорее нет, чем да', 'Нет'];
var QUESTIONS = [{
  text: 'Готовы ли вы жить в небольшом пространстве, где кухня, спальня и гостиная — это одна комната?'
}, {
  text: 'Готовы ли вы провести 10 дней в пути без стабильной связи и Wi-Fi, наслаждаясь тишиной?'
}, {
  text: 'Вас пугает перспектива ехать 1050 км там, где почти нет асфальта, ради лучшего вида в жизни?',
  reverse: true
}, {
  text: 'Сможете ли вы прожить 3 дня, используя всего 100 литров воды на двоих, экономя каждый литр?'
}, {
  text: 'Готовы ли вы готовить ужин на газовой горелке, если аккумулятор дома на колесах сел?'
}, {
  text: 'Чувствуете ли вы уверенность за рулем крупного, высокого автомобиля на узких дорогах и при парковке?'
}, {
  text: 'Останетесь ли вы спокойны, если увидите дикую природу или медведя в 10 метрах от окна автодома?'
}, {
  text: 'Ваш идеальный вечер в путешествии — это уединенная дикая стоянка у подножия вулкана?'
}, {
  text: 'Сможете ли вы самостоятельно обслужить системы (туалет, слив воды, газ) в условиях дикой природы?'
}, {
  text: 'Готовы ли вы планировать рацион на неделю вперед, полагаясь только на свои запасы и маленькую плитку?'
}];
var RESULTS = [{
  min: 8,
  paragraphs: ['Вы — настоящий кочевник. Ограниченное пространство вас не пугает, а автономные системы автодома кажутся логичными и понятными.', 'Вы готовы к самым сложным маршрутам — от узких серпантинов Кавказа до бездорожья Камчатки, где асфальт встречается редко. Медведи за окном и 10 дней без связи для вас не испытание, а долгожданный отдых.']
}, {
  min: 5,
  paragraphs: ['Вы — уверенный путешественник. Быт в автодоме вас не смущает, хотя к некоторым вещам ещё придётся привыкнуть.', 'Начните с маршрутов средней сложности — Карелии, Алтая или Байкала. Там хватает дикой природы, но есть и обустроенные стоянки, где можно пополнить воду и зарядить аккумулятор.']
}, {
  min: 0,
  paragraphs: ['Вы — начинающий караванер. Жизнь на колёсах пока кажется непривычной, и это нормально: все с чего-то начинали.', 'Попробуйте короткую поездку на 2–3 дня по лёгкому маршруту с кемпингами и связью. А перед стартом загляните в наши статьи — там собраны лайфхаки для новичков.']
}];
function initTest() {
  var page = document.querySelector('.test-page');
  if (!page) return;
  var form = page.querySelector('.test-quiz');
  var current = page.querySelector('.test-step-current');
  var total = page.querySelector('.test-step-total');
  var question = page.querySelector('.test-question');
  var options = page.querySelector('.test-options');
  var prevBtn = page.querySelector('.test-prev');
  var nextBtn = page.querySelector('.test-next');
  var result = page.querySelector('.test-result');
  var score = page.querySelector('.test-result-score');
  var desc = page.querySelector('.test-result-desc');
  var restartBtn = page.querySelector('.test-restart');
  var answers = new Array(QUESTIONS.length).fill(null);
  var step = 0;
  function renderStep() {
    var isLast = step === QUESTIONS.length - 1;
    current.textContent = step + 1;
    total.textContent = QUESTIONS.length;
    question.textContent = QUESTIONS[step].text;
    options.innerHTML = '';
    ANSWERS.forEach(function (label, i) {
      var option = document.createElement('label');
      option.className = 'test-option';
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = i;
      input.checked = answers[step] === i;
      input.addEventListener('change', function () {
        answers[step] = i;
        nextBtn.disabled = false;
      });
      var mark = document.createElement('span');
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
    var points = answers.reduce(function (sum, answer, i) {
      var ready = QUESTIONS[i].reverse ? answer >= 2 : answer <= 1;
      return sum + (ready ? 1 : 0);
    }, 0);
    var text = RESULTS.find(function (r) {
      return points >= r.min;
    });
    score.textContent = "".concat(points, "/").concat(QUESTIONS.length);
    desc.innerHTML = '';
    text.paragraphs.forEach(function (p) {
      var el = document.createElement('p');
      el.textContent = p;
      desc.append(el);
    });
    form.hidden = true;
    result.hidden = false;
    window.scrollTo({
      top: 0
    });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (answers[step] === null) return;
    if (step < QUESTIONS.length - 1) {
      step += 1;
      renderStep();
    } else {
      showResult();
    }
  });
  prevBtn.addEventListener('click', function () {
    if (step === 0) return;
    step -= 1;
    renderStep();
  });
  restartBtn.addEventListener('click', function () {
    answers.fill(null);
    step = 0;
    result.hidden = true;
    form.hidden = false;
    renderStep();
  });
  renderStep();
}
document.addEventListener('DOMContentLoaded', initTest);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

;// ./src/javascripts/glavnaya.js
function initRoutesSlider() {
  var track = document.querySelector('.routes-cards-container');
  var btnPrev = document.querySelector('.routes-controls .btn-prev');
  var btnNext = document.querySelector('.routes-controls .btn-next');
  if (!track) return;
  var sources = Array.from(track.querySelectorAll('.route-card'));
  var n = sources.length;
  if (n < 2) return;
  var html = sources.map(function (c) {
    return c.innerHTML;
  });
  sources.forEach(function (c) {
    return c.remove();
  });
  var RING = 6;
  var DURATION = 500;
  var mod = function mod(a, m) {
    return (a % m + m) % m;
  };
  var offset = 0;
  var busy = false;
  var itemAt = function itemAt(slot) {
    return mod(offset + slot - 1, n);
  };
  var slotOf = function slotOf(e) {
    return mod(e - offset + 1, RING) - 1;
  };
  var els = Array.from({
    length: RING
  }, function () {
    var el = document.createElement('div');
    el.className = 'route-card';
    track.appendChild(el);
    return el;
  });
  var place = function place(el, slot) {
    var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (!animate) el.style.transition = 'none';
    el.dataset.slot = String(slot);
    if (!animate) {
      void el.offsetWidth;
      el.style.transition = '';
    }
  };
  var setContent = function setContent(el, slot) {
    el.innerHTML = html[itemAt(slot)];
  };
  var slots = els.map(function (_, e) {
    return slotOf(e);
  });
  els.forEach(function (el, e) {
    setContent(el, slots[e]);
    place(el, slots[e], false);
  });
  function move(dir) {
    if (busy) return;
    busy = true;
    offset += dir;
    els.forEach(function (el, e) {
      var oldSlot = slots[e];
      var newSlot = slotOf(e);
      slots[e] = newSlot;
      if (dir > 0 && oldSlot === -1 && newSlot === 4) {
        place(el, 5, false);
        setContent(el, 4);
        void el.offsetWidth;
        place(el, 4, true);
      } else if (dir < 0 && oldSlot === 4 && newSlot === -1) {
        place(el, 5, true);
        setTimeout(function () {
          setContent(el, -1);
          place(el, -1, false);
        }, DURATION);
      } else {
        place(el, newSlot, true);
      }
    });
    setTimeout(function () {
      busy = false;
    }, DURATION);
  }
  btnNext === null || btnNext === void 0 || btnNext.addEventListener('click', function () {
    return move(1);
  });
  btnPrev === null || btnPrev === void 0 || btnPrev.addEventListener('click', function () {
    return move(-1);
  });
}
document.addEventListener('DOMContentLoaded', initRoutesSlider);
;// ./src/javascripts/window_slider.js
function initWindowsSlider() {
  var track = document.querySelector('.static-windows-container');
  if (!track) return;
  var sources = Array.from(track.querySelectorAll('.static-window'));
  var n = sources.length;
  if (n < 2) return;
  var AUTOPLAY_MS = 4500;
  var DURATION = 700;
  var RING = 5;
  var mod = function mod(a, m) {
    return (a % m + m) % m;
  };
  var html = sources.map(function (w) {
    return w.innerHTML;
  });
  sources.forEach(function (w) {
    return w.remove();
  });
  var offset = 0;
  var busy = false;
  var timer = null;
  var itemAt = function itemAt(slot) {
    return mod(offset + slot - 1, n);
  };
  var slotOf = function slotOf(e) {
    return mod(e - offset + 1, RING) - 1;
  };
  var els = Array.from({
    length: RING
  }, function () {
    var el = document.createElement('div');
    el.className = 'static-window';
    track.appendChild(el);
    return el;
  });
  var place = function place(el, slot) {
    var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (!animate) el.style.transition = 'none';
    el.dataset.slot = String(slot);
    if (!animate) {
      void el.offsetWidth;
      el.style.transition = '';
    }
  };
  var slots = els.map(function (_, e) {
    return slotOf(e);
  });
  els.forEach(function (el, e) {
    el.innerHTML = html[itemAt(slots[e])];
    place(el, slots[e], false);
  });
  var fitHeight = function fitHeight() {
    var center = els[slots.indexOf(1)];
    if (center) track.style.height = "".concat(center.offsetHeight * 1.0, "px");
  };
  var ro = new ResizeObserver(fitHeight);
  els.forEach(function (el) {
    return ro.observe(el);
  });
  track.querySelectorAll('img').forEach(function (img) {
    return img.addEventListener('load', fitHeight);
  });
  fitHeight();
  function move(dir) {
    if (busy) return;
    busy = true;
    offset += dir;
    els.forEach(function (el, e) {
      var oldSlot = slots[e];
      var newSlot = slotOf(e);
      slots[e] = newSlot;
      var wrapped = Math.abs(newSlot - oldSlot) > 1;
      if (wrapped) {
        el.innerHTML = html[itemAt(newSlot)];
        place(el, newSlot, false);
      } else {
        place(el, newSlot, true);
      }
    });
    setTimeout(function () {
      busy = false;
    }, DURATION);
  }
  var restart = function restart() {
    clearInterval(timer);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(function () {
      return move(1);
    }, AUTOPLAY_MS);
  };
  track.addEventListener('click', function (ev) {
    var win = ev.target.closest('.static-window');
    if (!win) return;
    if (win.dataset.slot === '2') {
      move(1);
      restart();
    }
    if (win.dataset.slot === '0') {
      move(-1);
      restart();
    }
  });
  track.addEventListener('mouseenter', function () {
    return clearInterval(timer);
  });
  track.addEventListener('mouseleave', restart);
  restart();
}
document.addEventListener('DOMContentLoaded', initWindowsSlider);
;// ./src/javascripts/catalog-filter.js
function initCatalogFilter() {
  var section = document.querySelector('.catalog-section');
  if (!section) return;
  var buttons = Array.from(section.querySelectorAll('.filter-btn[data-filter]'));
  var cards = Array.from(section.querySelectorAll('.catalog-card[data-category]'));
  if (!buttons.length || !cards.length) return;
  function applyFilter(filter) {
    buttons.forEach(function (btn) {
      var isActive = btn.dataset.filter === filter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    cards.forEach(function (card) {
      var categories = card.dataset.category.split(/\s+/);
      var show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !show);
      card.classList.remove('is-entering');
      if (show) {
        void card.offsetWidth;
        card.classList.add('is-entering');
      }
    });
  }
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      return applyFilter(btn.dataset.filter);
    });
  });
  applyFilter('all');
}
document.addEventListener('DOMContentLoaded', initCatalogFilter);
;// ./src/javascripts/quiz-filter.js
function initQuizFilter() {
  var section = document.querySelector('.quiz-section');
  if (!section) return;
  var columns = section.querySelector('.quiz-columns');
  var buttons = Array.from(section.querySelectorAll('.filter-btn[data-filter]'));
  var cards = Array.from(section.querySelectorAll('.quiz-card[data-level]'));
  if (!columns || !buttons.length || !cards.length) return;
  function applyFilter(filter) {
    buttons.forEach(function (btn) {
      var isActive = btn.dataset.filter === filter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    columns.classList.toggle('is-filtered', filter !== 'all');
    cards.forEach(function (card) {
      var show = filter === 'all' || card.dataset.level === filter;
      card.classList.toggle('is-hidden', !show);
      card.classList.remove('is-entering');
      if (show) {
        void card.offsetWidth;
        card.classList.add('is-entering');
      }
    });
  }
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      return applyFilter(btn.dataset.filter);
    });
  });
  applyFilter('all');
}
document.addEventListener('DOMContentLoaded', initQuizFilter);
;// ./src/javascripts/listing.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var DEFAULT_PAGE_SIZE = 5;
var LAYOUTS = {
  articles: [[1, 1, 1], [1, 2], [2, 1], [1, 1, 1], [2, 1], [1, 2], [1, 1, 1], [1, 1, 1], [2, 1]],
  pairs: [[3, 3], [4, 2], [3, 3], [2, 4]]
};
function initListing(page) {
  var grid = page.querySelector('.listing-grid');
  var buttons = Array.from(page.querySelectorAll('.filter-btn[data-filter]'));
  var cards = Array.from(page.querySelectorAll('.listing-card[data-category]'));
  var decor = page.querySelector('.listing-card--decor');
  var moreBtn = page.querySelector('.listing-more');
  var empty = page.querySelector('.listing-empty');
  if (!grid || !buttons.length || !cards.length) return;
  var spans = (LAYOUTS[grid.dataset.layout] || LAYOUTS.articles).flat();
  var pageSize = Number(page.dataset.pageSize) || DEFAULT_PAGE_SIZE;
  var filters = buttons.map(function (btn) {
    return btn.dataset.filter;
  });
  var filter = 'all';
  var limit = pageSize;
  function matches(card) {
    return filter === 'all' || card.dataset.category.split(/\s+/).includes(filter);
  }
  function render() {
    var animateFrom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var matched = cards.filter(matches);
    var tiles = [];
    if (decor) {
      decor.hidden = filter !== 'all';
      if (!decor.hidden) tiles.push(decor);
    }
    var cardLimit = limit - tiles.length;
    var shown = matched.slice(0, cardLimit);
    cards.forEach(function (card) {
      card.hidden = !shown.includes(card);
    });
    tiles.push.apply(tiles, _toConsumableArray(shown));
    tiles.forEach(function (tile, i) {
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
    buttons.forEach(function (btn) {
      var isActive = btn.dataset.filter === filter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    var url = new URL(window.location.href);
    if (filter === 'all') url.searchParams["delete"]('filter');else url.searchParams.set('filter', filter);
    window.history.replaceState(null, '', url);
    render();
  }
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      return applyFilter(btn.dataset.filter);
    });
  });
  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      var from = limit;
      limit += pageSize;
      render(from);
    });
  }
  applyFilter(new URLSearchParams(window.location.search).get('filter'));
}
function initListings() {
  document.querySelectorAll('.listing-page').forEach(initListing);
}
document.addEventListener('DOMContentLoaded', initListings);
// EXTERNAL MODULE: ./src/javascripts/test.js
var test = __webpack_require__(993);
;// ./src/javascripts/faq.js
function initFaq() {
  var items = Array.from(document.querySelectorAll('.faq-item'));
  if (!items.length) return;
  var setOpen = function setOpen(item, open) {
    var _item$querySelector;
    item.classList.toggle('is-open', open);
    (_item$querySelector = item.querySelector('.faq-question')) === null || _item$querySelector === void 0 || _item$querySelector.setAttribute('aria-expanded', String(open));
  };
  items.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');
      items.forEach(function (other) {
        return setOpen(other, false);
      });
      setOpen(item, willOpen);
    });
  });
}
document.addEventListener('DOMContentLoaded', initFaq);
;// ./src/javascripts/index.js















console.log('hey');
})();

/******/ })()
;