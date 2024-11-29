-- Chuyển sang cơ sở dữ liệu fnbservice_management
USE fnbservice_management;

-- Xóa các bảng con trước để tránh lỗi khóa ngoại
SET FOREIGN_KEY_CHECKS = 0;  -- Tạm thời vô hiệu hóa kiểm tra khóa ngoại

DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS service_package_payment;
DROP TABLE IF EXISTS service_packages;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS employee_activities;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS order_status_history;
DROP TABLE IF EXISTS order_payments;
DROP TABLE IF EXISTS order_item_toppings;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_item_toppings;
DROP TABLE IF EXISTS toppings;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS tables;
DROP TABLE IF EXISTS areas;
DROP TABLE IF EXISTS branches;
DROP TABLE IF EXISTS managers;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS roles;

SET FOREIGN_KEY_CHECKS = 1;  -- Kích hoạt lại kiểm tra khóa ngoại

DROP DATABASE IF EXISTS fnbservice_management;