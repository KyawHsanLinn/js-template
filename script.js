"use strict";
const newQuote = document.getElementById("new-quote");
const author = document.getElementById("author");
const quoteHtml = document.getElementById("quote");
const quoteContainer = document.getElementById("quote-container");
const loader = document.getElementById("loader");
let quoteData = [];

const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
const showData = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};
const quoteRandom = () => {
  loading();
  const quote = quoteData[Math.floor(Math.random() * quoteData.length)];
  quoteHtml.textContent = quote.text;
  if (!quote.author) {
    author.textContent = "Anonymous";
  } else {
    author.textContent = quote.author;
  }
  if (quote.text.length > 50) {
    quoteHtml.classList.add("long-quote");
  } else {
    quoteHtml.classList.remove("long-quote");
  }
  showData();
  console.log(quote);
};
newQuote.addEventListener("click", quoteRandom);
loading();
async function quoteGenerator() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    quoteData = await response.json();
    quoteRandom();
  } catch (error) {}
}
quoteGenerator();
