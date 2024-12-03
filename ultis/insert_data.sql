USE fnbservice_management;
SET FOREIGN_KEY_CHECKS = 0; 
-- Bảng roles
INSERT INTO roles (role_name) 
VALUES ('Admin'), ('Manager'), ('Employee'), ('Customer');

-- Bảng accounts
INSERT INTO accounts (email, password, role_id) 
VALUES ('admin@gmail.com', '$2a$08$oXQ/r/HUiE0b96WRzlqeAu5kDwZplNpYCp0O.HBCaFB.gU6b4i/Tm', 1), 
       ('a@example.com', '$2a$08$oXQ/r/HUiE0b96WRzlqeAu5kDwZplNpYCp0O.HBCaFB.gU6b4i/Tm', 2),
       ('b@example.com', '$2a$08$oXQ/r/HUiE0b96WRzlqeAu5kDwZplNpYCp0O.HBCaFB.gU6b4i/Tm', 2),
       ('employee1@example.com', '$2a$08$oXQ/r/HUiE0b96WRzlqeAu5kDwZplNpYCp0O.HBCaFB.gU6b4i/Tm', 3),
       ('employee2@example.com', '$2a$08$oXQ/r/HUiE0b96WRzlqeAu5kDwZplNpYCp0O.HBCaFB.gU6b4i/Tm', 3);

-- Bảng managers
INSERT INTO managers (name, phone, address, account_id)
VALUES ('John Doe', '0123456789', '123 Main St', 2),
       ('Jane Smith', '0987654321', '456 Oak St', 3);
       
-- Bảng branches
INSERT INTO branches (manager_id, name, contact_phone, address, coordinates, logo_href, fnb_date_counter)
VALUES (2, 'The Coffee House', '0123456789', '123 Main St', '10.8231, 106.6297', 'branches_logo/1/main.jpg', 100),
       (3, 'Second Branch', '0987654321', '456 Oak St', '10.7321, 106.6807', 'logo2.png', 200),
       (4, 'Third Branch', '0456123789', '789 Pine St', '10.7501, 106.6300', 'logo3.png', 300);

-- Bảng areas
INSERT INTO areas (branch_id, name) 
VALUES (1, 'Tầng 1'), 
       (1, 'Tầng 2'), 
       (1, 'Tầng 3'), 
       (2, 'Khu vực A'), 
       (2, 'Khu vực B');

-- Bảng tables
INSERT INTO tables (branch_id, area_id, table_name, qr_code, is_available)
VALUES 
        (1, 1, 'Table 1', 'QR_001', 1),
        (1, 1, 'Table 2', 'QR_002', 0),
        (1, 1, 'Table 3', 'QR_003', 1),
        (1, 1, 'Table 4', 'QR_004', 1),
        (1, 1, 'Table 5', 'QR_005', 0),
        (1, 1, 'Table 6', 'QR_006', 1),
        (1, 1, 'Table 7', 'QR_007', 1),
        (1, 1, 'Table 8', 'QR_008', 0),
        (1, 1, 'Table 9', 'QR_009', 1),
        (1, 2, 'Table 10', 'QR_010', 0),
        (1, 2, 'Table 11', 'QR_011', 1),
        (1, 2, 'Table 12', 'QR_012', 0),
        (1, 2, 'Table 13', 'QR_013', 1),
        (1, 2, 'Table 14', 'QR_014', 1),
        (1, 2, 'Table 15', 'QR_015', 0),
        (1, 2, 'Table 16', 'QR_016', 1),
        (1, 2, 'Table 17', 'QR_017', 1),
        (1, 2, 'Table 18', 'QR_018', 0),
        (1, 2, 'Table 19', 'QR_019', 1),
        (1, 2, 'Table 20', 'QR_020', 0),
        (1, 3, 'Table 21', 'QR_021', 1),
        (1, 3, 'Table 22', 'QR_022', 0),
        (1, 3, 'Table 23', 'QR_023', 1),
        (1, 3, 'Table 24', 'QR_024', 1),
        (1, 3, 'Table 25', 'QR_025', 0),
        (1, 3, 'Table 26', 'QR_026', 1),
        (1, 3, 'Table 27', 'QR_027', 1),
        (1, 3, 'Table 28', 'QR_028', 0),
        (1, 3, 'Table 29', 'QR_029', 1),
        (1, 3, 'Table 30', 'QR_030', 0),
        (2, 4, 'Table 1', 'QR_031', 1),
        (2, 4, 'Table 2', 'QR_032', 0),
        (2, 4, 'Table 3', 'QR_033', 1),
        (2, 4, 'Table 4', 'QR_034', 1),
        (2, 4, 'Table 5', 'QR_035', 0),
        (2, 5, 'Table 6', 'QR_036', 1),
        (2, 5, 'Table 7', 'QR_037', 0),
        (2, 5, 'Table 8', 'QR_038', 1),
        (2, 5, 'Table 9', 'QR_039', 1),
        (2, 5, 'Table 10', 'QR_040', 0);

-- Bảng menus
INSERT INTO menus (branch_id, menu_color, background_image_href)
VALUES (1, 'Blue', 'menu_background1.png'),
       (2, 'Green', 'menu_background2.png'),
       (3, 'Red', 'menu_background3.png'),
       (4, 'Yellow', 'menu_background4.png'),
       (5, 'Purple', 'menu_background5.png');

-- Bảng categories
INSERT INTO categories (category_name, menu_id, image_href)
VALUES 
    ('Drinks', 1, 'categories/1/main.jpg'),
    ('Food', 1, 'categories/2/main.jpg'),
    ('Desserts', 1, 'categories/3/main.jpg'),
    ('Appetizers', 1, 'categories/4/main.jpg'),
    ('Specials', 1, 'categories/5/main.jpg'),
    ('Drinks', 2, 'categories/6/main.jpg'),
    ('Food', 2, 'categories/7/main.jpg'),
    ('Desserts', 2, 'categories/8/main.jpg'),
    ('Appetizers', 2, 'categories/9/main.jpg'),
    ('Specials', 2, 'categories/10/main.jpg');

-- Bảng menu_items
INSERT INTO menu_items (menu_id, category_id, name, description, image_href, cost_price, sale_price, is_available)
VALUES
    -- 10 Drinks (category_id = 1)
    (1, 1, 'Iced Tea', 'Refreshing iced tea', 'menu_items/1/main.jpg', 8.00, 12.00, 1),
    (1, 1, 'Lemonade', 'Fresh lemonade', 'menu_items/2/main.jpg', 7.00, 10.00, 1),
    (1, 1, 'Mango Smoothie', 'Mango smoothie', 'menu_items/3/main.jpg', 12.00, 18.00, 1),
    (1, 1, 'Coconut Water', 'Chilled coconut water', 'menu_items/4/main.jpg', 6.00, 9.00, 1),
    (1, 1, 'Espresso', 'Rich espresso shot', 'menu_items/5/main.jpg', 10.00, 15.00, 1),
    (2, 1, 'Latte', 'Creamy latte', 'menu_items/6/main.jpg', 12.00, 18.00, 1),
    (2, 1, 'Green Tea', 'Organic green tea', 'menu_items/7/main.jpg', 9.00, 13.00, 1),
    (2, 1, 'Milkshake', 'Classic milkshake', 'menu_items/8/main.jpg', 10.00, 14.00, 1),
    (2, 1, 'Hot Chocolate', 'Warm hot chocolate', 'menu_items/9/main.jpg', 8.00, 11.00, 1),
    (2, 1, 'Mango Juice', 'Fresh mango juice', 'menu_items/10/main.jpg', 11.00, 16.00, 1),

    -- 10 Main Dishes (Food) (category_id = 2)
    (1, 2, 'Beef Steak', 'Grilled beef steak', 'menu_items/11/main.jpg', 25.00, 40.00, 1),
    (1, 2, 'Baked Chicken Rice', 'American baked chicken and fried rice', 'menu_items/12/main.jpg', 15.00, 22.00, 1),
    (1, 2, 'Pasta Carbonara', 'Italian pasta with creamy sauce', 'menu_items/13/main.jpg', 18.00, 28.00, 1),
    (1, 2, 'Vegetarian Pizza', ' Wheat pizza with mixed vegetables', 'menu_items/14/main.jpg', 20.00, 30.00, 1),
    (1, 2, 'Pho', 'Vietnamese noodle soup', 'menu_items/15/main.jpg', 10.00, 15.00, 1),
    (2, 2, 'Sushi', 'Assorted sushi', 'menu_items/16/main.jpg', 22.00, 35.00, 1),
    (2, 2, 'Fried Rice', 'Special fried rice', 'menu_items/17/main.jpg', 12.00, 18.00, 1),
    (2, 2, 'Pad Thai', 'Stir-fried noodles', 'menu_items/18/main.jpg', 14.00, 20.00, 1),
    (2, 2, 'Fish Tacos', 'Crispy fish tacos', 'menu_items/19/main.jpg', 15.00, 22.00, 1),
    (2, 2, 'Grilled Salmon', 'Salmon with herbs', 'menu_items/20/main.jpg', 28.00, 45.00, 1),

    -- 10 Appertizers (category_id = 3)
    (1, 3, 'Chocolate Cake', 'Rich chocolate cake', 'menu_items/21/main.jpg', 8.00, 12.00, 1),
    (1, 3, 'Fruit Tart', 'Fresh fruit tart', 'menu_items/22/main.jpg', 10.00, 15.00, 1),
    (1, 3, 'Creme Brulee', 'Creamy Crème brûlée', 'menu_items/23/main.jpg', 9.00, 13.00, 1),
    (1, 3, 'Cheesecake', 'Classic Bery Ricotta cheesecake', 'menu_items/24/main.jpg', 11.00, 16.00, 1),
    (1, 3, 'Brownies', 'Chocolate brownies', 'menu_items/25/main.jpg', 7.00, 10.00, 1),
    (2, 3, 'Panna Cotta', 'Italian berry panna cotta', 'menu_items/26/main.jpg', 10.00, 15.00, 1),
    (2, 3, 'Apple Pie', 'Homemade apple pie', 'menu_items/27/main.jpg', 9.00, 14.00, 1),
    (2, 3, 'Tiramisu', 'Italian tiramisu', 'menu_items/28/main.jpg', 12.00, 18.00, 1),
    (2, 3, 'Pavlova', 'Fruit pavlova', 'menu_items/29/main.jpg', 11.00, 17.00, 1),
    (2, 3, 'Mango Sticky Rice', 'Thai mango sticky rice', 'menu_items/30/main.jpg', 10.00, 14.00, 1);

-- Bảng toppings
INSERT INTO toppings (topping_name, image_href, cost_price, sale_price, is_available, menu_id)
VALUES 
    -- Toppings for drinks
    ('Coconut Jelly', 'toppings/1/main.jpg', 0.50, 1.00, 1, 1),
    ('Black Pearl', 'toppings/2/main.jpg', 0.60, 1.20, 1, 1),
    ('White Pearl', 'toppings/3/main.jpg', 0.70, 1.40, 1, 1),
    ('Cheese Jelly', 'toppings/4/main.jpg', 0.80, 1.60, 1, 1),
    ('Coffee Jelly', 'toppings/5/main.jpg', 0.50, 1.00, 1, 1),

    -- Toppings for main dishes
    ('Fried Egg', 'toppings/6/main.jpg', 1.00, 2.00, 1, 1),
    ('Extra Rice', 'toppings/7/main.jpg', 1.50, 3.00, 1, 1),
    ('Kimchi', 'toppings/8/main.jpg', 0.80, 1.50, 1, 1),
    ('Mashed Potatoes', 'toppings/9/main.jpg', 1.20, 2.50, 1, 1),
    ('Stir-Fried Mushrooms', 'toppings/10/main.jpg', 1.50, 3.00, 1, 1);

-- Bảng orders
INSERT INTO orders (table_id, order_date, status, total_amount)
VALUES (1, NOW(), 'Completed', 45.00),
       (2, NOW(), 'Cancelled', 30.00),
       (3, NOW(), 'Pending', 60.00),
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
VALUES ('Alice', 1, 4),
       ('Bob', 2, 5);

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
INSERT INTO toppings (topping_name, cost_price, sale_price, image_href, is_available, menu_id)
VALUES ('Extra Shot', 1.00, 1.50, 'extra_shot.png',1,1),
       ('Large Size', 1.50, 2.00, 'large_size.png',1,1),
       ('Extra Cheese', 0.50, 1.00, 'extra_cheese.png',1,1),
       ('Add Avocado', 0.80, 1.20, 'avocado.png',1,1),
       ('Double Topping', 1.20, 1.80, 'double_topping.png',1,1);

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

INSERT INTO order_status_history (order_id, status, change_date, reason)
VALUES
    (1, 'Pending', '2024-11-01 10:00:00','nothing'),
    (1, 'Verified', '2024-11-01 11:00:00','nothing'),
    (1, 'Completed', '2024-11-01 12:00:00','nothing'),
    (2, 'Pending', '2024-11-02 09:00:00','nothing'),
    (2, 'Cancelled', '2024-11-02 10:30:00','Sản phẩm đã hết hàng. Mong quý khách chọn món khác.'),
    (3, 'Pending', '2024-11-03 14:00:00','nothing'),
    (4, 'Pending', '2024-11-03 15:00:00','nothing'),
    (5, 'Pending', '2024-11-03 16:00:00',"nothing");

INSERT INTO employee_activities (employee_id, activity_description, activity_time)
VALUES
    (1, 'Prepared drinks for Table 1', '2024-11-01 10:30:00'),
    (1, 'Delivered food to Table 3', '2024-11-01 11:00:00'),
    (2, 'Cooked Beef Steak for Table 4', '2024-11-02 12:00:00'),
    (3, 'Cleaned dining area', '2024-11-03 14:00:00'),
    (4, 'Managed inventory for kitchen', '2024-11-04 15:00:00'),
    (5, 'Processed customer payment for Table 5', '2024-11-05 16:00:00');



SET FOREIGN_KEY_CHECKS = 1;  -- Bật lại kiểm tra khóa ngoại