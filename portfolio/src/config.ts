// Site-wide settings. Nothing in here is secret: everything ends up in public HTML.

export const SITE_URL = "https://www.kevinrebuilds.com";
export const BRAND = "Kevin Rebuilds";
export const CONTACT_EMAIL = "webwinkelzakelijk@gmail.com";

/**
 * Contact form delivery (FormSubmit, the service the previous site already used).
 *
 * FormSubmit accepts either the inbox address or a random alias that FormSubmit
 * gives you after activation (recommended, keeps the address out of the HTML).
 * Set it at build time:   PUBLIC_FORMSUBMIT_ID=<alias or address> npm run build
 * Without the variable the existing inbox address is used.
 * Set PUBLIC_FORMSUBMIT_ID="" (empty) to switch sending off: the form then shows
 * a clear "use e-mail instead" message and never pretends to send.
 */
const envId = import.meta.env.PUBLIC_FORMSUBMIT_ID as string | undefined;
export const FORMSUBMIT_ID = envId === undefined ? CONTACT_EMAIL : envId.trim();
export const FORM_AJAX_ENDPOINT = FORMSUBMIT_ID ? `https://formsubmit.co/ajax/${FORMSUBMIT_ID}` : "";
export const FORM_POST_ENDPOINT = FORMSUBMIT_ID ? `https://formsubmit.co/${FORMSUBMIT_ID}` : "";
