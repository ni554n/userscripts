// ==UserScript==
// @name                Fiverr - Remove All Buyer Requests with One Click
// @description         Adds a "Remove All Requests" button on each page of the Buyer Request Table.
// @version             1.0

// @namespace           io.github.ni554n
// @match               https://www.fiverr.com/users/*/requests
// @run-at              document-idle
// @grant               none

// @supportURL          https://github.com/ni554n/userscripts/issues
// @license             MIT

// @author              Nissan Ahmed
// @homepageURL         https://ni554n.github.io/
// @contributionURL     https://paypal.me/ni554n
// ==/UserScript==

const buyerRequestTable = document.getElementsByClassName("db-new-main-table")[0]?.firstElementChild;

if (!buyerRequestTable) throw new Error("Failed to get a reference of the buyer requests table.");

const headerRow = buyerRequestTable.rows[0];

// Adjust the first column span for accommodating the remove all button.
headerRow.firstElementChild.setAttribute("colspan", "3");

const removeAllButtonHtml = `<td colspan="1" style="text-transform: none;font-size: 12px;font-weight: 400;"><a href="#" class="${GM_info.script.namespace}-remove-button">Remove All Requests</a></td>`;

// Insert the button in the first row.
headerRow.firstElementChild.insertAdjacentHTML("afterend", removeAllButtonHtml);

const removeAllButton = headerRow.cells[1].firstElementChild;

removeAllButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Gather all the "Remove Request" button that shows up when hovering on each request.
  const removeButtons = buyerRequestTable.tBodies[0]
    .querySelectorAll("tr > td > div.hover-show > a.remove-request.js-remove-request");

  [...removeButtons].forEach((listItem, i) => {
    // Automate clicking the remove button at random intervals to avoid being detected as bot.
    setTimeout(() => listItem.click(), i * randomInt(400, 600));
  });

  return false;
});

const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
