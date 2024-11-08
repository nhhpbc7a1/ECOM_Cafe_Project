# ECOM_Cafe_Project

## Cài đặt
1. **Clone repository**
```
git clone https://github.com/nhhpbc7a1/ECOM_Cafe_Project 
```
2. **Cài đặt database**
- Start mysql trong XamPP
- Mở "new query" với server của thầy Khoa, trong Navicat 
![alt text](image.png)
- copypaste code trong file "create_database.sql" vào rồi chạy
- copypaste code trong file "insert_data.sql" vào rồi chạy
![alt text](image-1.png)
3. **Install những node modules cần dùng**
```
npm i
```

## Các site đã tạo

```
http://localhost:3000/
```
=> nhấn được Đăng ký, Đăng Nhập
```
http://localhost:3000/manager
```
=> Dashboard, Navbar ứng dụng layout môn web, nhấn chuyển đc sang quản lý menu, nhấn chuyển lại.
```
http://localhost:3000/manager/menu_item
```
=> Load được dữ liệu từ database



## Cấu trúc thư mục
- admin 
    - css 
    - js
    - images
    - html

- customer (thực khách)
    - css 
    - js
    - images
    - html

- manager (chủ / người quản lý cửa hàng)
    - css 
    - js
    - images
    - html

- casher (thu ngân / nhân viên trực quầy, xác nhận đơn và yêu cầu bếp làm món) 
    - css 
    - js
    - images
    - html
    
- shared (chứa các thành phần dùng chung)
    - css 
    - js
    - images
    - html

- Test git rebase
