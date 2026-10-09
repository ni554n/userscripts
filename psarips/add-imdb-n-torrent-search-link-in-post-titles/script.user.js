// ==UserScript==

// @name                PSARips - Add IMDb & Torrent Search Link in Post Titles
// @description         Enhance post titles by adding links to IMDb and Torrent search links
// @version             1.5

// @namespace           io.github.ni554n
// @match               https://psarips.tld/movie/*
// @match               https://psarips.tld/tv-show/*
// @match               https://psa.tld/movie/*
// @match               https://psa.tld/tv-show/*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://anissan.com

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
    "Info dropdown is not found. Check if the selector's changed.",
  );
}

const [imdbMovieLink, imdbId] =
  infoDiv.innerText.match(/https:\/\/www.imdb.com\/title\/(\w+)\//) ?? [];

const encodedTitle = encodeURIComponent(postTitle);

const imdbLink =
  imdbMovieLink ?? `https://www.imdb.com/find?s=tt&ttype=tv&q=${encodedTitle}`;

const imdbIcon = `<i class="fab fa-imdb" style="font-style: normal;"></i>`;
const imdbHtml = `<a href="${imdbLink}" target="_blank" title="Open in IMDb">${imdbIcon}</a>`;

const torrentIcon = `<i class="fa fa-magnet" style="font-style: normal;"></i>`;
const torrentLinkHtml = `<a href="https://1337x.to/search/${encodedTitle}+1080p+qxr/1/" target="_blank" title="Open in 1337x">${torrentIcon}</a>`;

postTitleH1.innerHTML = `${imdbHtml}&nbsp;&nbsp;${torrentLinkHtml}<br />${postTitle}`;
