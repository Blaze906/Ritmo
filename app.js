const STORAGE_KEY = "ritmo-state-v1";
const REMINDER_KEY = "ritmo-reminders-fired-v1";
const NATIVE_REMINDER_IDS_KEY = "ritmo-native-reminder-ids-v1";
const NOTIFICATION_CHANNEL_ID = "ritmo-reminders";
const COMPLETED_RETENTION_MS = 24 * 60 * 60 * 1000;

const icon = {
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></svg>',
  list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  focus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M7.8 7.8l-2-2M18.2 18.2l-2-2M16.2 7.8l2-2M5.8 18.2l2-2"/><circle cx="12" cy="12" r="4"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-8"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19"/><circle cx="12" cy="12" r="4"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg>',
  bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5 5 5L8 21H3v-5L14 5Z"/><path d="m12 7 5 5"/></svg>',
  trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/></svg>',
  spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z"/></svg>',
  attach: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 12.5-8.5 8.5a6 6 0 0 1-8.5-8.5L13 3.5a4 4 0 1 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/></svg>'
};

const palette = {
  lavoro: "#315f52",
  studio: "#5b677a",
  salute: "#9a6b4f",
  personale: "#b98554",
  famiglia: "#7a6f50"
};

const seedItems = () => {
  const today = toDateKey(new Date());
  const tomorrow = addDays(today, 1);
  return [
    {
      id: uid(),
      type: "event",
      title: "Revisione roadmap prodotto",
      description: "Allineare obiettivi, rischi e finestre di rilascio.",
      date: today,
      time: "09:30",
      endTime: "10:15",
      location: "Studio",
      notes: "Portare lista decisioni aperte.",
      attachments: ["roadmap-q2.pdf"],
      category: "lavoro",
      priority: "media",
      status: "todo",
      recurrence: "none",
      checklist: [],
      reminders: [30, 10],
      createdAt: Date.now()
    },
    {
      id: uid(),
      type: "task",
      title: "Preparare preventivo cliente",
      description: "Chiudere costi, milestone e nota sui tempi.",
      date: today,
      time: "14:00",
      endTime: "15:00",
      location: "",
      notes: "Controllare margine prima di inviare.",
      attachments: [],
      category: "lavoro",
      priority: "alta",
      status: "progress",
      recurrence: "none",
      checklist: [
        { id: uid(), text: "Rivedere scope", done: true },
        { id: uid(), text: "Stimare milestone", done: false },
        { id: uid(), text: "Inviare bozza", done: false }
      ],
      reminders: [120, 20],
      createdAt: Date.now()
    },
    {
      id: uid(),
      type: "task",
      title: "Passeggiata e pausa schermo",
      description: "Bloccare una pausa vera per recuperare energia.",
      date: tomorrow,
      time: "",
      endTime: "",
      location: "Parco vicino",
      notes: "",
      attachments: [],
      category: "salute",
      priority: "media",
      status: "todo",
      recurrence: "weekday",
      checklist: [],
      reminders: [60],
      createdAt: Date.now()
    }
  ];
};

const defaultState = () => ({
  initialized: false,
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  currentView: new URLSearchParams(location.search).get("view") || "day",
  calendarMode: "week",
  selectedDate: toDateKey(new Date()),
  search: "",
  filter: "all",
  focusItemId: null,
  lastOpenedDate: toDateKey(new Date()),
  categories: [
    { id: "lavoro", name: "Lavoro", color: palette.lavoro },
    { id: "studio", name: "Studio", color: palette.studio },
    { id: "salute", name: "Salute", color: palette.salute },
    { id: "personale", name: "Personale", color: palette.personale },
    { id: "famiglia", name: "Famiglia", color: palette.famiglia }
  ],
  items: seedItems(),
  notifications: []
});

let state = loadState();
let modal = null;
let planner = [];
let toastTimer = null;

saveState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? normalizeStateForToday({ ...defaultState(), ...saved }, saved) : defaultState();
  } catch {
    return defaultState();
  }
}

function normalizeStateForToday(nextState, saved = {}) {
  const today = toDateKey(new Date());
  const now = Date.now();
  const selectedDate = nextState.selectedDate || today;
  const lastOpenedDate = saved.lastOpenedDate;
  const shouldFollowToday = selectedDate < today || (lastOpenedDate && lastOpenedDate !== today && selectedDate === lastOpenedDate);
  return {
    ...nextState,
    items: (nextState.items || []).map((item) => normalizeItemLifecycle(item, now)).filter((item) => !shouldAutoDelete(item, now)),
    selectedDate: shouldFollowToday ? today : selectedDate,
    lastOpenedDate: today
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeItemLifecycle(item, now = Date.now()) {
  if (item.status === "done") {
    return { ...item, completedAt: Number.isFinite(item.completedAt) ? item.completedAt : now };
  }
  return { ...item, completedAt: null };
}

function shouldAutoDelete(item, now = Date.now()) {
  return item.type === "task" && item.status === "done" && Number.isFinite(item.completedAt) && now - item.completedAt >= COMPLETED_RETENTION_MS;
}

function pruneExpiredCompletedTasks() {
  const now = Date.now();
  const before = state.items.length;
  state.items = state.items.map((item) => normalizeItemLifecycle(item, now)).filter((item) => !shouldAutoDelete(item, now));
  return before - state.items.length;
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

function toDateKey(date) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function addDays(key, days) {
  const d = new Date(`${key}T12:00:00`);
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}

function dateLabel(key, options = {}) {
  return new Intl.DateTimeFormat("it-IT", options).format(new Date(`${key}T12:00:00`));
}

function minutes(time) {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(value) {
  const h = String(Math.floor(value / 60)).padStart(2, "0");
  const m = String(value % 60).padStart(2, "0");
  return `${h}:${m}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function categoryById(id) {
  return state.categories.find((category) => category.id === id) || state.categories[0];
}

function getFilteredItems() {
  const query = state.search.trim().toLowerCase();
  return state.items
    .filter((item) => {
      if (
        state.filter !== "all" &&
        item.category !== state.filter &&
        item.status !== state.filter &&
        item.type !== state.filter &&
        item.priority !== state.filter
      ) {
        return false;
      }
      if (!query) return true;
      return [item.title, item.description, item.location, item.notes, item.category]
        .join(" ")
        .toLowerCase()
        .includes(query);
    })
    .sort((a, b) => {
      const am = minutes(a.time) ?? 1440;
      const bm = minutes(b.time) ?? 1440;
      return a.date.localeCompare(b.date) || am - bm || priorityRank(b.priority) - priorityRank(a.priority);
    });
}

function priorityRank(priority) {
  return { alta: 3, media: 2, bassa: 1 }[priority] || 1;
}

function render() {
  const activeBeforeRender = document.activeElement;
  const restoreSearch = activeBeforeRender?.dataset?.input === "search";
  const searchCursor = activeBeforeRender?.selectionStart ?? state.search.length;
  document.documentElement.dataset.theme = state.theme;
  const dueToday = state.items.filter((item) => item.date === state.selectedDate);
  const completed = state.items.filter((item) => item.status === "done").length;
  const openHigh = state.items.filter((item) => item.priority === "alta" && item.status !== "done").length;
  const progress = state.items.length ? Math.round((completed / state.items.length) * 100) : 0;

  document.querySelector("#app").innerHTML = `
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true"></span>
        <div>
          <p class="eyebrow">Ritmo</p>
          <h1>${dateLabel(state.selectedDate, { weekday: "long", day: "numeric", month: "long" })}</h1>
        </div>
      </div>
      <div class="top-actions">
        <button class="icon-button" data-action="notify" title="Attiva notifiche">${icon.bell}</button>
        <button class="icon-button" data-action="theme" title="Cambia tema">${state.theme === "dark" ? icon.sun : icon.moon}</button>
      </div>
    </header>

    <section class="quick-panel">
      <form class="quick-add" data-form="quick">
        <label class="sr-only" for="quick-title">Aggiungi rapidamente</label>
        <input id="quick-title" name="title" autocomplete="off" placeholder="Scrivi un task, un appuntamento o un promemoria" />
        <select name="type" aria-label="Tipo">
          <option value="task">Cosa da fare</option>
          <option value="event">Evento</option>
        </select>
        <button class="primary-button compact" type="submit">${icon.plus}<span>Aggiungi</span></button>
      </form>
      <div class="search-row">
        <label class="search-box">
          ${icon.search}
          <input value="${escapeHtml(state.search)}" data-input="search" placeholder="Cerca per titolo, luogo, note o categoria" />
        </label>
        <button class="secondary-button" data-action="open-modal">${icon.plus}<span>Dettagli</span></button>
      </div>
      <div class="filter-strip">
        ${filterButton("all", "Tutto")}
        ${filterButton("task", "Task")}
        ${filterButton("event", "Eventi")}
        ${filterButton("alta", "Alta priorita")}
        ${state.categories.map((category) => filterButton(category.id, category.name, category.color)).join("")}
      </div>
    </section>

    <main class="content-grid">
      <section class="main-panel">
        ${renderView()}
      </section>
      <aside class="side-panel">
        <section class="summary-card">
          <div class="summary-head">
            <p class="eyebrow">Riepilogo</p>
            <strong>${dueToday.length} elementi oggi</strong>
          </div>
          <div class="meter" aria-label="Completamento ${progress}%">
            <span style="width:${progress}%"></span>
          </div>
          <div class="stats-row">
            <span><strong>${completed}</strong> completati</span>
            <span><strong>${openHigh}</strong> urgenti</span>
          </div>
        </section>
        <section class="planner-panel">
          <div class="panel-title">
            <div>
              <p class="eyebrow">Planner smart</p>
              <h2>Slot liberi</h2>
            </div>
            <button class="icon-button small" data-action="plan" title="Trova slot">${icon.spark}</button>
          </div>
          <div class="planner-list">
            ${renderPlanner()}
          </div>
        </section>
        <section class="tips-panel">
          <p class="eyebrow">Bilanciamento</p>
          ${renderBalanceTip()}
        </section>
        <section class="categories-panel">
          <div class="panel-title">
            <div>
              <p class="eyebrow">Categorie</p>
              <h2>Colori personali</h2>
            </div>
          </div>
          <form class="category-form" data-form="category">
            <input name="name" placeholder="Nuova categoria" aria-label="Nuova categoria" />
            <input name="color" type="color" value="#6d7f67" aria-label="Colore categoria" />
            <button class="icon-button small" type="submit" title="Aggiungi categoria">${icon.plus}</button>
          </form>
          <div class="category-list">
            ${state.categories
              .map(
                (category) => `
                  <div class="category-row">
                    <span style="background:${category.color}"></span>
                    <strong>${escapeHtml(category.name)}</strong>
                    <button class="icon-button small" data-action="delete-category" data-id="${category.id}" title="Rimuovi categoria">${icon.trash}</button>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>
      </aside>
    </main>

    <nav class="bottom-nav" aria-label="Navigazione principale">
      ${navButton("day", icon.calendar, "Oggi")}
      ${navButton("calendar", icon.clock, "Calendario")}
      ${navButton("agenda", icon.list, "Agenda")}
      ${navButton("focus", icon.focus, "Focus")}
      ${navButton("stats", icon.chart, "Stats")}
    </nav>

    <button class="fab" data-action="open-modal" title="Nuovo elemento">${icon.plus}</button>
    ${modal ? renderModal() : ""}
    ${!state.initialized ? renderOnboarding() : ""}
    <div class="toast-region" aria-live="polite"></div>
  `;

  attachEvents();
  if (restoreSearch) {
    const search = document.querySelector("[data-input='search']");
    if (search) {
      search.focus();
      search.setSelectionRange(searchCursor, searchCursor);
    }
  }
}

function filterButton(value, label, color) {
  const active = state.filter === value ? " active" : "";
  const style = color ? `style="--dot:${color}"` : "";
  return `<button class="chip${active}" data-filter="${value}" ${style}><span></span>${escapeHtml(label)}</button>`;
}

function navButton(view, svg, label) {
  const active = state.currentView === view ? " active" : "";
  return `<button class="nav-item${active}" data-view="${view}">${svg}<span>${label}</span></button>`;
}

function renderView() {
  if (state.currentView === "calendar") return renderCalendar();
  if (state.currentView === "agenda") return renderAgenda();
  if (state.currentView === "focus") return renderFocus();
  if (state.currentView === "stats") return renderStats();
  return renderDay();
}

function renderDay() {
  const items = getFilteredItems().filter((item) => item.date === state.selectedDate);
  return `
    <div class="panel-title">
      <div>
        <p class="eyebrow">Giornata</p>
        <h2>${dateLabel(state.selectedDate, { weekday: "long", day: "numeric", month: "long" })}</h2>
      </div>
      <div class="date-stepper">
        <button class="icon-button small" data-action="prev-day" title="Giorno precedente"><span aria-hidden="true">&lsaquo;</span></button>
        <input type="date" value="${state.selectedDate}" data-input="date" aria-label="Data selezionata" />
        <button class="icon-button small" data-action="next-day" title="Giorno successivo"><span aria-hidden="true">&rsaquo;</span></button>
      </div>
    </div>
    <div class="timeline" data-drop-date="${state.selectedDate}">
      ${[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((hour) => renderHourSlot(hour, items)).join("")}
      ${items.filter((item) => !item.time).length ? `<div class="unscheduled">${items.filter((item) => !item.time).map(renderItem).join("")}</div>` : ""}
      ${items.length ? "" : renderEmpty("La giornata e libera", "Aggiungi un task o lascia spazio intenzionale per respirare tra gli impegni.")}
    </div>
  `;
}

function renderHourSlot(hour, items) {
  const atHour = items.filter((item) => minutes(item.time) >= hour * 60 && minutes(item.time) < (hour + 1) * 60);
  return `
    <div class="hour-slot" data-drop-time="${String(hour).padStart(2, "0")}:00">
      <span class="hour-label">${String(hour).padStart(2, "0")}:00</span>
      <div class="hour-content">
        ${atHour.map(renderItem).join("")}
      </div>
    </div>
  `;
}

function renderCalendar() {
  const selectedItems = getFilteredItems().filter((item) => item.date === state.selectedDate);
  return `
    <div class="panel-title calendar-title">
      <div>
        <p class="eyebrow">Calendario</p>
        <h2>${state.calendarMode === "month" ? dateLabel(state.selectedDate, { month: "long", year: "numeric" }) : "Vista " + state.calendarMode}</h2>
      </div>
      <div class="segmented">
        ${["day", "week", "month"].map((mode) => `<button class="${state.calendarMode === mode ? "active" : ""}" data-calendar-mode="${mode}">${modeLabel(mode)}</button>`).join("")}
      </div>
    </div>
    ${state.calendarMode === "day" ? renderDay() : state.calendarMode === "week" ? renderWeek() : renderMonth()}
    ${
      state.calendarMode === "day"
        ? ""
        : `<section class="calendar-day-agenda">
            <div>
              <p class="eyebrow">Selezionato</p>
              <h3>${dateLabel(state.selectedDate, { weekday: "long", day: "numeric", month: "long" })}</h3>
            </div>
            <div class="calendar-day-list">
              ${selectedItems.length ? selectedItems.map(renderItem).join("") : renderEmpty("Nessun elemento", "Tocca un giorno o aggiungi un promemoria per popolare questa data.")}
            </div>
          </section>`
    }
  `;
}

function modeLabel(mode) {
  return { day: "Giorno", week: "Settimana", month: "Mese" }[mode];
}

function renderWeek() {
  const base = new Date(`${state.selectedDate}T12:00:00`);
  const startOffset = (base.getDay() + 6) % 7;
  const monday = addDays(state.selectedDate, -startOffset);
  const days = Array.from({ length: 7 }, (_, index) => addDays(monday, index));
  const today = toDateKey(new Date());
  return `
    <div class="week-grid">
      ${days
        .map((day) => {
          const items = getFilteredItems().filter((item) => item.date === day);
          return `
            <button class="week-day ${day === state.selectedDate ? "active" : ""} ${day === today ? "today" : ""}" data-select-date="${day}" data-drop-date="${day}">
              <span>${dateLabel(day, { weekday: "short" })}</span>
              <strong>${dateLabel(day, { day: "numeric" })}</strong>
              <small>${items.length} elementi</small>
              <div>${items.slice(0, 3).map(renderMiniItem).join("")}</div>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderMonth() {
  const date = new Date(`${state.selectedDate}T12:00:00`);
  const first = new Date(date.getFullYear(), date.getMonth(), 1, 12);
  const startOffset = (first.getDay() + 6) % 7;
  const gridStart = toDateKey(new Date(first.getFullYear(), first.getMonth(), 1 - startOffset, 12));
  const days = Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
  const today = toDateKey(new Date());
  return `
    <div class="month-grid">
      ${["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((day) => `<span class="month-label">${day}</span>`).join("")}
      ${days
        .map((day) => {
          const currentMonth = new Date(`${day}T12:00:00`).getMonth() === date.getMonth();
          const items = getFilteredItems().filter((item) => item.date === day);
          return `
            <button class="month-day ${currentMonth ? "" : "muted"} ${day === state.selectedDate ? "active" : ""} ${day === today ? "today" : ""}" data-select-date="${day}" data-drop-date="${day}">
              <strong>${dateLabel(day, { day: "numeric" })}</strong>
              <span>${items.length ? items.length : ""}</span>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderAgenda() {
  const grouped = getFilteredItems().reduce((groups, item) => {
    groups[item.date] = groups[item.date] || [];
    groups[item.date].push(item);
    return groups;
  }, {});
  const dates = Object.keys(grouped).sort();
  return `
    <div class="panel-title">
      <div>
        <p class="eyebrow">Agenda</p>
        <h2>Cronologia attiva</h2>
      </div>
      <button class="secondary-button" data-action="export">${icon.attach}<span>Backup</span></button>
    </div>
    <div class="agenda-list">
      ${
        dates.length
          ? dates
              .map(
                (date) => `
                  <section class="agenda-day">
                    <h3>${dateLabel(date, { weekday: "long", day: "numeric", month: "long" })}</h3>
                    ${grouped[date].map(renderItem).join("")}
                  </section>
                `
              )
              .join("")
          : renderEmpty("Nessun risultato", "Modifica ricerca o filtri per ritrovare gli elementi salvati.")
      }
    </div>
  `;
}

function renderFocus() {
  const candidates = state.items.filter((item) => item.type === "task" && item.status !== "done").sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));
  const selected = state.items.find((item) => item.id === state.focusItemId) || candidates[0];
  if (!selected) return renderEmpty("Focus libero", "Non hai task aperti. Crea un'attivita e trasformala in una sessione di lavoro.");
  return `
    <div class="focus-layout">
      <div class="focus-orbit">
        <span></span><span></span><span></span>
      </div>
      <div class="focus-copy">
        <p class="eyebrow">Modalita concentrazione</p>
        <h2>${escapeHtml(selected.title)}</h2>
        <p>${escapeHtml(selected.description || "Un blocco alla volta. Chiudi le distrazioni, completa il prossimo passo e torna al calendario con piu spazio mentale.")}</p>
        <div class="focus-actions">
          <button class="primary-button" data-action="complete" data-id="${selected.id}">${icon.check}<span>Completa</span></button>
          <button class="secondary-button" data-action="start-focus" data-id="${selected.id}">${icon.clock}<span>25 min</span></button>
        </div>
      </div>
      <div class="focus-list">
        ${candidates.map((item) => `<button class="${item.id === selected.id ? "active" : ""}" data-focus="${item.id}">${renderMiniItem(item)}<span>${escapeHtml(item.title)}</span></button>`).join("")}
      </div>
    </div>
  `;
}

function renderStats() {
  const total = state.items.length || 1;
  const done = state.items.filter((item) => item.status === "done").length;
  const taskCount = state.items.filter((item) => item.type === "task").length;
  const eventCount = state.items.filter((item) => item.type === "event").length;
  const byCategory = state.categories.map((category) => ({
    ...category,
    count: state.items.filter((item) => item.category === category.id).length
  }));
  return `
    <div class="panel-title">
      <div>
        <p class="eyebrow">Produttivita</p>
        <h2>Andamento personale</h2>
      </div>
    </div>
    <div class="stats-grid">
      ${statTile("Completamento", `${Math.round((done / total) * 100)}%`, "Task chiusi sul totale")}
      ${statTile("Attivita", taskCount, "Cose da fare salvate")}
      ${statTile("Eventi", eventCount, "Appuntamenti in calendario")}
      ${statTile("Carico alto", state.items.filter((item) => item.priority === "alta" && item.status !== "done").length, "Priorita da proteggere")}
    </div>
    <div class="category-bars">
      ${byCategory
        .map(
          (category) => `
            <div>
              <span>${escapeHtml(category.name)}</span>
              <div class="bar"><i style="width:${Math.max(8, (category.count / total) * 100)}%; background:${category.color}"></i></div>
              <strong>${category.count}</strong>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function statTile(label, value, detail) {
  return `
    <article class="stat-tile">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${detail}</small>
    </article>
  `;
}

function renderItem(item) {
  const category = categoryById(item.category);
  const checklistDone = item.checklist?.filter((entry) => entry.done).length || 0;
  const checklistTotal = item.checklist?.length || 0;
  return `
    <article class="item-card ${item.status === "done" ? "done" : ""}" draggable="true" data-drag-id="${item.id}" style="--item-color:${category.color}">
      <div class="item-accent"></div>
      <div class="item-main">
        <div class="item-title-row">
          <span class="type-pill">${item.type === "event" ? "Evento" : "Task"}</span>
          <strong>${escapeHtml(item.title)}</strong>
        </div>
        <p>${escapeHtml(item.description || item.notes || "Nessuna descrizione")}</p>
        <div class="meta-row">
          ${item.time ? `<span>${icon.clock}${item.time}${item.endTime ? " - " + item.endTime : ""}</span>` : "<span>Da pianificare</span>"}
          ${item.location ? `<span>${icon.pin}${escapeHtml(item.location)}</span>` : ""}
          <span class="priority ${item.priority}">${item.priority}</span>
          ${checklistTotal ? `<span>${checklistDone}/${checklistTotal} step</span>` : ""}
          ${item.reminders?.length ? `<span>${item.reminders.length} promemoria</span>` : ""}
        </div>
        ${renderChecklist(item)}
      </div>
      <div class="item-actions">
        <button class="icon-button small" data-action="edit" data-id="${item.id}" title="Modifica">${icon.edit}</button>
        <button class="icon-button small" data-action="complete" data-id="${item.id}" title="Completa">${icon.check}</button>
      </div>
    </article>
  `;
}

function renderChecklist(item) {
  if (!item.checklist?.length) return "";
  return `
    <div class="inline-checklist">
      ${item.checklist
        .slice(0, 4)
        .map(
          (entry) => `
            <button class="${entry.done ? "checked" : ""}" data-action="toggle-check" data-id="${item.id}" data-check-id="${entry.id}">
              ${icon.check}<span>${escapeHtml(entry.text)}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMiniItem(item) {
  const category = categoryById(item.category);
  return `<span class="mini-item" style="--item-color:${category.color}"><i></i>${escapeHtml(item.time || item.priority)}</span>`;
}

function renderEmpty(title, body) {
  return `
    <div class="empty-state">
      ${icon.spark}
      <h3>${title}</h3>
      <p>${body}</p>
      <button class="primary-button" data-action="open-modal">${icon.plus}<span>Crea elemento</span></button>
    </div>
  `;
}

function renderPlanner() {
  if (!planner.length) {
    return `<p class="quiet">Premi il simbolo smart per proporre slot liberi ai task senza orario.</p>`;
  }
  return planner
    .map(
      (slot) => `
        <button class="slot-suggestion" data-plan-id="${slot.item.id}" data-plan-date="${slot.date}" data-plan-time="${slot.time}">
          <span>${escapeHtml(slot.item.title)}</span>
          <strong>${dateLabel(slot.date, { weekday: "short", day: "numeric" })}, ${slot.time}</strong>
        </button>
      `
    )
    .join("");
}

function renderBalanceTip() {
  const selectedItems = state.items.filter((item) => item.date === state.selectedDate);
  const intense = selectedItems.filter((item) => item.priority === "alta").length;
  const hasBreak = selectedItems.some((item) => /pausa|cammin|riposo|break/i.test(item.title + " " + item.description));
  if (intense >= 2 && !hasBreak) {
    return `<h2>Giornata densa</h2><p>Aggiungi una pausa di 20 minuti dopo il blocco piu impegnativo: il planner trovera uno spazio libero.</p>`;
  }
  if (!selectedItems.length) {
    return `<h2>Spazio disponibile</h2><p>Ottimo giorno per pianificare una priorita alta o lasciare una finestra libera intenzionale.</p>`;
  }
  return `<h2>Ritmo sostenibile</h2><p>Il carico e distribuito. Proteggi gli slot gia liberi invece di riempirli tutti.</p>`;
}

function renderModal() {
  const item = modal.id ? state.items.find((entry) => entry.id === modal.id) : null;
  const data = item || {
    type: modal.type || "task",
    title: modal.title || "",
    description: "",
    date: state.selectedDate,
    time: "",
    endTime: "",
    location: "",
    notes: "",
    attachments: [],
    category: state.categories[0].id,
    priority: "media",
    status: "todo",
    recurrence: "none",
    checklist: [],
    reminders: []
  };
  const suggestion = suggestedReminders(data);
  return `
    <div class="modal-backdrop" data-action="close-modal">
      <section class="modal-sheet" role="dialog" aria-modal="true" aria-label="${item ? "Modifica elemento" : "Nuovo elemento"}">
        <form data-form="detail">
          <div class="modal-head">
            <div>
              <p class="eyebrow">${item ? "Modifica" : "Crea"}</p>
              <h2>${item ? "Aggiorna elemento" : "Nuovo ritmo"}</h2>
            </div>
            <button class="icon-button" type="button" data-action="close-modal" title="Chiudi">&times;</button>
          </div>
          <input type="hidden" name="id" value="${escapeHtml(data.id || "")}" />
          <div class="form-grid">
            ${field("Titolo", "title", "text", data.title, "Es. Presentazione cliente")}
            <label class="field"><span>Tipo</span><select name="type"><option value="task" ${data.type === "task" ? "selected" : ""}>Cosa da fare</option><option value="event" ${data.type === "event" ? "selected" : ""}>Evento</option></select><small>Task e appuntamenti hanno priorita e calendario condivisi.</small></label>
            ${field("Data", "date", "date", data.date)}
            ${field("Ora", "time", "time", data.time)}
            ${field("Fine", "endTime", "time", data.endTime)}
            <label class="field"><span>Categoria</span><select name="category">${state.categories.map((category) => `<option value="${category.id}" ${data.category === category.id ? "selected" : ""}>${escapeHtml(category.name)}</option>`).join("")}</select><small>Usata per colori, filtri e statistiche.</small></label>
            <label class="field"><span>Priorita</span><select name="priority"><option value="bassa" ${data.priority === "bassa" ? "selected" : ""}>Bassa</option><option value="media" ${data.priority === "media" ? "selected" : ""}>Media</option><option value="alta" ${data.priority === "alta" ? "selected" : ""}>Alta</option></select><small>Influenza i suggerimenti del planner.</small></label>
            <label class="field"><span>Stato</span><select name="status"><option value="todo" ${data.status === "todo" ? "selected" : ""}>Da fare</option><option value="progress" ${data.status === "progress" ? "selected" : ""}>In corso</option><option value="done" ${data.status === "done" ? "selected" : ""}>Completata</option></select><small>Le attivita completate restano nello storico.</small></label>
            <label class="field"><span>Ricorrenza</span><select name="recurrence"><option value="none" ${data.recurrence === "none" ? "selected" : ""}>Nessuna</option><option value="daily" ${data.recurrence === "daily" ? "selected" : ""}>Ogni giorno</option><option value="weekday" ${data.recurrence === "weekday" ? "selected" : ""}>Giorni lavorativi</option><option value="weekly" ${data.recurrence === "weekly" ? "selected" : ""}>Ogni settimana</option><option value="monthly" ${data.recurrence === "monthly" ? "selected" : ""}>Ogni mese</option></select><small>Base pronta per generare occorrenze locali.</small></label>
            ${field("Luogo", "location", "text", data.location, "Casa, ufficio, palestra")}
          </div>
          <label class="field full"><span>Descrizione</span><textarea name="description" rows="3" placeholder="Dettagli utili">${escapeHtml(data.description)}</textarea><small>Resta salvata solo su questo dispositivo.</small></label>
          <label class="field full"><span>Note</span><textarea name="notes" rows="2" placeholder="Appunti veloci">${escapeHtml(data.notes)}</textarea><small>Usa le note per contesto operativo, non per rumore.</small></label>
          <label class="field full"><span>Allegati</span><input name="attachments" value="${escapeHtml(data.attachments?.join(", ") || "")}" placeholder="nomi file separati da virgola" /><small>Questa versione salva il riferimento testuale, non carica file nel cloud.</small></label>
          <label class="field full"><span>Checklist</span><textarea name="checklist" rows="3" placeholder="Una sotto-attivita per riga">${escapeHtml((data.checklist || []).map((entry) => `${entry.done ? "[x] " : ""}${entry.text}`).join("\n"))}</textarea><small>Scrivi [x] davanti a una riga gia completata.</small></label>
          <div class="reminder-box">
            <div>
              <p class="eyebrow">Promemoria intelligenti</p>
              <strong>${suggestion.label}</strong>
              <small>${suggestion.reason}</small>
            </div>
            <label class="field"><span>Minuti prima</span><input name="reminders" value="${escapeHtml((data.reminders?.length ? data.reminders : suggestion.values).join(", "))}" placeholder="120, 30, 10" /><small>Puoi inserire piu promemoria.</small></label>
          </div>
          <div class="modal-actions">
            ${item ? `<button class="danger-button" type="button" data-action="delete" data-id="${item.id}">${icon.trash}<span>Elimina</span></button>` : "<span></span>"}
            <button class="primary-button" type="submit">${icon.check}<span>Salva</span></button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function field(label, name, type, value = "", placeholder = "") {
  return `<label class="field"><span>${label}</span><input name="${name}" type="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" /><small></small></label>`;
}

function suggestedReminders(data) {
  if (data.priority === "alta") return { label: "Promemoria aggressivo", reason: "Per priorita alta conviene ricevere un avviso ampio e uno ravvicinato.", values: [240, 60, 15] };
  if (data.type === "event" && data.location) return { label: "Promemoria con spostamento", reason: "Il luogo indica che serve margine prima di partire.", values: [90, 30] };
  if (!data.time) return { label: "Promemoria sulla scadenza", reason: "Senza orario preciso, meglio un richiamo al mattino.", values: [540] };
  return { label: "Promemoria leggero", reason: "Uno slot singolo basta per un impegno ordinario.", values: [30] };
}

function renderOnboarding() {
  return `
    <div class="modal-backdrop onboarding">
      <section class="modal-sheet intro" role="dialog" aria-modal="true" aria-label="Benvenuto in Ritmo">
        <div class="brand large"><span class="brand-mark"></span><div><p class="eyebrow">Benvenuto</p><h2>Ritmo organizza quello che devi fare, non solo dove devi essere.</h2></div></div>
        <div class="intro-grid">
          <div><strong>Locale</strong><p>Dati sul dispositivo, accesso offline e backup manuale.</p></div>
          <div><strong>Produttivo</strong><p>Priorita, checklist, focus mode e slot liberi suggeriti.</p></div>
          <div><strong>Rapido</strong><p>Aggiungi un elemento in pochi secondi e rifinisci solo quando serve.</p></div>
        </div>
        <button class="primary-button wide" data-action="finish-onboarding">${icon.check}<span>Inizia</span></button>
      </section>
    </div>
  `;
}

function attachEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", handleAction);
  });
  document.querySelectorAll("[data-view]").forEach((element) => {
    element.addEventListener("click", () => {
      state.currentView = element.dataset.view;
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-filter]").forEach((element) => {
    element.addEventListener("click", () => {
      state.filter = element.dataset.filter;
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-calendar-mode]").forEach((element) => {
    element.addEventListener("click", () => {
      state.calendarMode = element.dataset.calendarMode;
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-select-date]").forEach((element) => {
    element.addEventListener("click", () => {
      state.selectedDate = element.dataset.selectDate;
      state.currentView = state.calendarMode === "day" ? "day" : state.currentView;
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-focus]").forEach((element) => {
    element.addEventListener("click", () => {
      state.focusItemId = element.dataset.focus;
      saveState();
      render();
    });
  });
  document.querySelectorAll("[data-plan-id]").forEach((element) => {
    element.addEventListener("click", () => applyPlan(element));
  });
  document.querySelectorAll("[data-drag-id]").forEach((element) => {
    element.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", element.dataset.dragId));
  });
  document.querySelectorAll("[data-drop-date], [data-drop-time]").forEach((element) => {
    element.addEventListener("dragover", (event) => event.preventDefault());
    element.addEventListener("drop", (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData("text/plain");
      const item = state.items.find((entry) => entry.id === id);
      if (!item) return;
      const date = element.dataset.dropDate || element.closest("[data-drop-date]")?.dataset.dropDate;
      const time = element.dataset.dropTime;
      item.date = date || item.date;
      if (time) item.time = time;
      saveState();
      syncNativeReminders();
      render();
      showToast("Elemento spostato");
    });
  });
  const search = document.querySelector("[data-input='search']");
  if (search) {
    search.addEventListener("input", (event) => {
      state.search = event.target.value;
      saveState();
      render();
    });
  }
  const dateInput = document.querySelector("[data-input='date']");
  if (dateInput) {
    dateInput.addEventListener("change", (event) => {
      state.selectedDate = event.target.value;
      saveState();
      render();
    });
  }
  document.querySelector("[data-form='quick']")?.addEventListener("submit", handleQuickAdd);
  document.querySelector("[data-form='detail']")?.addEventListener("submit", handleDetailSubmit);
  document.querySelector("[data-form='category']")?.addEventListener("submit", handleCategorySubmit);
  document.querySelector(".modal-sheet")?.addEventListener("click", (event) => event.stopPropagation());
}

function handleAction(event) {
  const action = event.currentTarget.dataset.action;
  const id = event.currentTarget.dataset.id;
  if (action === "theme") state.theme = state.theme === "dark" ? "light" : "dark";
  if (action === "open-modal") modal = { type: "task" };
  if (action === "close-modal") modal = null;
  if (action === "edit") modal = { id };
  if (action === "delete") deleteItem(id);
  if (action === "complete") completeItem(id);
  if (action === "prev-day") state.selectedDate = addDays(state.selectedDate, -1);
  if (action === "next-day") state.selectedDate = addDays(state.selectedDate, 1);
  if (action === "plan") planner = buildPlan();
  if (action === "notify") requestNotifications();
  if (action === "export") exportBackup();
  if (action === "finish-onboarding") state.initialized = true;
  if (action === "start-focus") startFocus(id);
  if (action === "toggle-check") toggleChecklist(id, event.currentTarget.dataset.checkId);
  if (action === "delete-category") deleteCategory(id);
  saveState();
  render();
}

function handleQuickAdd(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const title = form.get("title").trim();
  if (!title) return showToast("Scrivi prima un titolo");
  const type = form.get("type");
  modal = { type, title };
  render();
}

function handleDetailSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const id = form.get("id") || uid();
  const existing = state.items.find((item) => item.id === id);
  const item = {
    id,
    type: form.get("type"),
    title: form.get("title").trim() || "Elemento senza titolo",
    description: form.get("description").trim(),
    date: form.get("date") || state.selectedDate,
    time: form.get("time"),
    endTime: form.get("endTime"),
    location: form.get("location").trim(),
    notes: form.get("notes").trim(),
    attachments: form
      .get("attachments")
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean),
    category: form.get("category"),
    priority: form.get("priority"),
    status: form.get("status"),
    recurrence: form.get("recurrence"),
    checklist: form
      .get("checklist")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({ id: uid(), text: line.replace(/^\[x\]\s*/i, ""), done: /^\[x\]/i.test(line) })),
    reminders: form
      .get("reminders")
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isFinite(entry) && entry >= 0),
    createdAt: existing?.createdAt || Date.now(),
    completedAt: form.get("status") === "done" ? existing?.completedAt || Date.now() : null
  };
  const transitionedToDone = existing?.status !== "done" && item.status === "done";
  if (existing) state.items = state.items.map((entry) => (entry.id === id ? item : entry));
  else state.items.push(item);
  if (transitionedToDone && item.recurrence !== "none") createNextOccurrence(item);
  modal = null;
  planner = [];
  pruneExpiredCompletedTasks();
  saveState();
  syncNativeReminders();
  render();
  showToast("Salvato");
}

function handleCategorySubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  if (!name) return showToast("Dai un nome alla categoria");
  const id = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
  if (!id || state.categories.some((category) => category.id === id)) return showToast("Categoria gia presente");
  state.categories.push({ id, name, color: form.get("color") || "#6d7f67" });
  saveState();
  render();
  showToast("Categoria aggiunta");
}

function deleteItem(id) {
  state.items = state.items.filter((item) => item.id !== id);
  modal = null;
  syncNativeReminders();
  showToast("Elemento eliminato");
}

function completeItem(id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  item.status = item.status === "done" ? "todo" : "done";
  item.completedAt = item.status === "done" ? Date.now() : null;
  if (item.status === "done" && item.recurrence !== "none") createNextOccurrence(item);
  pruneExpiredCompletedTasks();
  syncNativeReminders();
  showToast(item.status === "done" ? "Completato" : "Riaperto");
}

function toggleChecklist(itemId, checkId) {
  const item = state.items.find((entry) => entry.id === itemId);
  const check = item?.checklist?.find((entry) => entry.id === checkId);
  if (!check) return;
  check.done = !check.done;
  const wasDone = item.status === "done";
  if (item.checklist.every((entry) => entry.done)) {
    item.status = "done";
    item.completedAt = item.completedAt || Date.now();
    if (!wasDone && item.recurrence !== "none") createNextOccurrence(item);
  } else {
    item.status = "todo";
    item.completedAt = null;
  }
  pruneExpiredCompletedTasks();
  syncNativeReminders();
  showToast(check.done ? "Step completato" : "Step riaperto");
}

function deleteCategory(id) {
  if (state.categories.length <= 1) return showToast("Serve almeno una categoria");
  if (state.items.some((item) => item.category === id)) return showToast("Categoria usata da elementi esistenti");
  state.categories = state.categories.filter((category) => category.id !== id);
  if (state.filter === id) state.filter = "all";
  showToast("Categoria rimossa");
}

function createNextOccurrence(item) {
  let nextDate = item.date;
  if (item.recurrence === "daily") nextDate = addDays(item.date, 1);
  if (item.recurrence === "weekday") {
    nextDate = addDays(item.date, 1);
    while ([0, 6].includes(new Date(`${nextDate}T12:00:00`).getDay())) nextDate = addDays(nextDate, 1);
  }
  if (item.recurrence === "weekly") nextDate = addDays(item.date, 7);
  if (item.recurrence === "monthly") {
    const d = new Date(`${item.date}T12:00:00`);
    d.setMonth(d.getMonth() + 1);
    nextDate = toDateKey(d);
  }
  state.items.push({ ...item, id: uid(), date: nextDate, status: "todo", completedAt: null, checklist: item.checklist.map((entry) => ({ ...entry, id: uid(), done: false })) });
}

function buildPlan() {
  const tasks = state.items.filter((item) => item.type === "task" && item.status !== "done" && !item.time);
  const suggestions = [];
  tasks.forEach((task, index) => {
    const searchDays = Array.from({ length: 7 }, (_, day) => addDays(state.selectedDate, day));
    for (const date of searchDays) {
      const busy = state.items
        .filter((item) => item.date === date && item.time)
        .map((item) => [minutes(item.time), minutes(item.endTime) || minutes(item.time) + 45]);
      const preferredStart = task.priority === "alta" ? 9 * 60 : 11 * 60;
      for (let slot = preferredStart; slot <= 18 * 60; slot += 30) {
        const duration = task.priority === "alta" ? 60 : 45;
        const free = busy.every(([start, end]) => slot + duration <= start || slot >= end);
        if (free) {
          suggestions.push({ item: task, date, time: fromMinutes(slot + index * 5) });
          return;
        }
      }
    }
  });
  if (!suggestions.length) showToast("Nessun task senza orario da pianificare");
  return suggestions.slice(0, 4);
}

function applyPlan(element) {
  const item = state.items.find((entry) => entry.id === element.dataset.planId);
  if (!item) return;
  item.date = element.dataset.planDate;
  item.time = element.dataset.planTime;
  item.endTime = fromMinutes((minutes(item.time) || 540) + (item.priority === "alta" ? 60 : 45));
  planner = planner.filter((slot) => slot.item.id !== item.id);
  saveState();
  syncNativeReminders();
  render();
  showToast("Task pianificato");
}

async function requestNotifications() {
  const nativeNotifications = getNativeNotifications();
  if (nativeNotifications) {
    try {
      const current = await nativeNotifications.checkPermissions();
      const permission = current.display === "granted" ? current : await nativeNotifications.requestPermissions();
      if (permission.display === "granted") {
        const synced = await syncNativeReminders();
        showToast(synced ? "Notifiche attive anche a app chiusa" : "Notifiche attive, nessun promemoria futuro da pianificare");
      } else {
        showToast("Autorizzazione notifiche non concessa");
      }
      return;
    } catch {
      showToast("Non riesco ad attivare le notifiche di sistema");
      return;
    }
  }

  if ("Notification" in window) {
    try {
      const permission = Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
      if (permission === "granted") checkReminders();
      showToast(permission === "granted" ? "Notifiche attive mentre l'app e aperta" : "Autorizzazione notifiche non concessa");
    } catch {
      showToast("Il browser ha bloccato la richiesta notifiche");
    }
    return;
  }

  showToast("Notifiche disponibili installando l'app o aggiornando il browser");
}

function checkReminders() {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const fired = JSON.parse(localStorage.getItem(REMINDER_KEY) || "{}");
  const now = Date.now();
  state.items.forEach((item) => {
    if (!item.time || item.status === "done") return;
    const start = new Date(`${item.date}T${item.time}:00`).getTime();
    item.reminders.forEach((before) => {
      const fireAt = start - before * 60 * 1000;
      const key = `${item.id}-${before}-${item.date}-${item.time}`;
      if (!fired[key] && now >= fireAt && now - fireAt < 60 * 1000) {
        showWebReminder(item, before);
        fired[key] = true;
      }
    });
  });
  localStorage.setItem(REMINDER_KEY, JSON.stringify(fired));
}

function getNativeNotifications() {
  return window.Capacitor?.Plugins?.LocalNotifications || null;
}

async function syncNativeReminders() {
  const nativeNotifications = getNativeNotifications();
  if (!nativeNotifications) return false;
  try {
    const permission = await nativeNotifications.checkPermissions();
    if (permission.display !== "granted") return false;
    await ensureNotificationChannel(nativeNotifications);
    const pending = await nativeNotifications.getPending();
    const ritmoPending = (pending.notifications || []).filter((notification) => notification.extra?.source === "ritmo");
    const storedIds = getStoredNativeReminderIds();
    const cancelIds = [...new Set([...storedIds, ...ritmoPending.map((notification) => notification.id)])];
    if (cancelIds.length) await nativeNotifications.cancel({ notifications: cancelIds.map((id) => ({ id })) });
    const notifications = buildNativeReminderNotifications();
    if (notifications.length) await nativeNotifications.schedule({ notifications });
    localStorage.setItem(NATIVE_REMINDER_IDS_KEY, JSON.stringify(notifications.map((notification) => notification.id)));
    return true;
  } catch {
    return false;
  }
}

function getStoredNativeReminderIds() {
  try {
    return JSON.parse(localStorage.getItem(NATIVE_REMINDER_IDS_KEY) || "[]").filter(Number.isFinite);
  } catch {
    return [];
  }
}

async function ensureNotificationChannel(nativeNotifications) {
  if (!nativeNotifications.createChannel) return;
  await nativeNotifications.createChannel({
    id: NOTIFICATION_CHANNEL_ID,
    name: "Promemoria Ritmo",
    description: "Avvisi per eventi e task pianificati",
    importance: 5,
    visibility: 1
  });
}

function buildNativeReminderNotifications() {
  const now = Date.now();
  const horizon = now + 90 * 24 * 60 * 60 * 1000;
  return state.items.flatMap((item) => {
    if (!item.time || item.status === "done") return [];
    const start = new Date(`${item.date}T${item.time}:00`).getTime();
    return (item.reminders || [])
      .map((before) => {
        const fireAt = start - before * 60 * 1000;
        if (fireAt <= now || fireAt > horizon) return null;
        return {
          id: notificationId(`${item.id}-${before}-${item.date}-${item.time}`),
          title: item.title,
          body: `${before} minuti all'inizio${item.location ? " - " + item.location : ""}`,
          schedule: { at: new Date(fireAt), allowWhileIdle: true },
          channelId: NOTIFICATION_CHANNEL_ID,
          extra: { source: "ritmo", itemId: item.id }
        };
      })
      .filter(Boolean);
  });
}

function notificationId(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return (hash % 2147483000) + 1;
}

async function showWebReminder(item, before) {
  const body = `${before} minuti all'inizio${item.location ? " - " + item.location : ""}`;
  try {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      if (registration?.showNotification) {
        await registration.showNotification(item.title, { body, icon: "assets/icon.svg", badge: "assets/maskable-icon.svg" });
        return;
      }
    }
    new Notification(item.title, { body, icon: "assets/icon.svg" });
  } catch {
    showToast(`${before} minuti all'inizio: ${item.title}`);
  }
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ritmo-backup-${toDateKey(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Backup creato");
}

function startFocus(id) {
  state.focusItemId = id;
  const item = state.items.find((entry) => entry.id === id);
  showToast(`Focus avviato: ${item?.title || "25 minuti"}`);
}

function showToast(message) {
  clearTimeout(toastTimer);
  requestAnimationFrame(() => {
    const region = document.querySelector(".toast-region");
    if (!region) return;
    region.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`;
    toastTimer = setTimeout(() => {
      const target = document.querySelector(".toast-region");
      if (target) target.innerHTML = "";
    }, 2600);
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

pruneExpiredCompletedTasks();
saveState();
syncNativeReminders();
setInterval(checkReminders, 30000);
setInterval(() => {
  const deleted = pruneExpiredCompletedTasks();
  if (!deleted) return;
  saveState();
  syncNativeReminders();
  render();
}, 60000);
render();
