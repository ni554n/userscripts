// ==UserScript==

// @name                PSARips Replace Post Titles with IMDb Links
// @description         Turns a PSARips Movie or TV Show post title into a direct IMDb link or IMDb search link.
// @version             2.4

// @namespace           io.github.ni554n
// @match               https://psarips.*/movie/*
// @match               https://psarips.*/tv-show/*
// @match               https://psa.*/movie/*
// @match               https://psa.*/tv-show/*
// @match               https://x265.club/movie/*
// @match               https://x265.club/tv-show/*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const [postTitleH1] = document.getElementsByClassName("post-title entry-title");
const releaseTitle = postTitleH1?.innerText;

if (!postTitleH1) throw new Error("Failed to get the post title!");

// Extract the IMDb link from the movie release info section.
const [imdbMovieLink] =
  document
    .getElementsByClassName("sp-body folded")[0]
    ?.innerText.match(/https:\/\/www.imdb.com\/title\/\w+\//) ?? [];

const imdbLink = imdbMovieLink
  ? imdbMovieLink
  : `https://www.imdb.com/find?s=tt&ttype=tv&q=${encodeURIComponent(
      releaseTitle,
    )}`;

// Icons are from the bundled Font Awesome library.
const imdbIcon = `<i class="fab fa-imdb" style="font-style: normal;"></i>`;
const linkIcon = `<i class="fas fa-external-link-alt" style="font-size: 0.6em; font-style: normal;"></i>`;

postTitleH1.innerHTML = `<a href="${imdbLink}" title="Open IMDb" target="_blank">${imdbIcon} ${releaseTitle} ${linkIcon}</a>`;
