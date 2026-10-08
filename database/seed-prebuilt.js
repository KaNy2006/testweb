// Chay 1 lan sau khi da import database/schema.sql: npm run seed:prebuilt
// Chay lai an toan: san pham da co se khong bi tao trung.
const db = require("../src/config/DBConnection");

const componentsToAdd = [
  { name: "Intel Core i5-12400F", category: "CPU", brand: "Intel", price: 3590000, image: "/uploads/cpu.svg", performance: 77, specs: { socket: "LGA1700", ram: "DDR4/DDR5", tdp: "65W" } },
  { name: "ASUS Dual RTX 4060 8GB", category: "GPU", brand: "ASUS", price: 8490000, image: "/uploads/gpu.svg", performance: 83, specs: { vram: "8GB", psu: "550W", length: "227mm" } },
  { name: "DeepCool CC560", category: "Case", brand: "DeepCool", price: 1390000, image: "/uploads/component.svg", performance: 75, specs: { form: "ATX", gpu_max_length: "370mm" } },
  { name: "DeepCool AK400", category: "Cooler", brand: "DeepCool", price: 790000, image: "/uploads/component.svg", performance: 78, specs: { sockets: "AM5, LGA1700", type: "Air cooler" } },
  { name: "Cooler Master Hyper 212", category: "Cooler", brand: "Cooler Master", price: 990000, image: "/uploads/component.svg", performance: 81, specs: { sockets: "AM5, LGA1700", type: "Air cooler" } },

  // Cau hinh pho thong: AM4 + DDR4 + RX 6600.
  { name: "AMD Ryzen 5 5600", category: "CPU", brand: "AMD", price: 2390000, image: "/uploads/cpu.svg", performance: 76, specs: { socket: "AM4", cores: "6 nhan 12 luong", ram: "DDR4", tdp: "65W" } },
  { name: "MSI B550M PRO-VDH", category: "Mainboard", brand: "MSI", price: 1790000, image: "/uploads/mainboard.svg", performance: 73, specs: { socket: "AM4", ram: "DDR4", form: "Micro-ATX", chipset: "B550" } },
  { name: "Kingston Fury Beast 16GB DDR4 3200", category: "RAM", brand: "Kingston", price: 890000, image: "/uploads/ram.svg", performance: 72, specs: { type: "DDR4", bus: "3200MHz", capacity: "16GB", kit: "2x8GB" } },
  { name: "Sapphire Pulse RX 6600 8GB", category: "GPU", brand: "Sapphire", price: 4990000, image: "/uploads/gpu.svg", performance: 78, specs: { vram: "8GB GDDR6", psu: "500W", length: "193mm" } },
  { name: "Kingston NV3 500GB", category: "SSD", brand: "Kingston", price: 890000, image: "/uploads/ssd.svg", performance: 72, specs: { type: "NVMe", capacity: "500GB", pcie: "4.0" } },
  { name: "DeepCool PF550 550W", category: "PSU", brand: "DeepCool", price: 1090000, image: "/uploads/psu.svg", performance: 72, specs: { power: "550W", rating: "80 Plus" } },
  { name: "Xigmatek Gaming X Mini", category: "Case", brand: "Xigmatek", price: 790000, image: "/uploads/component.svg", performance: 70, specs: { form: "Micro-ATX", gpu_max_length: "300mm" } },
  { name: "DeepCool AG200 AM4", category: "Cooler", brand: "DeepCool", price: 390000, image: "/uploads/component.svg", performance: 70, specs: { sockets: "AM4", type: "Air cooler" } },

  // Cau hinh flagship: AM5 + DDR5 2x32GB + RTX 5090.
  { name: "AMD Ryzen 9 9950X3D", category: "CPU", brand: "AMD", price: 23990000, image: "/uploads/cpu.svg", performance: 99, specs: { socket: "AM5", cores: "16 nhan 32 luong", ram: "DDR5", tdp: "170W" } },
  { name: "ASUS ROG Crosshair X870E Hero", category: "Mainboard", brand: "ASUS", price: 12990000, image: "/uploads/mainboard.svg", performance: 98, specs: { socket: "AM5", ram: "DDR5", form: "ATX", chipset: "X870E" } },
  { name: "Corsair Vengeance 64GB DDR5 6000 (2x32GB)", category: "RAM", brand: "Corsair", price: 9490000, image: "/uploads/ram.svg", performance: 97, specs: { type: "DDR5", bus: "6000MHz", capacity: "64GB", kit: "2x32GB" } },
  { name: "ASUS ROG Astral RTX 5090 32GB", category: "GPU", brand: "ASUS", price: 79990000, image: "/uploads/gpu.svg", performance: 100, specs: { vram: "32GB GDDR7", psu: "1000W", length: "358mm" } },
  { name: "Samsung 990 Pro 4TB", category: "SSD", brand: "Samsung", price: 8990000, image: "/uploads/ssd.svg", performance: 98, specs: { type: "NVMe", capacity: "4TB", pcie: "4.0" } },
  { name: "Corsair HX1200i 1200W", category: "PSU", brand: "Corsair", price: 6990000, image: "/uploads/psu.svg", performance: 97, specs: { power: "1200W", rating: "80 Plus Platinum", modular: "Full modular" } },
  { name: "Corsair 5000D Airflow", category: "Case", brand: "Corsair", price: 5490000, image: "/uploads/component.svg", performance: 95, specs: { form: "ATX", gpu_max_length: "400mm", radiator: "360mm" } },
  { name: "Arctic Liquid Freezer III 360", category: "Cooler", brand: "Arctic", price: 4990000, image: "/uploads/component.svg", performance: 98, specs: { sockets: "AM5", type: "AIO 360mm" } },
];

const pcBuilds = [

  {
    name: "Gaming PC Budget 1080p", brand: "PC Upgrade Store", image: "/uploads/pc-budget.svg",
    purpose: "Gaming 1080p thiet lap trung binh, FPS phu thuoc tung game", performance: 76, stock: 10,
    tier: "Tiet kiem", minBudget: 10000000, maxBudget: 15000000,
    parts: ["AMD Ryzen 5 5600", "MSI B550M PRO-VDH", "Kingston Fury Beast 16GB DDR4 3200", "Sapphire Pulse RX 6600 8GB", "Kingston NV3 500GB", "DeepCool PF550 550W", "Xigmatek Gaming X Mini", "DeepCool AG200 AM4"],
  },
  {
    name: "Gaming PC Ultimate 9950X3D RTX 5090", brand: "PC Upgrade Store", image: "/uploads/pc-ultimate.svg",
    purpose: "Flagship gaming 4K, render va sang tao noi dung", performance: 100, stock: 2,
    tier: "Ultimate",
    parts: ["AMD Ryzen 9 9950X3D", "ASUS ROG Crosshair X870E Hero", "Corsair Vengeance 64GB DDR5 6000 (2x32GB)", "ASUS ROG Astral RTX 5090 32GB", "Samsung 990 Pro 4TB", "Corsair HX1200i 1200W", "Corsair 5000D Airflow", "Arctic Liquid Freezer III 360"],
  },
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
    if (build.minBudget && price < build.minBudget) throw new Error(build.name + " duoi muc gia toi thieu");
    if (build.maxBudget && price > build.maxBudget) throw new Error(build.name + " vuot ngan sach: " + price);
    await addIfMissing({
      ...build, category: "PC Build sẵn", price,
      specs: { purpose: build.purpose, tier: build.tier || "Tieu chuan", components: parts, price_note: "Gia minh hoa trong database, khong phai bao gia thi truong thoi gian thuc" },
    });
  }
  console.log("Da san sang 5 bo PC build san. Mo /products?category=PC%20Build%20s%E1%BA%B5n");
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(() => db.end());
