# PC Upgrade Store

Website ban linh kien va PC build san (Express + EJS + MySQL).

## Them 3 bo PC build san

Sau khi import `database/schema.sql` va cau hinh MySQL trong `.env`, chay:

```bash
npm run seed:prebuilt
npm start
```

Lenh `seed:prebuilt` them cac linh kien con thieu va 3 bo PC: Gaming PC Pro, Gaming PC Standard, PC Hoc tap & Lam viec. Chay lai khong tao trung san pham trung ten.

- Trang chu: hien thi 3 PC build san tu database.
- Danh sach: `/products?category=PC%20Build%20s%E1%BA%B5n`.
- Chi tiet: hien thi 8 linh kien cua tung bo.
- Gio hang: moi bo PC duoc mua nhu mot san pham thong thuong.

**Luu y:** Phan mo phong chi mo khoa sau khi mua du PC la tinh nang du kien, chua duoc trien khai trong scope nay.
