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
        name: name,
        email: email,
        message: message
      })
    });

    const data = await response.json();

    alert(data.message);

    form.reset();

  } catch (error) {

    alert("Failed to send message");
    console.error(error);

  }

});