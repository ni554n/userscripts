// ==UserScript==

// @name                Google Drive - Default Text in Search Field
// @description         Pre-populate Google Drive search field with some custom text (default: "* type:folder") for easier searching.
// @version             1.0

// @namespace           io.github.ni554n
// @match               https://drive.google.com/*
// @run-at              document-idle

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

// Change this text to customize the default text.
const INPUT_PLACEHOLDER = "* type:folder";

const isLogEnabled = false;

const searchInputElement = document.querySelector(`input[aria-label="Search in Drive"]`);

if (searchInputElement) {
  // Pre-fill the input for the first load.
  searchInputElement.value ||= INPUT_PLACEHOLDER;

  // Google Drive is an SPA where page navigation is done dynamically via javascript.
  // Page navigations can be detected by observing the <title> changes.
  new MutationObserver(observePageNavigation).observe(
    titleElement,
    { childList: true },
  );
}

function observePageNavigation() {
  log(`Page Route Changed -> ${titleElement.text}`);

  searchInputElement.value ||= INPUT_PLACEHOLDER;
}

function log(message) {
  if (isLogEnabled) console.log(message);
}
