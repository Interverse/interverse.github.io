# Kyvern's Miliastra Toolkit — Homepage

The landing page for the Miliastra Toolkit: a suite of free, browser-based
tools for creating, editing, and converting Miliastra Wonderland assets.
Hosted at **https://interverse.github.io**.

## Tools

| Tool                                | Link                                                                |
| ----------------------------------- | ------------------------------------------------------------------- |
| 3D Models & Sprites to `.gia`       | https://interverse.github.io/miliastra-3d-model-to-gia              |
| `.gia`/`.gil` Decoration Editor     | https://interverse.github.io/miliastra-gia-decoration-splitter/     |
| Beyond ↔ Classic Asset Converter    | https://interverse.github.io/miliastra-asset-mode-converter/        |
| Image to Primitive Shapes UI `.gia` | https://interverse.github.io/miliastra-image-to-primitive-shape-ui/ |
| Image to `.gia` Pixel Builder       | https://interverse.github.io/miliastra-image-to-gia/                |

## Layout

```
index.html       the landing page (header + tool cards)
css/style.css    homepage styles, matching the shared toolkit design language
js/i18n.js       localization system + custom language selector
js/locales/      one flat dictionary per language (en.js is the canonical set)
```

Static HTML/CSS/JS only — no build step, no dependencies. Open `index.html`
directly in a browser, or serve the folder with any static file server.

## Localization

The homepage is localized into the same 15 languages as the rest of the
toolkit (the 14 officially supported by Genshin Impact plus Italian). Same
pattern as the other sites: `data-i18n` bindings, English as the fallback
for every key, browser-language auto-detection (including zh-Hans/zh-Hant
disambiguation), and the choice persisted in localStorage. Adding a
language = adding one `js/locales/<code>.js` file plus one row to `LANGS`
in `js/i18n.js`.

The language choice is **shared across all toolkit sites** on this origin
via the `miliastra-lang` localStorage key — pick a language on any site and
the others follow.

## Disclaimer

This is an unofficial, fan-made toolkit. Not affiliated with or endorsed by
HoYoverse. Please follow the game's Terms of Service when using anything
created with these tools.
