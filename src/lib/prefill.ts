/** Tiny cross-component channel: engagement model → contact form. */
const KEY = "zorga:interest";
export function setInterest(v: string) {
  try { sessionStorage.setItem(KEY, v); } catch {}
  window.dispatchEvent(new CustomEvent("zorga:interest", { detail: v }));
}
export function getInterest(): string {
  try { return sessionStorage.getItem(KEY) ?? ""; } catch { return ""; }
}
