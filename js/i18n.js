/* Miliastra Toolkit homepage i18n.
 * Same pattern as the other toolkit sites: one flat dictionary per language
 * in js/locales/<code>.js, data-i18n bindings, English as the fallback for
 * every key, localStorage persistence, browser-language auto-detection.
 * Plain scripts (no modules) so the page also works from file://.
 */
(function () {
  "use strict";

  // [code, native name] — the 14 languages officially supported by Genshin
  // Impact plus Italian, matching the rest of the toolkit.
  var LANGS = [
    ["en", "English"],
    ["zhs", "简体中文"],
    ["zht", "繁體中文"],
    ["ja", "日本語"],
    ["ko", "한국어"],
    ["es", "Español"],
    ["fr", "Français"],
    ["ru", "Русский"],
    ["th", "ไทย"],
    ["vi", "Tiếng Việt"],
    ["de", "Deutsch"],
    ["id", "Bahasa Indonesia"],
    ["pt", "Português"],
    ["tr", "Türkçe"],
    ["it", "Italiano"],
  ];
  var HTML_LANG = {
    en: "en", zhs: "zh-Hans", zht: "zh-Hant", ja: "ja", ko: "ko",
    es: "es", fr: "fr", ru: "ru", th: "th", vi: "vi",
    de: "de", id: "id", pt: "pt", tr: "tr", it: "it",
  };
  var STORAGE_KEY = "miliastra-toolkit-lang";

  var locales = {};
  var current = "en";

  window.registerLocale = function (code, dict) {
    locales[code] = dict;
  };

  function isValid(code) {
    return LANGS.some(function (l) { return l[0] === code; });
  }

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && isValid(saved)) return saved;
    } catch (e) { /* storage unavailable — fall through to detection */ }
    var candidates = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < candidates.length; i++) {
      var l = String(candidates[i]).toLowerCase();
      if (l.indexOf("zh") === 0) {
        return /hant|tw|hk|mo/.test(l) ? "zht" : "zhs";
      }
      var two = l.slice(0, 2);
      if (isValid(two)) return two;
    }
    return "en";
  }

  function t(key) {
    var dict = locales[current];
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    var en = locales.en;
    if (en && Object.prototype.hasOwnProperty.call(en, key)) return en[key];
    return key;
  }

  function loadLocale(code) {
    return new Promise(function (resolve) {
      if (code === "en" || locales[code]) return resolve();
      var s = document.createElement("script");
      s.src = "js/locales/" + code + ".js";
      s.onload = resolve;
      s.onerror = resolve; // missing locale silently falls back to English
      document.head.appendChild(s);
    });
  }

  function apply() {
    document.documentElement.lang = HTML_LANG[current] || "en";
    document.title = t("site.doc_title");
    // dictionaries are our own trusted strings and may contain inline markup
    // (<code>, the accent span), so bindings render as HTML
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      els[i].innerHTML = t(els[i].getAttribute("data-i18n"));
    }
    var titled = document.querySelectorAll("[data-i18n-title]");
    for (var j = 0; j < titled.length; j++) {
      var s = t(titled[j].getAttribute("data-i18n-title"));
      titled[j].title = s;
      titled[j].setAttribute("aria-label", s);
    }
  }

  function setLang(code) {
    if (!isValid(code)) code = "en";
    current = code;
    try { localStorage.setItem(STORAGE_KEY, code); } catch (e) { /* ignore */ }
    return loadLocale(code).then(function () {
      apply();
      updateSelector();
    });
  }

  /* ----- language selector ----- */
  var switchEl, btnEl, menuEl, currentEl;

  function updateSelector() {
    for (var i = 0; i < LANGS.length; i++) {
      if (LANGS[i][0] === current) currentEl.textContent = LANGS[i][1];
    }
    var items = menuEl.children;
    for (var j = 0; j < items.length; j++) {
      var active = items[j].getAttribute("data-lang") === current;
      items[j].classList.toggle("active", active);
      items[j].setAttribute("aria-selected", active ? "true" : "false");
    }
  }

  function setOpen(open) {
    switchEl.classList.toggle("open", open);
    btnEl.setAttribute("aria-expanded", open ? "true" : "false");
    menuEl.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function buildSelector() {
    switchEl = document.getElementById("lang-switch");
    btnEl = document.getElementById("lang-btn");
    menuEl = document.getElementById("lang-menu");
    currentEl = document.getElementById("lang-current");

    for (var i = 0; i < LANGS.length; i++) {
      var li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("data-lang", LANGS[i][0]);
      // native name renders with that language's preferred fonts
      li.setAttribute("lang", HTML_LANG[LANGS[i][0]]);
      li.textContent = LANGS[i][1];
      menuEl.appendChild(li);
    }

    btnEl.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(!switchEl.classList.contains("open"));
    });
    menuEl.addEventListener("click", function (e) {
      var li = e.target.closest("li[data-lang]");
      if (!li) return;
      setOpen(false);
      setLang(li.getAttribute("data-lang"));
    });
    document.addEventListener("click", function (e) {
      if (!switchEl.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function boot() {
    buildSelector();
    current = detectLang();
    loadLocale(current).then(function () {
      apply();
      updateSelector();
    });
  }

  // small public API (mirrors the other toolkit sites' i18n exports)
  window.i18n = {
    t: t,
    setLang: setLang,
    getLang: function () { return current; },
    hasLocale: function (code) { return !!locales[code]; },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
