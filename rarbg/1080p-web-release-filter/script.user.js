// ==UserScript==

// @name                RARBG 1080p Web Release Filter
// @description         Keeps only the "1080p WEB" releases on the RARBG TV HD Episodes category.
// @version             2.3

// @namespace           io.github.ni554n
// @match               http*://rarbgto.org/torrents.php?*category*=41*
// @match               http*://rarbgto.org/torrents.php?imdb=*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const INCLUDED_QUALITY = "1080p".toLowerCase();
const EXCLUDED_SOURCE = "HDTV".toLowerCase();

const releaseTableRows = document.getElementsByClassName("lista2");

for (const row of releaseTableRows) {
  const releaseName = row.innerText.toLowerCase();

  if (
    !releaseName.includes(INCLUDED_QUALITY) ||
    releaseName.includes(EXCLUDED_SOURCE)
  ) {
    row.style.display = "none";
  }
}
