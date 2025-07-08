// Loads subscriptions from the server, displays them in the table, and allows deletion with confirmation.

const tableBody = document.getElementById("subscriptions-table-body");

async function loadSubscriptions() {
  try {
    const res = await fetch("http://localhost:3000/subscriptions");
    if (!res.ok) throw new Error("Error fetching subscriptions");
    const data = await res.json();

    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:#888;">No subscriptions found.</td></tr>`;
      return;
    }

    data.forEach(({ id, email }) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${id}</td>
        <td>${email}</td>
        <td><button class="delete-btn" data-id="${id}">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    tableBody.innerHTML = `<tr><td colspan="3" style="color:red; text-align:center;">Error loading subscriptions.</td></tr>`;
  }
}

tableBody.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.getAttribute("data-id");
    if (!id) return;

    const confirmDelete = confirm(`Are you sure you want to delete the subscription with ID ${id}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/subscriptions/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Error deleting subscription");
      alert("Subscription deleted successfully");
      loadSubscriptions();
    } catch (error) {
      console.error(error);
      alert("Could not delete the subscription. Check the console.");
    }
  }
});

// Load subscriptions on page load
loadSubscriptions();

let user = JSON.parse(localStorage.getItem("user"));
let logOut = document.getElementById("logOut");


logOut.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../../../index.html";
  });

if (!user) {
    window.location.href = "../login.html";
} else {
    welcome.innerHTML = `<p>Welcome back, ${user.name}!</p>`;
}

