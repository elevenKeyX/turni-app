const baseWeek = new Date("2026-01-26");

const cycle = ["AP", "CH", "AAP", "ACH"];

const baseRoles = {
  "Gamberini": "AP",
  "Falduto": "CH",
  "Petrulli": "AAP",
  "De Rosa": "ACH"
};

const people = Object.keys(baseRoles);

let week = {};

const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

document.getElementById("weekPicker").addEventListener("change", e => {
  buildWeek(new Date(e.target.value));
});

function weeksBetween(a, b) {
  return Math.floor((b - a) / (7 * 24 * 60 * 60 * 1000));
}

function rotate(role, steps) {
  const i = cycle.indexOf(role);
  return cycle[(i + steps + cycle.length) % cycle.length];
}

function buildWeek(selectedDate) {
  const offset = weeksBetween(baseWeek, selectedDate);
  week = {};

  days.forEach(d => week[d] = {});

  people.forEach(name => {
    const role = rotate(baseRoles[name], offset);
    days.forEach(d => week[d][name] = role);
  });

  const sunday = "Dom";
  people.forEach(p => {
    if (week[sunday][p] === "AP") week[sunday][p] = "RIPOSO";
    if (week[sunday][p] === "ACH") week[sunday][p] = "AAP";
  });

  render();
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = "<tr><th>Nome</th>" + days.map(d => `<th>${d}</th>`).join("") + "</tr>";

  people.forEach(p => {
    let row = `<tr><td>${p}</td>`;
    days.forEach(d => {
      const r = week[d][p];
      row += `<td class='${r}' onclick="toggleRiposo('${p}','${d}')">${r}</td>`;
    });
    row += "</tr>";
    table.innerHTML += row;
  });

  app.appendChild(table);
}

function toggleRiposo(name, day) {
  if (week[day][name] === "RIPOSO") return;
  const missing = week[day][name];
  week[day][name] = "RIPOSO";

  let rolesMap = {};
  Object.entries(week[day]).forEach(([n, r]) => {
    if (r !== "RIPOSO") rolesMap[r] = n;
  });

  const updated = applySubstitution(rolesMap, missing);
  Object.entries(updated).forEach(([role, person]) => {
    week[day][person] = role;
  });

  render();
}

// default: settimana base
document.getElementById("weekPicker").value = "2026-01-26";
buildWeek(new Date("2026-01-26"));
