USE fnbservice_management;
SET FOREIGN_KEY_CHECKS = 0; 
-- Bảng roles
INSERT INTO roles (role_name) 
VALUES ('Admin'), ('Manager'), ('Employee'), ('Chef'), ('Waiter');

-- Bảng accounts
INSERT INTO accounts (email, password, role_id) 
VALUES ('admin@gmail.com', '$2a$12$a5Bg0mRPHXYNVusEILsd7ugXAm0UwBO2BE/49OfB/v3NE4B3FihB.', 1), 
       ('manager1@example.com', 'password_hash', 2),
       ('employee1@example.com', 'password_hash', 3),
       ('chef@example.com', 'password_hash', 4),
       ('waiter@example.com', 'password_hash', 5);

-- Bảng managers
INSERT INTO managers (name, phone, address, account_id)
VALUES ('John Doe', '123456789', '123 Main St', 2),
       ('Jane Smith', '987654321', '456 Oak St', 3),
       ('Tom Johnson', '456123789', '789 Pine St', 4),
       ('Linda Brown', '321654987', '101 Elm St', 5),
       ('Jack Wilson', '654987321', '202 Maple St', 6);
       
-- Bảng branches
INSERT INTO branches (manager_id, name, contact_phone, address, coordinates, logo_href, fnb_date_counter)
VALUES (1, 'Main Branch', '123456789', '123 Main St', '10.8231, 106.6297', 'logo1.png', 100),
       (2, 'Second Branch', '987654321', '456 Oak St', '10.7321, 106.6807', 'logo2.png', 200),
       (3, 'Third Branch', '456123789', '789 Pine St', '10.7501, 106.6300', 'logo3.png', 300),
       (4, 'Fourth Branch', '321654987', '101 Elm St', '10.8001, 106.7000', 'logo4.png', 400),
       (5, 'Fifth Branch', '654987321', '202 Maple St', '10.8101, 106.7200', 'logo5.png', 500);

-- Bảng areas
INSERT INTO areas (branch_id, name) 
VALUES (1, 'Tầng 1'), 
       (1, 'Tầng 2'), 
       (2, 'Tầng 3'), 
       (3, 'Khu vực A'), 
       (4, 'Khu vực B');

-- Bảng tables
INSERT INTO tables (branch_id, area_id, table_name, qr_code, is_available) 
VALUES (1, 1, 'Table 1', 'QR_001', 1), 
       (1, 2, 'Table 2', 'QR_002', 0), 
       (2, 3, 'Table 3', 'QR_003', 1), 
       (3, 4, 'Table 4', 'QR_004', 1), 
       (4, 5, 'Table 5', 'QR_005', 0);

-- Bảng menus
INSERT INTO menus (branch_id, menu_color, background_image_href)
VALUES (1, 'Blue', 'menu_background1.png'),
       (2, 'Green', 'menu_background2.png'),
       (3, 'Red', 'menu_background3.png'),
       (4, 'Yellow', 'menu_background4.png'),
       (5, 'Purple', 'menu_background5.png');

-- Bảng categories
INSERT INTO categories (category_name)
VALUES ('Drinks'), ('Food'), ('Desserts'), ('Appetizers'), ('Specials');

-- Bảng menu_items
INSERT INTO menu_items (menu_id, category_id, name, description, image_href, cost_price, sale_price, is_available, is_spicy, has_vegetables) 
VALUES (1, 1, 'Coffee', 'Hot coffee', 'coffee.png', 10.00, 15.00, 1, 0, 0),
       (2, 2, 'Burger', 'Beef burger', 'burger.png', 20.00, 30.00, 1, 1, 1),
       (3, 3, 'Ice Cream', 'Vanilla ice cream', 'icecream.png', 5.00, 7.50, 1, 0, 0),
       (4, 4, 'Spring Rolls', 'Vietnamese spring rolls', 'springrolls.png', 8.00, 12.00, 1, 0, 1),
       (5, 5, 'Special Salad', 'Mixed greens with dressing', 'salad.png', 6.00, 10.00, 1, 0, 1);

-- Bảng orders
INSERT INTO orders (table_id, order_date, status, total_amount)
VALUES (1, NOW(), 'Completed', 45.00),
       (2, NOW(), 'Pending', 30.00),
       (3, NOW(), 'In Progress', 60.00),
       (4, NOW(), 'Completed', 50.00),
       (5, NOW(), 'Cancelled', 0.00);

-- Bảng order_items
INSERT INTO order_items (order_id, menu_item_id, quantity, note)
VALUES (1, 1, 2, 'Less sugar'), 
       (2, 2, 1, 'Extra cheese'), 
       (3, 3, 3, 'No topping'), 
       (4, 4, 1, 'Spicy'), 
       (5, 5, 2, 'No dressing');

-- Bảng order_payments
INSERT INTO order_payments (order_id, payer_card_id, pay_date, pay_content, send_amount)
VALUES (1, 'CARD123', NOW(), 'Paid with card', 45.00),
       (2, 'CARD456', NOW(), 'Paid with cash', 30.00),
       (3, 'CARD789', NOW(), 'Paid with card', 60.00),
       (4, 'CARD101', NOW(), 'Paid with cash', 50.00),
       (5, 'CARD202', NOW(), 'Not paid', 0.00);

-- Bảng employees
INSERT INTO employees (employee_name, branch_id, account_id)
VALUES ('Alice', 1, 3),
       ('Bob', 2, 4),
       ('Charlie', 3, 5),
       ('David', 4, 6),
       ('Eve', 5, 7);

-- Bảng reviews
INSERT INTO reviews (order_id, branch_id, rating, comment, review_date)
VALUES (1, 1, 5, 'Great service!', NOW()),
       (2, 2, 4, 'Good food.', NOW()),
       (3, 3, 3, 'Average experience.', NOW()),
       (4, 4, 2, 'Not satisfied.', NOW()),
       (5, 5, 1, 'Poor service.', NOW());

-- Bảng service_packages
INSERT INTO service_packages (day_amount, fee_amount)
VALUES (30, 99.99), 
       (60, 189.99), 
       (90, 279.99), 
       (120, 369.99), 
       (150, 459.99);

-- Bảng service_package_payment
INSERT INTO service_package_payment (branch_id, service_package_id, date_bought)
VALUES (1, 1, NOW()),
       (2, 2, NOW()),
       (3, 3, NOW()),
       (4, 4, NOW()),
       (5, 5, NOW());

-- Bảng faqs
INSERT INTO faqs (question, answer, branch_id)
VALUES ('What are the opening hours?', '9 AM to 10 PM', 1),
       ('Is there parking available?', 'Yes, free parking.', 2),
       ('Do you offer vegetarian options?', 'Yes, several options available.', 3),
       ('Do you accept credit cards?', 'Yes, all major cards accepted.', 4),
       ('Is Wi-Fi available?', 'Yes, free Wi-Fi for customers.', 5);

-- Bảng toppings
INSERT INTO toppings (topping_name, cost_price, sale_price, image_href)
VALUES ('Extra Shot', 1.00, 1.50, 'extra_shot.png'),
       ('Large Size', 1.50, 2.00, 'large_size.png'),
       ('Extra Cheese', 0.50, 1.00, 'extra_cheese.png'),
       ('Add Avocado', 0.80, 1.20, 'avocado.png'),
       ('Double Topping', 1.20, 1.80, 'double_topping.png');

-- Bảng order_item_toppings
INSERT INTO order_item_toppings (quantity, order_item_id, topping_id)
VALUES (1, 1, 1),
       (2, 2, 2),
       (1, 3, 3),
       (1, 4, 4),
       (2, 5, 5);

INSERT INTO menu_item_toppings (quantity, menu_item_id, topping_id)
VALUES (1, 1, 1),
       (2, 2, 2),
       (1, 3, 3),
       (1, 4, 4),
       (2, 5, 5);

SET FOREIGN_KEY_CHECKS = 1;  -- Bật lại kiểm tra khóa ngoại