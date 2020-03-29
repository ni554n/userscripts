// ==UserScript==

// @name                RapidMoviez 1080p Release Link Filter
// @description         Keeps only 1080p links on release page by filtering out other links.
// @version             1.0

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

const sections = document.getElementsByClassName("allrls");

for (const section of sections) {
  for (const link of section.children) {
    const release = link.children[1].innerText;
    if (!release.includes("1080p")) link.style.display = "none";
  }
}
