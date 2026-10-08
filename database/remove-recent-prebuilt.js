// Chi xoa hai bo PC them gan day; khong xoa linh kien roi.
const db = require("../src/config/DBConnection");
async function main() {
  const names = ["Gaming PC Budget 1080p", "Gaming PC Ultimate 9950X3D RTX 5090"];
  const [result] = await db.execute(
    "DELETE FROM products WHERE category = ? AND name IN (?, ?)",
    ["PC Build sẵn", ...names]
  );
  console.log("Da xoa " + result.affectedRows + " bo PC moi. Giu nguyen linh kien va lich su don hang.");
}
main().catch(err => { console.error(err); process.exitCode = 1; }).finally(() => db.end());
