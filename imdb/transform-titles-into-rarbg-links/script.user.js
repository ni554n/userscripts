// ==UserScript==

// @name                IMDb - Transform Titles to RARBG Links
// @description         Replaces the IMDb post titles with the RARBG catalog links.
// @version             2.0

// @namespace           io.github.ni554n
// @match               https://www.imdb.com/title/*
// @run-at              document-idle

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const titleElement = document.querySelector(`body h1[class*="TitleHeader__TitleText"]`);

if (!titleElement) {
  console.warn("Failed to get the reference of the title.");

  return;
}

replaceTitle();

// Oftentimes IMDb updates the title dynamically.
// This observer will make sure to replace the default title again when that happens.
new MutationObserver(replaceTitle).observe(
  titleElement,
  { childList: true },
);

function replaceTitle(_, observer) {
  // As we are observing the same element that we are going to update, to avoid
  // infinite loop disconnecting the observer beforehand is required.
  if (observer) observer.disconnect();

  const imdbId = document.querySelector(`meta[property="imdb:pageConst"]`)?.content ?? "";
  const rarbgLink = `https://rarbgto.org/torrents.php?imdb=${imdbId}`;

  const title = titleElement.innerText;

  titleElement.innerHTML = `<a href="${rarbgLink}" title="Open RARBG Catalog" target="_blank" style="color: white">${title}</a> ↗`;
}
