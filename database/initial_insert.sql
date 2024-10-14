insert into system_admins(username,password,name) values
("Geesan123",sha2('pass123',256),"Geesan"),
("Manujaya123",sha2('pass123',256),"Manujaya"),
("Prabath123",sha2('pass123',256),"Prabath"),
("Kaveesha123",sha2('pass123',256),"Kaveesha");

-- Insert into users table
INSERT INTO users (username, password) 
VALUES 
('user1', sha2('pass123',256)),
('user2', sha2('pass123',256));

-- Insert into reg_users table
INSERT INTO reg_users (username, NIC, full_name, gender, birthday, address, phone_number, e_mail, verified) 
VALUES 
('user1', '123456789V', 'John Doe', 'Male', '1990-05-15', '123 Main St', '0771234567', 'john.doe@example.com', 1),
('user2', '987654321V', 'Jane Smith', 'Female', '1988-07-22', '456 Oak St', '0777654321', 'jane.smith@example.com', 0);

-- Insert into banks table
INSERT INTO banks (name) 
VALUES 
('ABC Bank'),
('XYZ Bank');

-- Insert into bank_admins table
INSERT INTO bank_admins (username, password, bank_ID, branch_name, service_No, verified) 
VALUES 
('admin_abc', sha2('pass123',256), 1, 'Main Branch', 'SN12345', 1),
('admin_xyz', sha2('pass123',256), 2, 'City Branch', 'SN67890', 0);

-- Insert into fixed_products table
INSERT INTO fixed_products (product_name, bank_ID, period, interest_rate, min_age, min_amount) 
VALUES 
('Fixed Saver', 1, 12, 5.25, 18, 1000.00),
('High Yield Fixed', 2, 24, 6.00, 18, 5000.00);

-- Insert into savings_products table
INSERT INTO savings_products (product_name, bank_ID, interest_rate, min_age, min_amount) 
VALUES 
('Basic Savings', 1, 3.50, 18, 500.00),
('Premium Savings', 2, 4.00, 18, 2000.00);

-- Insert into fixed_deposites table
INSERT INTO fixed_deposites (amount, f_ID, username, date_of_deposite, confirmed)
VALUES 
(10000.00, 1, 'user1', '2024-10-01', 1),
(5000.00, 2, 'user1', '2024-10-02', 0);

-- Insert into savings_deposites table
INSERT INTO savings_deposites (amount, s_ID, username, date_of_deposite, confirmed)
VALUES 
(2500.00, 1, 'user1', '2024-10-03', 1),
(1000.00, 2, 'user1', '2024-10-04', 0);