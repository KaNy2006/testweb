// Chay 1 lan sau khi da import database/schema.sql: npm run seed:prebuilt
// Chay lai an toan: san pham da co se khong bi tao trung.
const db = require("../src/config/DBConnection");

const componentsToAdd = [
  { name: "Intel Core i5-12400F", category: "CPU", brand: "Intel", price: 3590000, image: "/uploads/cpu.svg", performance: 77, specs: { socket: "LGA1700", ram: "DDR4/DDR5", tdp: "65W" } },
  { name: "ASUS Dual RTX 4060 8GB", category: "GPU", brand: "ASUS", price: 8490000, image: "/uploads/gpu.svg", performance: 83, specs: { vram: "8GB", psu: "550W", length: "227mm" } },
  { name: "DeepCool CC560", category: "Case", brand: "DeepCool", price: 1390000, image: "/uploads/component.svg", performance: 75, specs: { form: "ATX", gpu_max_length: "370mm" } },
  { name: "DeepCool AK400", category: "Cooler", brand: "DeepCool", price: 790000, image: "/uploads/component.svg", performance: 78, specs: { sockets: "AM5, LGA1700", type: "Air cooler" } },
  { name: "Cooler Master Hyper 212", category: "Cooler", brand: "Cooler Master", price: 990000, image: "/uploads/component.svg", performance: 81, specs: { sockets: "AM5, LGA1700", type: "Air cooler" } },
];

const pcBuilds = [
  {
    name: "Gaming PC Pro", brand: "PC Upgrade Store", image: "/uploads/pc-pro.svg",
    purpose: "Gaming hieu nang cao", performance: 94, stock: 5,
    parts: ["AMD Ryzen 7 7800X3D", "Gigabyte B650 Aorus Elite AX", "Corsair Vengeance 32GB DDR5", "ASUS TUF RTX 4070 Super", "Samsung 990 Pro 1TB", "Cooler Master MWE Gold 750W", "DeepCool CC560", "DeepCool AK400"],
  },
  {
    name: "Gaming PC Standard", brand: "PC Upgrade Store", image: "/uploads/pc-standard.svg",
    purpose: "Gaming va giai tri", performance: 86, stock: 7,
    parts: ["Intel Core i5-14600K", "MSI B760 Tomahawk WiFi", "Corsair Vengeance 32GB DDR5", "ASUS Dual RTX 4060 8GB", "Samsung 990 Pro 1TB", "Cooler Master MWE Gold 750W", "DeepCool CC560", "Cooler Master Hyper 212"],
  },
  {
    name: "PC Hoc tap & Lam viec", brand: "PC Upgrade Store", image: "/uploads/pc-work.svg",
    purpose: "Hoc tap, lap trinh va lam viec", performance: 79, stock: 9,
    parts: ["Intel Core i5-12400F", "MSI B760 Tomahawk WiFi", "Corsair Vengeance 32GB DDR5", "ASUS Dual RTX 4060 8GB", "Samsung 990 Pro 1TB", "Cooler Master MWE Gold 750W", "DeepCool CC560", "DeepCool AK400"],
  },
];

async function findProduct(name) {
  const [rows] = await db.execute("SELECT id, name, category, price FROM products WHERE name = ? LIMIT 1", [name]);
  return rows[0];
}

async function addIfMissing(product) {
  if (await findProduct(product.name)) return;
  await db.execute(
    "INSERT INTO products (name, category, brand, price, stock, image, featured, performance, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [product.name, product.category, product.brand, product.price, product.stock ?? 15, product.image, 0, product.performance, JSON.stringify(product.specs)]
  );
  console.log("Da them:", product.name);
}

async function main() {
  for (const part of componentsToAdd) await addIfMissing(part);

  for (const build of pcBuilds) {
    const parts = [];
    for (const name of build.parts) {
      const part = await findProduct(name);
      if (!part) throw new Error("Chua co linh kien: " + name + ". Hay import database/schema.sql truoc.");
      parts.push({ productId: part.id, category: part.category, name: part.name, price: Number(part.price) });
    }
    const required = ["CPU", "Mainboard", "RAM", "GPU", "SSD", "PSU", "Case", "Cooler"];
    for (const category of required) {
      if (!parts.some((part) => part.category === category)) throw new Error(build.name + " thieu " + category);
    }
    const price = parts.reduce((sum, part) => sum + part.price, 0) + 500000;
    await addIfMissing({
      ...build, category: "PC Build sẵn", price,
      specs: { purpose: build.purpose, components: parts },
    });
  }
  console.log("Da san sang 3 bo PC build san. Mo /products?category=PC%20Build%20s%E1%BA%B5n");
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(() => db.end());
