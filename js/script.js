"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initThemeSwitcher();
  initAccordion();
  initContactModal();
  initJoinForm();
});

function initClock() {
  const clock = document.querySelector("#current-date-time");
  if (!clock) return;

  const updateClock = () => {
    clock.textContent = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "medium"
    }).format(new Date());
  };

  updateClock();
  window.setInterval(updateClock, 1000);
}

function initThemeSwitcher() {
  const button = document.querySelector("#theme-switcher");
  if (!button) return;

  const themes = ["theme-ocean", "theme-purple", "theme-emerald"];
  let themeIndex = 0;

  button.addEventListener("click", () => {
    document.body.classList.remove(...themes);
    document.body.classList.add(themes[themeIndex]);
    button.textContent = `Change background (${themeIndex + 1}/${themes.length})`;
    themeIndex = (themeIndex + 1) % themes.length;
  });
}

function initAccordion() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("is-open", !isOpen);
    });
  });
}

function initContactModal() {
  const modal = document.querySelector("#contact-modal");
  const openButton = document.querySelector("#open-contact-modal");
  if (!modal || !openButton) return;

  const closeButton = modal.querySelector(".modal-close");
  const form = modal.querySelector("#contact-form");
  const status = modal.querySelector("#contact-status");

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    openButton.focus();
  };

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      status.textContent = "Please complete all fields correctly.";
      status.className = "form-status error";
      return;
    }
    status.textContent = "Thank you! Your message is ready for the AITU Futsal team.";
    status.className = "form-status success";
    form.reset();
    form.classList.remove("was-validated");
  });
}

function initJoinForm() {
  const form = document.querySelector("#join-form");
  if (!form) return;

  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    year: form.querySelector("#year"),
    message: form.querySelector("#message"),
    password: form.querySelector("#password"),
    confirmPassword: form.querySelector("#confirm-password")
  };
  const status = form.querySelector("#join-form-status");

  const setError = (field, message) => {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    const error = form.querySelector(`[data-error-for="${field.id}"]`);
    if (error) error.textContent = message;
  };

  const setValid = (field) => {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  };

  const validate = () => {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fields.name.value.trim().length < 2) {
      setError(fields.name, "Enter your full name (at least 2 characters).");
      valid = false;
    } else setValid(fields.name);

    if (!emailPattern.test(fields.email.value.trim())) {
      setError(fields.email, "Enter a valid email address, for example name@aitu.edu.kz.");
      valid = false;
    } else setValid(fields.email);

    if (!fields.year.value) {
      setError(fields.year, "Select your year of study.");
      valid = false;
    } else setValid(fields.year);

    if (!form.querySelector('input[name="position"]:checked')) {
      form.querySelector("#position-error").textContent = "Choose your preferred position.";
      form.querySelector("#position-error").classList.add("is-visible");
      valid = false;
    } else {
      form.querySelector("#position-error").classList.remove("is-visible");
    }

    if (fields.message.value.trim().length < 15) {
      setError(fields.message, "Write at least 15 characters about yourself.");
      valid = false;
    } else setValid(fields.message);

    if (fields.password.value.length < 8) {
      setError(fields.password, "Password must contain at least 8 characters.");
      valid = false;
    } else setValid(fields.password);

    if (!fields.confirmPassword.value || fields.confirmPassword.value !== fields.password.value) {
      setError(fields.confirmPassword, "Passwords must match.");
      valid = false;
    } else setValid(fields.confirmPassword);

    return valid;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) {
      status.textContent = "Please correct the highlighted fields.";
      status.className = "form-status error";
      form.querySelector(".is-invalid")?.focus();
      return;
    }
    status.textContent = "Application validated successfully!";
    status.className = "form-status success";
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      form.querySelectorAll(".is-valid, .is-invalid").forEach((field) => {
        field.classList.remove("is-valid", "is-invalid");
      });
      form.querySelector("#position-error").classList.remove("is-visible");
      status.textContent = "";
      status.className = "form-status";
    });
  });
}
