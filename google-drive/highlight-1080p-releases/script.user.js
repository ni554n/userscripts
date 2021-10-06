// ==UserScript==

// @name                Google Drive - Highlight Text in Search
// @description         Highlights some text ("1080p" by default) in the Google Drive search results.
// @version             2.0

// @namespace           io.github.ni554n
// @match               https://drive.google.com/*
// @run-at              document-idle

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

// Highlighting text can be changed here.
const HIGHLIGHT = "1080p";

// Highlighting color can be any CSS color name or hex value.
const HIGHLIGHT_BG_COLOR = "aquamarine";

const isLogEnabled = false;

const titleElement = document.head.getElementsByTagName("title")[0];
const mainPageDiv = document.getElementById("drive_main_page");

// Google Drive is an SPA where page navigation is done dynamically via javascript.
// Page navigations can be detected by observing the <title> changes.
new MutationObserver(observePageNavigation).observe(
  titleElement,
  { childList: true },
);

let count = false;

function observePageNavigation() {
  log(`Page Route Changed -> ${titleElement.text}`);

  count = false;

  // Drive adds the search results dynamically somewhere in the subtree of the mainPageDiv.
  new MutationObserver(observeForResultLoading).observe(
    mainPageDiv,
    { childList: true, subtree: true },
  );
}

function observeForResultLoading(_, observer) {
  if (count) return;

  const searchResultList = document.querySelector(`div[data-view-type="12"]`).parentElement;

  if (!searchResultList) {
    log("No search result list has been attached yet!");
    return;
  }

  log(`SearchResultList found! Observing div[data-view-type="12"] childList changes...`);

  new MutationObserver(highlightMatched).observe(
    searchResultList,
    { childList: true, subtree: true },
  );

  count = true;

  log(`Disconnecting "drive_main_page" div observer...`);
  observer.disconnect();
}

function highlightMatched(mutationList) {
  log("In highlighted matched!");

  mutationList?.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const titleSpan = node.querySelector(`span[data-is-doc-name="true"]`);

      if (titleSpan?.innerText?.includes(HIGHLIGHT)) {
        node.style.backgroundColor = HIGHLIGHT_BG_COLOR;
      }
    });
  });
}

function log(message) {
  if (isLogEnabled) console.log(message);
}
