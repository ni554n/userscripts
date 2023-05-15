// ==UserScript==

// @name                PSARips - Add IMDb & RARBG link in Post Titles
// @description         Enhance post titles by adding links to IMDb and RARBG
// @version             3.0

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
// @homepageURL         https://anissan.com
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const [postTitleH1] = /** @type {HTMLCollectionOf<HTMLElement>} */ (
  document.getElementsByClassName("post-title entry-title")
);

const postTitle = postTitleH1.innerText;

if (!postTitleH1) throw new Error("Failed to get the post title!");

/* Extracting the IMDb link from the movie release "Info" dropdown… */

const infoDiv = /** @type {HTMLElement | undefined} */ (
  document.getElementsByClassName("sp-body folded")[0]
);

if (!infoDiv) {
  throw new Error(
    "Info dropdown is not found. Check if the selector is still valid.",
  );
}

const [imdbMovieLink, imdbId] =
  infoDiv.innerText.match(/https:\/\/www.imdb.com\/title\/(\w+)\//) ?? [];

const encodedTitle = encodeURIComponent(postTitle);

const imdbLink =
  imdbMovieLink ?? `https://www.imdb.com/find?s=tt&ttype=tv&q=${encodedTitle}`;

const imdbIcon = `<i class="fab fa-imdb" style="font-style: normal;"></i>`;
const imdbHtml = `<a href="${imdbLink}" target="_blank title="Open in IMDb">${imdbIcon}</a>`;

const rarbgLink = imdbId
  ? `https://rarbgto.org/torrents.php?imdb=${imdbId}`
  : `https://rarbgto.org/torrents.php?search=${encodedTitle}&category%5B%5D=41`;

const rarbgIcon = `<i class="fa fa-magnet" style="font-style: normal;"></i>`;
const rarbgHtml = `<a href="${rarbgLink}" target="_blank title="Open in RARBG"">${rarbgIcon}</a>`;

postTitleH1.innerHTML = `${imdbHtml}&nbsp;&nbsp;${rarbgHtml}<br />${postTitle}`;
