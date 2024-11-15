CREATE DATABASE fnbservice_management;

USE fnbservice_management;

SET NAMES utf8mb4;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE managers (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15),
    address VARCHAR(255),
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE branches (
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    manager_id INT,
    name VARCHAR(100),
    contact_phone VARCHAR(15),
    address VARCHAR(255),
    coordinates VARCHAR(100),
    logo_href VARCHAR(100),
    fnb_date_counter INT,
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
);

CREATE TABLE areas (
    area_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,  -- Tham chiếu đến chi nhánh
    name VARCHAR(255) NOT NULL,  -- Tên khu vực hoặc tầng
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

CREATE TABLE tables (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    area_id INT,  -- Tham chiếu đến khu vực
    table_name VARCHAR(50),  -- Tên của bàn
    qr_code VARCHAR(50) UNIQUE,
    is_available BIT,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (area_id) REFERENCES areas(area_id)
);


CREATE TABLE menus (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    menu_color VARCHAR(50),
    background_image_href VARCHAR(100),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE menu_items (
    menu_item_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_id INT,
    category_id INT,
    name VARCHAR(100),
    description TEXT,
    image_href VARCHAR(100),
    cost_price DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    is_available BIT,
    is_spicy BIT,
    has_vegetables BIT,
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT,
    order_date DATETIME,
    status VARCHAR(50),
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (table_id) REFERENCES tables(table_id)
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_item_id INT,
    quantity INT,
    note VARCHAR(500),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);

CREATE TABLE order_payments (
    order_payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payer_card_id VARCHAR(50),
    pay_date DATETIME,
    pay_content VARCHAR(500),
    send_amount DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(50),
    branch_id INT,
    account_id INT,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    branch_id INT,
    rating INT,
    comment TEXT,
    review_date DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE service_packages (
    service_package_id INT AUTO_INCREMENT PRIMARY KEY,
    day_amount INT,
    fee_amount DECIMAL(10, 2)
);

CREATE TABLE service_package_payment (
    service_package_payment_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    service_package_id INT,
    date_bought DATETIME,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (service_package_id) REFERENCES service_packages(service_package_id)
);

CREATE TABLE faqs (
    faq_id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500),
    answer VARCHAR(500),
    branch_id INT,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

CREATE TABLE menu_item_options (
    menu_item_option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(50),
    cost_price DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    menu_item_id INT,
    image_href VARCHAR(100),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);

CREATE TABLE order_item_options (
    order_item_option_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT,
    order_item_id INT,
    menu_item_option_id INT,
    FOREIGN KEY (order_item_id) REFERENCES order_items(order_item_id),
    FOREIGN KEY (menu_item_option_id) REFERENCES menu_item_options(menu_item_option_id)
);
