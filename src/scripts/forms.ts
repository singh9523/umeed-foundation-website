/**
 * Client-side validation + submission for enquiry forms.
 * Sends to Web3Forms (https://web3forms.com), which emails the submission
 * to the inbox linked to the access key. No data is stored on this website.
 */
const ENDPOINT = 'https://api.web3forms.com/submit';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s-]{10,16}$/;

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function errorFor(field: Field) {
  return field.closest('.field')?.querySelector<HTMLElement>('.error') ?? null;
}

function validateField(field: Field): string {
  const value = field.value.trim();
  if (field instanceof HTMLInputElement && field.type === 'checkbox') {
    return field.required && !field.checked ? 'Please tick this box to continue.' : '';
  }
  if (field.required && !value) return 'This field is required.';
  if (value && field.type === 'email' && !EMAIL_RE.test(value)) return 'Please enter a valid email address.';
  if (value && field.hasAttribute('data-phone') && !PHONE_RE.test(value)) return 'Please enter a valid phone number (10 digits or more).';
  return '';
}

function showError(field: Field, message: string) {
  const el = errorFor(field);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (el) {
    el.textContent = message;
    if (el.id) field.setAttribute('aria-describedby', el.id);
  }
}

function setStatus(form: HTMLFormElement, kind: 'ok' | 'err', html: string) {
  const status = form.querySelector<HTMLElement>('.status');
  if (status) status.innerHTML = `<div class="notice notice--${kind}">${html}</div>`;
}

export function initEnquiryForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-enquiry]').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';
    const fields = () =>
      Array.from(form.querySelectorAll<Field>('input:not([type=hidden]):not([name=botcheck]), textarea, select'));

    // Re-check a field while the visitor corrects it (not on blur: a disappearing
    // error message on blur shifts the layout and can make the submit click miss).
    fields().forEach((f) => {
      const recheck = () => { if (f.getAttribute('aria-invalid') === 'true') showError(f, validateField(f)); };
      f.addEventListener('input', recheck);
      f.addEventListener('change', recheck);
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      let firstInvalid: Field | null = null;
      for (const f of fields()) {
        const msg = validateField(f);
        showError(f, msg);
        if (msg && !firstInvalid) firstInvalid = f;
      }
      if (firstInvalid) { firstInvalid.focus(); return; }

      const data = new FormData(form);
      if (data.get('botcheck')) return; // spam bot
      const payload: Record<string, string> = {};
      data.forEach((value, key) => {
        const v = String(value).trim();
        payload[key] = payload[key] ? `${payload[key]}, ${v}` : v; // join multi-select checkboxes
      });
      if (!payload.access_key) return;
      if (payload.name) payload.replyto = payload.email;

      const button = form.querySelector<HTMLButtonElement>('button[type=submit]');
      const label = button?.querySelector<HTMLElement>('[data-label]');
      const original = label?.textContent ?? '';
      if (button) button.disabled = true;
      if (label) label.textContent = 'Sending…';

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
        form.reset();
        setStatus(form, 'ok', '<p><strong>Thank you!</strong> Your message has been sent. We will get back to you soon.</p>');
      } catch (err) {
        console.error('Form submission failed:', err);
        setStatus(form, 'err', '<p><strong>Sorry, your message could not be sent.</strong> Please try again in a moment, or contact us on Instagram.</p>');
      } finally {
        if (button) button.disabled = false;
        if (label) label.textContent = original;
      }
    });
  });
}
