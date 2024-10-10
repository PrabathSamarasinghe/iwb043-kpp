-- End user credentials
CREATE TABLE users (
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);
-- Details of registered users
CREATE TABLE reg_users (
    username VARCHAR(20) NOT NULL,
    NIC VARCHAR(12) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    birthday DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    e_mail VARCHAR(100),
    verified BOOLEAN DEFAULT 0,
    PRIMARY KEY (username),
    FOREIGN KEY (username) REFERENCES users(username)
);

-- Registered banks
CREATE TABLE banks (
    bank_ID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (bank_ID)
);
-- Details of bank admins
CREATE TABLE bank_admins (
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    bank_ID INT NOT NULL,
    branch_name VARCHAR(100) NOT NULL,
    service_No VARCHAR(20) NOT NULL,
    verified BOOLEAN DEFAULT 0,
    PRIMARY KEY (username),
    FOREIGN KEY (bank_ID) REFERENCES banks(bank_ID)
);

-- Available fixed products from the banks
CREATE TABLE fixed_products (
    f_ID INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    bank_ID INT NOT NULL,
    period INT NOT NULL, -- Period in months
    interest_rate DECIMAL(5,2) NOT NULL, -- For storing rates like 5.25%
    min_age INT, -- Minimum age requirement for the product
    min_amount DECIMAL(15,2), -- Minimum amount required for this fixed product
    PRIMARY KEY (f_ID),
    FOREIGN KEY (bank_ID) REFERENCES banks(bank_ID)
);
-- Available savings products from the banks
CREATE TABLE savings_products (
    s_ID INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    bank_ID INT NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL, -- For storing rates like 3.50%
    min_age INT , -- Minimum age requirement for the product
    min_amount DECIMAL(15,2), -- Minimum amount required for this savings product
    PRIMARY KEY (s_ID),
    FOREIGN KEY (bank_ID) REFERENCES banks(bank_ID)
);

-- Initialized fixed_deposites
CREATE TABLE fixed_deposites (
    f_dep_ID INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(15,2) NOT NULL, -- Amount of the fixed deposit
    f_ID INT NOT NULL, -- Foreign key referencing the fixed product
    date_of_deposite DATE NOT NULL, -- Date the deposit was made
    confirmed BOOLEAN DEFAULT 0, -- Whether the deposit is confirmed or not
    PRIMARY KEY (f_dep_ID),
    FOREIGN KEY (f_ID) REFERENCES fixed_products(f_ID)
);
-- Initialized savings_deposites
CREATE TABLE savings_deposites (
    s_dep_ID INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(15,2) NOT NULL, -- Amount of the savings deposit
    s_ID INT NOT NULL, -- Foreign key referencing the savings product
    date_of_deposite DATE NOT NULL, -- Date the deposit was made
    confirmed BOOLEAN DEFAULT 0, -- Whether the deposit is confirmed or not
    PRIMARY KEY (s_dep_ID),
    FOREIGN KEY (s_ID) REFERENCES savings_products(s_ID)
);

-- Details of the system admins
CREATE TABLE system_admins (
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (username)
);