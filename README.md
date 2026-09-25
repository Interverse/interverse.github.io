# Kyvern's Miliastra Toolkit — Homepage

The landing page for the Miliastra Toolkit: a suite of free, browser-based
tools for creating, editing, and converting Miliastra Wonderland assets.
Hosted at **https://interverse.github.io**.

## Tools

The homepage groups the tools into three sections. Ease Lab sits with the
Lua docs because its easing curves are the client Lua API's `EaseType`s.

**Create Assets**

| Tool                                | Link                                                                |
| ----------------------------------- | ------------------------------------------------------------------- |
| 3D Models & Sprites to `.gia`       | https://interverse.github.io/miliastra-3d-model-to-gia              |
| Image to Primitive Shapes UI `.gia` | https://interverse.github.io/miliastra-image-to-primitive-shape-ui/ |
| Pixel Image to UI `.gia`            | https://interverse.github.io/miliastra-image-to-gia/                |

**Edit & Convert**

| Tool                             | Link                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| `.gia`/`.gil` Decoration Editor  | https://interverse.github.io/miliastra-decoration-splitter/  |
| Miliastra Animator               | https://interverse.github.io/miliastra-animator/             |
| Beyond ↔ Classic Asset Converter | https://interverse.github.io/miliastra-asset-mode-converter/ |

**Lua Scripting**

| Tool                  | Link                                           |
| --------------------- | ---------------------------------------------- |
| MiliLua API Reference | https://interverse.github.io/miliastra-lua-docs/ |
| Ease Lab              | https://interverse.github.io/easelab/          |

## Layout

```
index.html       the landing page (header + categorized tool cards)
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
