// ==UserScript==

// @name                RapidMoviez Scrollable Popular Movies and TV Shows Section
// @description         Changing the grid style of "Popular Movies and TV Shows" section of RapidMoviez to a scrollable list like the "Latest Episodes" section.
// @version             2.0

// @namespace           io.github.ni554n
// @match               http*://rmz.cr/*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const popularSection = document.getElementsByClassName("pops clear")[0];

// Apply the styles of "Latest Episodes" section
popularSection.className = "latest clear";

const releases = popularSection.lastElementChild;

// Transfer the styles of "Latest Episodes" items to "Popular Movies and TV Shows" items
for (const releaseItem of releases.children) {
  releaseItem.removeAttribute("class");

  // Align thumbnail to the left
  const thumbnail = releaseItem.firstElementChild;
  thumbnail.firstElementChild.setAttribute("align", "left");

  const titleLink = thumbnail.cloneNode();
  titleLink.textContent = titleLink.getAttribute("title")
      || titleLink.getAttribute("href").substring(1).split('-').map((word) => {
        return word.charAt(0).toUpperCase() + word.substring(1);
      }).join(' ');

  const span = document.createElement("span");
  span.appendChild(titleLink);

  releaseItem.appendChild(span);
}

// Add the transformed list to "Popular Movies and TV Shows" section
const div = document.createElement("div");
div.className = "epicontainer";
div.setAttribute("style", "margin: 0px 0 0 -5px; height: 380px");
div.appendChild(releases);

popularSection.appendChild(div);
