# ECOM_Cafe_Project

## Cài đặt
1. **Clone repository**
```
git clone https://github.com/nhhpbc7a1/ECOM_Cafe_Project 
```
2. **Cài đặt database**
- Start mysql trong XamPP
- Mở "new query" với server của thầy Khoa, trong Navicat 

![alt text](/public/images/readme/image.png)

- copypaste code trong file "create_database.sql" vào rồi chạy
- copypaste code trong file "insert_data.sql" vào rồi chạy

![alt text](/public/images/readme/image-1.png)

3. **Install những node modules cần dùng**
```
npm i
```

## Các site đã tạo


- http://localhost:3000/

- http://localhost:3000/manager/login

- http://localhost:3000/manager/signup

- http://localhost:3000/manager

    - http://localhost:3000/manager/category

    - http://localhost:3000/manager/menu_item
    - http://localhost:3000/manager/topping
    - http://localhost:3000/manager/table
    - http://localhost:3000/manager/order
    - http://localhost:3000/manager/employee
    - http://localhost:3000/manager/branch_info
    
- http://localhost:3000/customer/

    - http://localhost:3000/customer/menu

    - http://localhost:3000/customer/cart
    - http://localhost:3000/customer/confirm_payment

- http://localhost:3000/casher/

    - http://localhost:3000/casher/table_manage

- http://localhost:3000/admin/

    - http://localhost:3000/admin/manager

    - http://localhost:3000/admin/service_package
    - http://localhost:3000/admin/service_package_payment
    - http://localhost:3000/admin/hub_info


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


## UPDATE DATABASE

- Chạy npm start lên, nếu lỗi thì:
    -  Chạy xampp lên
    -  Trong folder ultis, paste vào new query của navicat
    -  thực thi lần lượt các file => delete_all_table => create_dabase => insert_data

    ![alt text](/public/images/readme/2111image.png)

    ![alt text](/public/images/readme/2111image-1.png)

    ![alt text](/public/images/readme/2111image-2.png)

    -  thực thi lần lượt các file => delete_all_table => create_dabase => insert_data

