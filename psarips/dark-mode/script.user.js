// ==UserScript==
// @name                PSARips - Dark Mode
// @description         Inverts the light colors to create an auto dark theme
// @version             1.1

// @namespace           io.github.ni554n
// @match               https://psa.*/*
// @match               https://psarips.*/*
// @match               https://x265.club/*
// @grant               GM_addStyle
// @run-at              document-idle

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://anissan.com
// @contributionURL     https://paypal.me/ni554n
// ==/UserScript==

GM_addStyle(/* css */ `
html {
  color-scheme: dark;
}

body {
  --invert: invert(1) hue-rotate(180deg);
  backdrop-filter: var(--invert);
}

#page, #footer {
  filter: var(--invert);
}

/* Simply excluding these elements with a :not while applying the filter on the parent
  won't prevent them from getting inverted because applying a filter affects its all
  descendants. So reverting it again to make it normal again. */
:is(#page, #footer) img, video, iframe, #footer-bottom {
  filter: var(--invert);
}
`);
