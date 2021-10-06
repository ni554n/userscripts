// ==UserScript==

// @name                RARBG 1080p Web Release Filter
// @description         Keeps only the 1080p WEB releases on the RARBG TV HD Episodes category.
// @version             2.1

// @namespace           io.github.ni554n
// @match               https://rarbgto.org/torrents.php?*category*=41*
// @match               https://rarbgto.org/torrents.php?imdb=*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const QUALITY = "1080p";

const releaseTableRows = document.getElementsByClassName("lista2");

for (const row of releaseTableRows) {
  const releaseName = row.innerText;

  if (!releaseName.includes(QUALITY) || releaseName.includes("HDTV")) {
    row.style.display = "none";
  }
}
