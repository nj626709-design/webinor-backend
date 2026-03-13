const form = document.querySelector("#contact-form");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  try {

    const response = await fetch("https://webinor-backend-production.up.railway.app/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    });

    if (response.ok) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Failed to send message");
    }

  } catch (error) {
    alert("❌ Server error. Try again later.");
  }

});