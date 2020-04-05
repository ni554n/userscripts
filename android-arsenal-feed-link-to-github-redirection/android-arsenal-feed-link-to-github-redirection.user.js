// ==UserScript==

// @name                Android Arsenal Feed Link to Github Redirection
// @description         Redirects Android Arsenal library links to Github automatically if it is coming from the RSS Feed.
// @version             2.0

// @namespace           io.github.ni554n
// @match               https://android-arsenal.com/details/*/*?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+Android_Arsenal+%28The+Android+Arsenal%29

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const labels = document.querySelectorAll("body > div.wrap.container > div > div > div.row.project-header > div:nth-child(1) > dl > dt");

// Grab the link and forward
for (let i = labels.length - 1; i >= 0; i--) {
  const label = labels.item(i);

  if (label.innerText === "Link") {
    window.location.replace(label.nextElementSibling.innerText);
    break;
  }
}
