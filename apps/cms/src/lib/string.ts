export function slugify(val: string, connector = "-") {
  return val
    .toLowerCase()
    .replace(/ +/g, connector)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(new RegExp(`[^a-z0-9${connector}]`, "g"), "")
    .replace(new RegExp(`${connector}+`, "g"), connector)
    .replace(new RegExp(`^${connector}|${connector}$`, "g"), "")
}
