# PC Upgrade Store

Website ban linh kien va PC build san (Express + EJS + MySQL).

## Them 5 bo PC build san

Sau khi import `database/schema.sql` va cau hinh MySQL trong `.env`, chay:

```bash
npm run seed:prebuilt
npm start
```

Lenh `seed:prebuilt` them cac linh kien con thieu va 5 bo PC: Gaming PC Pro, Gaming PC Standard, PC Hoc tap & Lam viec, Gaming PC Budget 1080p, Gaming PC Ultimate 9950X3D RTX 5090. Chay lai khong tao trung san pham trung ten.

- Trang chu: hien thi 5 PC build san tu database.
- Danh sach: `/products?category=PC%20Build%20s%E1%BA%B5n`.
- Chi tiet: hien thi 8 linh kien cua tung bo.
- Gio hang: moi bo PC duoc mua nhu mot san pham thong thuong.

**Luu y:** Phan mo phong chi mo khoa sau khi mua du PC la tinh nang du kien, chua duoc trien khai trong scope nay.

## Hai phan khuc moi

- **Gaming PC Budget 1080p**: Ryzen 5 5600, RX 6600 8GB, RAM 16GB DDR4 (2x8GB), main B550M, SSD 500GB, nguon 550W, case Micro-ATX, tan nhiet AM4. Muc tieu 10-15 trieu; phu hop gaming 1080p medium, FPS tuy game.
- **Gaming PC Ultimate 9950X3D RTX 5090**: Ryzen 9 9950X3D, RTX 5090 32GB, RAM DDR5 64GB (2 thanh 32GB), main X870E, SSD 4TB, nguon 1200W, case ATX, AIO 360mm.

Gia linh kien trong seed la **gia minh hoa de demo**, khong phai bao gia thi truong thoi gian thuc. Hai bo moi co du 8 nhom linh kien. Chay lai `npm run seed:prebuilt` sau `git pull` de bo sung vao MySQL hien co.
