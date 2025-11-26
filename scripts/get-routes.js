// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

// pulls all of routes
function getRoutes(dir, base = "") {
  return fs.readdirSync(dir).flatMap((file) => {
    const fullPath = path.join(dir, file);
    const routePath = path.join(base, file);

    if (fs.statSync(fullPath).isDirectory()) {
      return getRoutes(fullPath, routePath);
    }

    if (file === "page.tsx" || file === "page.js") {
      return ["/" + base.replace(/\\/g, "/")];
    }

    return [];
  });
}

const appDir = path.join(process.cwd(), "src/app");
const routes = getRoutes(appDir).map(
  (r) => r.replace(/\/page\.(tsx|js)$/, "") || "/"
);

console.log(routes);
