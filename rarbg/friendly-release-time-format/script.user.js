// ==UserScript==

// @name                RARBG - Friendly Release Time Format
// @description         Transforms the default "Added" time format into a human readable relative time format.
// @version             2.2

// @namespace           io.github.ni554n
// @match               http*://rarbgto.org/torrents.php*
// @match               http*://rarbgmirror.com/torrents.php*

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n

// ==/UserScript==

const [releaseTable] = document.getElementsByClassName("lista2t");

if (!releaseTable) throw new Error("Failed to get a reference of the release table.");

// Extract the time zone information from the date time provided on footer.
const footer = document.querySelector(`a[href="/dmca_info.php"]`)?.parentElement;

if (!footer) throw new Error("Failed to get a reference of the website footer.");

const updatedDateString = footer.lastChild.textContent.trim();

const updatedDate = new Date(updatedDateString);
const [timeZoneString] = updatedDateString.match(/(\+|-)\d+$/);

// Transform the added time format in each row except the first row, which is the table header.
for (let i = 1; i < releaseTable.rows.length; i++) {
  const row = releaseTable.rows[i];

  if (row.style.display === "none") continue;

  const addedTimeColumn = row.cells[2];

  const addedTimeString = addedTimeColumn.innerText.trim();
  const addedTimeDate = new Date(`${addedTimeString.replace(" ", "T")}${timeZoneString}`);

  addedTimeColumn.innerText = `${formatAsRelativeTime(addedTimeDate)} ago`;
}

// Format example: 2Y 12M 30d 23h 59m 59s.
function formatAsRelativeTime(addedDate) {
  let duration = Math.abs(addedDate - updatedDate);

  const unitToDuration = {
    s: Math.floor(duration /= 1000) % 60,
    m: Math.floor(duration /= 60) % 60,
    h: Math.floor(duration /= 60) % 24,
    d: Math.floor(duration /= 24) % 30,
    M: Math.floor(duration /= 30) % 12,
    Y: Math.floor(duration /= 12),
  };

  let formattedString = "";

  for (const [unit, duration] of Object.entries(unitToDuration)) {
    if (duration === 0) continue;

    formattedString = `${duration}${unit} ${formattedString}`;
  }

  return formattedString.trim();
};
