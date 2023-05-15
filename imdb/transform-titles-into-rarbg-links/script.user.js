// ==UserScript==

// @name                IMDb - Transform Titles to RARBG Links
// @description         Replaces the IMDb post titles with the RARBG catalog links
// @version             2.2

// @namespace           io.github.ni554n
// @match               https://www.imdb.com/title/*
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

  const imdbId = /** @type {HTMLMetaElement | null} */ (
    document.querySelector(`meta[property="imdb:pageConst"]`)
  )?.content;

  if (!imdbId) throw new Error("Failed to get the IMDb ID from the meta tag.");

  const rarbgLink = `https://rarbgto.org/torrents.php?imdb=${imdbId}`;

  const title = /** @type {HTMLElement} */ (titleElement).innerText;

  /** @type {HTMLElement} */ (
    titleElement
  ).innerHTML = `<a href="${rarbgLink}" title="Open RARBG Catalog" target="_blank" style="color: white">${title}</a> ↗`;
}
