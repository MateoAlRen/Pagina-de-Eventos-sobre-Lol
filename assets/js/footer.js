// Captures form submission, validates the email, and sends it to the JSON server via POST to save the subscription.

const form = document.getElementById("form-suscripcion");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const emailInput = document.getElementById("email-footer");
  const email = emailInput.value.trim();

  const newSubscription = { email: email };

  try {
    const response = await fetch("http://localhost:3000/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSubscription)
    });

    if (!response.ok) throw new Error("Error saving subscription");

    alert("Thank you for subscribing!");
    emailInput.value = "";
  } catch (error) {
    console.error("Error saving subscription:", error);
    alert("There was an error saving your email.");
  }
});
