# PC Upgrade Store

Website bán linh kiện và PC build sẵn bằng Express, EJS và MySQL.

## Chạy trong Codespaces

Sau khi đã cấu hình MySQL và import `database/schema.sql`:

```bash
git pull origin main
npm run cleanup:prebuilt
npm run seed:prebuilt
npm start
```

- `cleanup:prebuilt` chỉ xóa 2 **bộ PC build sẵn** được thêm gần đây: `Gaming PC Budget 1080p` và `Gaming PC Ultimate 9950X3D RTX 5090`. Không xóa linh kiện rời hay lịch sử đơn hàng.
- `seed:prebuilt` bổ sung 3 bộ PC gốc nếu chưa có: Gaming PC Pro, Gaming PC Standard, PC Học tập & Làm việc. Chạy lại không tạo trùng tên.
- Trang chủ hiển thị 3 bộ PC. Mỗi bộ có trang chi tiết và được thêm vào giỏ như một sản phẩm.

## Quản trị

Đăng nhập tài khoản quản trị rồi mở `/admin`:
- Dashboard: thống kê từ database và đơn gần đây.
- `/admin/products`: thêm, tìm kiếm, xem, sửa, xóa sản phẩm (linh kiện và PC build sẵn).
- `/admin/orders`: xem và cập nhật trạng thái đơn hàng.

Chỉ tài khoản admin được truy cập các đường dẫn này. Chức năng mở khóa mô phỏng sau khi mua đủ PC chưa được triển khai trong scope này.
