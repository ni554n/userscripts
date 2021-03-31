// ==UserScript==

// @name                PSARips Replace Post Titles with IMDb Links
// @description         Turns a PSARips Movie post title into an IMDb link and TV Show post title into an IMDb search link.
// @version             2.0

// @namespace           io.github.ni554n
// @match               https://psarips.*/movie/*
// @match               https://psarips.*/tv-show/*
// @match               https://psa.*/movie/*
// @match               https://psa.*/tv-show/*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const imdbIcon = `<i class="fab fa-imdb" style="font-style: normal;"></i>`;
const linkIcon = `<i class="fas fa-external-link-alt" style="font-size: 0.6em; font-style: normal;"></i>`;

const [imdbLink] = document.getElementsByClassName("sp-body folded")[0].innerText
    .match(/https:\/\/www.imdb.com\/title\/\w+\//) ?? [];

const [postTitle] = document.getElementsByClassName("post-title entry-title");
const title = postTitle.innerText;

const link = imdbLink || `https://www.imdb.com/find?q=${encodeURIComponent(title)}`;

postTitle.innerHTML = `<a href="${link}" target="_blank">${imdbIcon} ${title} ${linkIcon}</a>`;
