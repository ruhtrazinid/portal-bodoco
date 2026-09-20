import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("src/index.html", "dist/index.html");
await cp("src/noticia.html", "dist/noticia.html");
await cp("src/styles.css", "dist/styles.css");
await cp("src/app.js", "dist/app.js");
await cp("src/assets", "dist/assets", { recursive: true });

console.log("Portal Bodocó pronto em dist/");