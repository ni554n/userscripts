// ==UserScript==

// @name                PSARips Replace Movie Post Title with IMDb Link
// @description         Turns any PSARips movie post title into an IMDb link.
// @version             1.6

// @namespace           io.github.ni554n
// @match               https://psarips.*/movie/*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const linkIcon = `<i class="fas fa-external-link-alt" style="font-size: 0.6em; font-style: normal;"></i>`;
const imdbIcon = `<i class="fab fa-imdb" style="font-style: normal;"></i>`;

const [imdbLink] = document.getElementsByClassName("sp-body folded")[0].innerText
    .match(/https:\/\/www.imdb.com\/title\/\w+\//);

if (imdbLink) {
  const [movieTitle] = document.getElementsByClassName("post-title entry-title");
  movieTitle.innerHTML = `<a href="${imdbLink}" target="_blank">${imdbIcon} ${movieTitle.innerText} ${linkIcon}</a>`;
}
