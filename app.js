const people = [
  { name: "Gamberini", role: "CH" },
  { name: "Falduto", role: "AAP" },
  { name: "Petrulli", role: "ACH" },
  { name: "De Rosa", role: "AP" }
];

const days = ["Lun 2", "Mar 3", "Mer 4", "Gio 5", "Ven 6", "Sab 7", "Dom 8"];

let week = {};
days.forEach(d => week[d] = {});

days.forEach(day => {
  people.forEach(p => week[day][p.name] = p.role);
});

week["Dom 8"]["De Rosa"] = "RIPOSO";
week["Dom 8"]["Petrulli"] = "AAP";

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const table = document.createElement("table");
  table.innerHTML = "<tr><th>Nome</th>" + days.map(d => `<th>${d}</th>`).join("") + "</tr>";

  people.forEach(p => {
    let row = `<tr><td>${p.name}</td>`;
    days.forEach(d => {
      const r = week[d][p.name];
      row += `<td class='${r}' onclick="toggleRiposo('${p.name}','${d}')">${r}</td>`;
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

render();
