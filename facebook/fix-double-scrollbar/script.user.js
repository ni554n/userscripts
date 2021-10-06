// ==UserScript==
// @name                Facebook - Fix Double Scrollbar on Messenger
// @description         Removes the useless additional scrollbar that apprears on the fullscreen Facebook Chats / Messenger.
// @version             1.0

// @namespace           io.github.ni554n
// @match               https://*.facebook.com/*
// @grant               GM_addStyle
// @run-at              document-idle

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n
// ==/UserScript==

const css = `
:root {
  overflow-y: auto !important;
}`;

GM_addStyle(css);
