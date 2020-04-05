// ==UserScript==

// @name                RARBG 1080p Web Release Filter
// @description         Shows only 1080p Web releases on RARBG TV HD Episodes category (and search within that category).
// @version             2.0

// @namespace           io.github.ni554n
// @match               https://rarbgto.org/torrents.php?*category*=41*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const releaseTable = document.getElementsByClassName("lista2");

for (const row of releaseTable) {
  const releaseName = row.innerText;
  if (!releaseName.includes("1080p") || releaseName.includes("HDTV")) row.style.display = "none";
}
