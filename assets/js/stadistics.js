
let logout = document.getElementById("logOut");
let welcome = document.getElementById("welcome");

let user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "../login.html"; 
} else {
  welcome.innerHTML = `<p>Welcome back, ${user.name}!</p>`;
}

// Cerrar sesión
logout.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../../../index.html";
});

async function countEventsByStatus() {
  try {
    const res = await fetch("http://localhost:3000/events");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    const elements = document.querySelectorAll(".event-counter");

    elements.forEach(el => {
      const status = el.dataset.status; // "total", "cancelled", "inactive", etc.
      let count = 0;

      if (status === "total") {
        count = events.length;
      } else {
        count = events.filter(e => e.status?.toLowerCase() === status).length;
      }

      el.innerHTML = el.innerHTML.replace("##variable##", count);
    });
  } catch (error) {
    console.error("Error counting events:", error);
  }
}

async function countMailsAndMessages() {
  const elements = document.querySelectorAll(".contador");

  elements.forEach(async el => {
    const resource = el.dataset.recurso;

    try {
      const res = await fetch(`http://localhost:3000/${resource}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      el.innerHTML = el.innerHTML.replace("##variable##", data.length);
    } catch (err) {
      console.error(`Error fetching ${resource}:`, err);
      el.innerHTML = el.innerHTML.replace("##variable##", "⚠️");
    }
  });
}

// Ejecutar al cargar
countMailsAndMessages();
countEventsByStatus();
