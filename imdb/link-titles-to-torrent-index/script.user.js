// ==UserScript==

// @name                IMDb - Link Titles to Torrent Index
// @description         Replaces the IMDb post title with its corresponding torrent index link
// @version             1.5

// @namespace           io.github.ni554n
// @match               https://www.imdb.com/title/tt*
// @match               https://m.imdb.com/title/tt*
// @run-at              document-idle

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://anissan.com
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const titleElement = document.querySelector(
  `h1[data-testid="hero__pageTitle"]`,
);

if (!titleElement) {
  throw new Error("Failed to get the reference of the title.");
}

replaceTitle();

// Oftentimes IMDb updates the title dynamically.
// This observer will make sure to replace the default title again when that happens.
new MutationObserver(replaceTitle).observe(titleElement, { childList: true });

function replaceTitle(_, observer) {
  // As we are observing the same element that we are going to update, to avoid
  // infinite loop disconnecting the observer beforehand is required.
  if (observer) observer.disconnect();

  const title = /** @type {HTMLElement} */ (titleElement).innerText;

  /** @type {HTMLElement} */ (
    titleElement
  ).innerHTML = `<a href="https://uindex.org/search.php?search=${title.replaceAll(" ", "+")}" title="Open UIndex" target="_blank" style="color: white">${title}</a> ↗`;
}
