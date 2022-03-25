"use strict";

let events = [];

const eventName = document.querySelector(".js-eventName");
const eventDate = document.querySelector(".js-eventDate");
const btn = document.querySelector(".js-btn");
const eventsContainer = document.querySelector(".eventsContainer");

function startApp(){
loadLS();
renderEvents();
};

function addEvent() {
  if (eventName.value === "" || eventDate.value === "") {
    return;
  }
  if (dataDiff(eventDate.value) < 0) {
    return;
  }
  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
  };
  events.unshift(newEvent);

  saveLS();
  eventName.value = "";
  renderEvents();
}

function dataDiff(destine) {
  const targetDate = new Date(destine);
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}

function renderEvents() {
  const eventsHTML = events.map((event) => {
    return `
    <div class="event">
    <div class="days">
    <span class="days-number">${dataDiff(event.date)}</span>
    <span class="days-text">días</span>
    </div>
    <div class="event-name">${event.name}</div>
    <div class="event-name">${event.date}</div>
    <div class="actions">
    <button class="btn-delete" data-id="${event.id}">Eliminar</button>
    </div>
    </div>
    `;
  });
  eventsContainer.innerHTML = eventsHTML.join("");
  eventsBtn();
}

function handleBtnDelete(ev) {
  const id = ev.target.dataset.id;
  events = events.filter((event) => event.id !== id);
  renderEvents();
  eventDate.value = "";
}

function eventsBtn() {
  const btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", handleBtnDelete)});
}

btn.addEventListener("click", addEvent);
document
  .querySelector(".js-form")
  .addEventListener("submit", (e) => e.preventDefault());

function saveLS() {
  const stringifyData = JSON.stringify(events);
  localStorage.setItem("items", stringifyData);
}

function loadLS() {
  const localStorageData = localStorage.getItem("items");
  if (localStorageData !== null) {
    events = JSON.parse(localStorageData);
  }
};

startApp();

