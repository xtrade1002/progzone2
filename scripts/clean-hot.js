import fs from "fs";
import path from "path";

const hotFile = path.resolve("./public/hot");

if (fs.existsSync(hotFile)) {
  fs.unlinkSync(hotFile);
  console.log("🔥 Laravel hot file törölve: public/hot");
} else {
  console.log("✅ Nincs hot file, mehet a Vite.");
}
