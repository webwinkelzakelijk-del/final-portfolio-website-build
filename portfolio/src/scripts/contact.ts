// Contact form → FormSubmit AJAX endpoint (same inbox as the previous site),
// plus the copy-email button.

export function initContact() {
  const copyBtn = document.querySelector<HTMLButtonElement>("[data-copy-email]");
  const copyStatus = document.querySelector<HTMLElement>("[data-copy-status]");
  let copyTimer = 0;
  copyBtn?.addEventListener("click", async () => {
    if (!copyStatus) return;
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.copyEmail!);
      copyStatus.textContent = copyStatus.dataset.ok!;
    } catch {
      copyStatus.textContent = copyStatus.dataset.fail!;
    }
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => (copyStatus.textContent = ""), 3500);
  });

  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;
  const button = form.querySelector<HTMLButtonElement>("[data-contact-submit]")!;
  const label = form.querySelector<HTMLElement>("[data-contact-label]")!;
  const status = form.querySelector<HTMLElement>("[data-contact-status]")!;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    status.className = "form-status";
    if (String(data.get("_honey") ?? "")) {
      form.reset();
      status.textContent = status.dataset.success!;
      return;
    }
    const name = String(data.get("name") ?? "").trim();
    const project = String(data.get("project") ?? "");
    const email = status.dataset.email!;
    button.disabled = true;
    label.textContent = button.dataset.sending!;
    status.textContent = "";
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email: String(data.get("email") ?? "").trim(),
          project,
          message: String(data.get("message") ?? "").trim(),
          _subject: `${form.dataset.subject} · ${project} · ${name}`,
          _template: "table",
          _url: window.location.href,
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean | string } | null;
      if (!response.ok || result?.success === false || result?.success === "false") throw new Error();
      form.reset();
      label.textContent = button.dataset.sent!;
      status.classList.add("is-success");
      status.textContent = status.dataset.success!;
      window.setTimeout(() => (label.textContent = button.dataset.label!), 5000);
    } catch {
      label.textContent = button.dataset.label!;
      status.classList.add("is-error");
      status.innerHTML = "";
      status.append(`${status.dataset.error} `);
      const link = document.createElement("a");
      link.href = `mailto:${email}`;
      link.textContent = email;
      status.append(link);
    } finally {
      button.disabled = false;
    }
  });
}
