// ==UserScript==

// @name                Google Drive - Highlight Text in Search
// @description         Highlights some text ("1080p" by default) in the Google Drive search results.
// @version             2.5

// @namespace           io.github.ni554n
// @match               https://drive.google.com/*
// @run-at              document-idle

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

// Highlighting text can be changed here.
const HIGHLIGHT = "1080p";

// Highlighting color can be any CSS color name or hex value.
const HIGHLIGHT_TEXT_COLOR = "lightseagreen";

const isLogEnabled = true;

let searchResultUpdateObserver;

trackRouteChanges();

/**
 * Google Drive is an SPA where page navigation is done dynamically via javascript.
 * Navigation to search result page can be detected by observing the <title> changes.
 */
function trackRouteChanges() {
  const titleElement = document.head.getElementsByTagName("title")[0];
  const mainPageDiv = document.getElementById("drive_main_page");

  // Don't know why but any userscript on Google Drive executes twice.
  // First time normally but on the second call, every getElementsBy*() returns null.
  if (titleElement && mainPageDiv) {
    new MutationObserver(observePageNavigation).observe(titleElement, {
      childList: true,
    });
  }

  function observePageNavigation() {
    log(`Page Route Changed to -> ${titleElement.text}`);

    // No longer valid as page route has been changed.
    searchResultUpdateObserver?.disconnect(); // ?

    if (titleElement.innerText !== "Search results - Google Drive") return;

    // Drive adds a search result list dynamically somewhere in the subtree of mainPageDiv.
    new MutationObserver(waitForResultListAttachment).observe(mainPageDiv, {
      childList: true,
      subtree: true,
    });
  }
}

function waitForResultListAttachment(_, mainPageDivObserver) {
  const searchResultList = document.querySelector(
    `div[guidedhelpid="main_container"]`,
  )?.parentElement;

  if (!searchResultList) {
    log("No search result list has been attached!");
    return;
  }

  log(
    `Starting to observe Search Result List for dynamic addition caused by infinite scrolling.`,
  );

  searchResultUpdateObserver = new MutationObserver(searchResultUpdated);

  searchResultUpdateObserver.observe(searchResultList, {
    childList: true,
    subtree: true,
  });

  // As a dynamic Result List update observer has already been set,
  // this #drive_main_page observer is no longer required.
  mainPageDivObserver.disconnect();
}

function searchResultUpdated(mutationList) {
  // log(`Search Result List updated with ${mutationList.length} changes.`);

  mutationList?.forEach((mutation) => {
    log(`Added ${mutation.addedNodes.length} nodes.`);

    mutation.addedNodes.forEach((node) => {
      log("Node added >");

      const potentialNodes = node.querySelectorAll(
        `div[data-column-field="6"]`,
      );

      log(`Matched ${potentialNodes.length} nodes having titles...`);

      potentialNodes.forEach((titleSpan) => {
        log(titleSpan.innerText);

        const isTitleHighlighted =
          titleSpan?.style?.color === HIGHLIGHT_TEXT_COLOR;

        if (!isTitleHighlighted && titleSpan?.innerText?.includes(HIGHLIGHT)) {
          titleSpan.style.color = HIGHLIGHT_TEXT_COLOR;
        }
      });
    });
  });
}

// function searchResultUpdated(mutationList) {
//   // log(`Search Result List updated with ${mutationList.length} changes.`);

//   mutationList?.forEach((mutation) => {
//     log(`Added ${mutation.addedNodes.length} nodes.`);

//     mutation.addedNodes.forEach((node) => {
//       log("Node added >");

//       const potentialNodes = node.querySelectorAll(
//         `div[data-column-field="6"]`,
//       );

//       log(`Matched ${potentialNodes.length} nodes having titles...`);

//       potentialNodes.forEach((titleSpan) => {
//         log(titleSpan.innerText);

//         const isTitleHighlighted =
//           titleSpan?.style?.color === HIGHLIGHT_TEXT_COLOR;

//         if (!isTitleHighlighted && titleSpan?.innerText?.includes(HIGHLIGHT)) {
//           titleSpan.style.color = HIGHLIGHT_TEXT_COLOR;
//         }
//       });
//     });
//   });
// }

function log(message) {
  if (isLogEnabled) console.log(message);
}
