// ==UserScript==

// @name                RapidMoviez 1080p Release Link Filter
// @description         Keeps only the 1080p links on release page by filtering out the other links.
// @version             1.1

// @namespace           io.github.ni554n
// @match               http*://rmz.cr/*
// @exclude-match       http*://rmz.cr/
// @exclude-match       http*://rmz.cr/*/*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

// Section example: Packs, Episodes, Archived.
const sectionList = document.getElementsByClassName("allrls");

for (const section of sectionList) {
  for (const releaseItem of section.children) {
    const releaseName = releaseItem.children[1].innerText;

    if (!releaseName.includes("1080p")) {
      releaseItem.style.display = "none";
    }
  }
}
