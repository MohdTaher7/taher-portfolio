// Turns the single-file build into page content for a Claude artifact:
// the artifact host supplies <!doctype>/<html>/<head>/<body>, so we keep only
// the title, metas, styles, scripts and the root element.
import { readFileSync, writeFileSync } from "node:fs";
const html = readFileSync("dist-artifact/index.html", "utf8");
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const keepHead = head
  .replace(/<meta charset[^>]*>/i, "")
  .replace(/<meta name="viewport"[^>]*>/i, "");
// Move <title> first so the artifact scanner finds it in the first 8KB.
const title = keepHead.match(/<title>[\s\S]*?<\/title>/)[0];
const rest = keepHead.replace(title, "");
// Put module script after root (it is deferred anyway, this is just tidy).
writeFileSync("dist-artifact/portfolio.html", `${title}\n${rest}\n${body}\n`);
console.log("wrote dist-artifact/portfolio.html");
