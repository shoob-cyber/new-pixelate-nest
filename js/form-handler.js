// Check for selected plan on page load
window.addEventListener("DOMContentLoaded", () => {
  const selectedPlan = localStorage.getItem("selectedPlan");
  if (selectedPlan) {
    document.getElementById("selected-plan").value = selectedPlan;
    // Optional: Update subject field with plan name
    document.getElementById(
      "Enter-your-subject"
    ).value = `Inquiry for ${selectedPlan}`;
    localStorage.removeItem("selectedPlan"); // Clear after setting
  }
});

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('input[type="submit"]');
  submitButton.value = "Sending...";
  submitButton.disabled = true;

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    email: formData.get("Email-Address"),
    phone: formData.get("Phone"),
    subject: formData.get("Enter-your-subject"),
    projectType: formData.get("field"),
    message: formData.get("Message"),
    selectedPlan: formData.get("selected-plan"),
  };

  try {
    const response = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      // Show success message
      document.querySelector(".form-success-message").style.display = "block";
      form.reset();
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Error:", error);
    document.querySelector(".form-error-message").style.display = "block";
  } finally {
    submitButton.value = "Submit";
    submitButton.disabled = false;
  }

  return false;

  document.querySelector(".form-error-message").style.display = "block";
}
