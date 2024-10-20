--bank_admin page

DELIMITER //

CREATE PROCEDURE GetUserById(IN User_Name VARCHAR(100))
BEGIN
    SELECT NIC,full_name,gender,birthday,address,phone_number,e_mail 
    FROM reg_users WHERE  `username`= User_Name;
END //

DELIMITER ;

--update fixed products interest rates
DELIMITER //

CREATE PROCEDURE UpdateFixedInterestRates(IN F__ID INT, IN newInterestRate DECIMAL(5,2))
BEGIN
    UPDATE fixed_products
    SET interest_rate = newInterestRate
    WHERE `f_ID` = F__ID;
END //

DELIMITER ;

--update saving products interest rates
DELIMITER //

CREATE PROCEDURE UpdatSavingInterestRates(IN S__ID INT, IN newInterestRate DECIMAL(5,2))
BEGIN
    UPDATE savings_products
    SET interest_rate = newInterestRate
    WHERE `s_ID` = S__ID;
END //

DELIMITER ;

--total number of fixed investments per bank
DELIMITER //

CREATE PROCEDURE GetNo_FixedInvestmentsPerBank()
BEGIN
    SELECT D.name AS Bank_Name, COUNT(f_dep_ID) AS No_Of_Fixed_Investments
    FROM fixed_products f
    INNER JOIN fixed_deposites c ON f.f_ID = c.f_ID
    INNER JOIN banks D ON f.bank_ID = D.bank_ID
    GROUP BY D.bank_ID
    ORDER BY D.bank_ID ASC;
END //

DELIMITER ;

--total amount of fixed investments per bank
DELIMITER //

CREATE PROCEDURE GetFixedInvestmentsPerBank()
BEGIN
    SELECT D.name AS Bank_Name, sum(c.amount) AS Amount_Of_Fixed_Investments
    FROM fixed_products f
    INNER JOIN fixed_deposites c ON f.f_ID = c.f_ID
    INNER JOIN banks D ON f.bank_ID = D.bank_ID
    GROUP BY D.bank_ID
    ORDER BY D.bank_ID ASC;
END //

DELIMITER ;


--total number of saving investments per bank
DELIMITER //

CREATE PROCEDURE GetNo_SavingInvestmentsPerBank()
BEGIN
    SELECT D.name AS Bank_Name, COUNT(s_dep_ID) AS No_Of_Saving_Investments
    FROM saving_products f
    INNER JOIN saving_deposites c ON f.s_ID = c.s_ID
    INNER JOIN banks D ON f.bank_ID = D.bank_ID
    GROUP BY D.bank_ID
    ORDER BY D.bank_ID ASC;
END //

DELIMITER ;

--total amount of saving investments per bank
DELIMITER //

CREATE PROCEDURE GetSavingInvestmentsPerBank()
BEGIN
    SELECT D.name AS Bank_Name, sum(c.amount) AS Amount_Of_Saving_Investments
    FROM saving_products f
    INNER JOIN saving_deposites c ON f.s_ID = c.s_ID
    INNER JOIN banks D ON f.bank_ID = D.bank_ID
    GROUP BY D.bank_ID
    ORDER BY D.bank_ID ASC;
END //

DELIMITER ;

--enter a new bank admin
DELIMITER //

CREATE PROCEDURE AddBankAdmin(
    IN p_username VARCHAR(20),
    IN p_password VARCHAR(255),
    IN p_bank_ID INT,
    IN p_branch_name VARCHAR(100),
    IN p_service_No VARCHAR(20),
    IN p_verified BOOLEAN
)
BEGIN
    INSERT INTO bank_admins (username, password, bank_ID, branch_name, service_No)
    VALUES (p_username, p_password, p_bank_ID, p_branch_name, p_service_No);
END //

DELIMITER ;

--for non-verified users
DELIMITER //

CREATE PROCEDURE GetNonVerifiedUsers()
BEGIN
    SELECT username, NIC, full_name, gender, birthday, address, phone_number, e_mail
    FROM reg_users
    WHERE verified = 0;
END //

DELIMITER ;

--for non-verified bank admins
DELIMITER //

CREATE PROCEDURE GetNonVerifiedBankAdmins()
BEGIN
    SELECT username, bank_ID, branch_name, service_No
    FROM bank_admins
    WHERE verified = 0;
END //

DELIMITER ;

--insert a user and a reg_user same time

DELIMITER //

CREATE PROCEDURE AddNewUserAndRegUser(
    IN p_username VARCHAR(20),
    IN p_password VARCHAR(255),
    IN p_NIC VARCHAR(12),
    IN p_full_name VARCHAR(100),
    IN p_gender ENUM('Male', 'Female', 'Other'),
    IN p_birthday DATE,
    IN p_address VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_e_mail VARCHAR(100),
    
)
BEGIN
    -- Insert into 'users' table
    INSERT INTO users (username, password)
    VALUES (p_username, p_password);

    -- Insert into 'reg_users' table
    INSERT INTO reg_users (username, NIC, full_name, gender, birthday, address, phone_number, e_mail)
    VALUES (p_username, p_NIC, p_full_name, p_gender, p_birthday, p_address, p_phone_number, p_e_mail);
END //

DELIMITER ;
--add new saving investment and get s_dep_ID
DELIMITER //

CREATE PROCEDURE AddNewSavingsDeposit(
    IN p_amount DECIMAL(15,2),
    IN p_s_ID INT,
    IN p_username VARCHAR(20),
    IN p_date_of_deposite DATE,
    
    OUT p_s_dep_ID INT
)
BEGIN
    -- Insert into 'savings_deposites' table
    INSERT INTO savings_deposites (amount, s_ID, username, date_of_deposite)
    VALUES (p_amount, p_s_ID, p_username, p_date_of_deposite);

    -- Retrieve the last inserted ID
    SET p_s_dep_ID = LAST_INSERT_ID();
END //

DELIMITER ;
--way to call this
example:-CALL AddNewSavingsDeposit(1000.50, 1, 'john_doe', '2024-10-18', 1, @new_s_dep_ID);
SELECT @new_s_dep_ID as s_dep_ID;

--add new fixed investment and get f_dep_ID
DELIMITER //

CREATE PROCEDURE AddNewFixedDeposit(
    IN p_amount DECIMAL(15,2),
    IN p_f_ID INT,
    IN p_username VARCHAR(20),
    IN p_date_of_deposite DATE,
    
    OUT p_f_dep_ID INT
)
BEGIN
    -- Insert into 'fixed_deposites' table
    INSERT INTO fixed_deposites (amount, f_ID, username, date_of_deposite)
    VALUES (p_amount, p_f_ID, p_username, p_date_of_deposite);

    -- Retrieve the last inserted f_dep_ID
    SET p_f_dep_ID = LAST_INSERT_ID();
END //

DELIMITER ;

--suggest saving products
DELIMITER //

CREATE PROCEDURE GetSuitableSavingsProducts(
    IN p_username VARCHAR(20),
    IN p_amount DECIMAL(15,2)
)
BEGIN
    DECLARE user_age INT;

    -- Calculate the age of the user
    SELECT TIMESTAMPDIFF(YEAR, birthday, CURDATE()) INTO user_age
    FROM reg_users
    WHERE `username` = p_username;

    -- Select the suitable savings products
    SELECT s.s_ID, s.product_name, s.bank_ID, s.interest_rate, b.name
    FROM savings_products s
    inner join banks b on s.bank_ID=b.bank_ID
    WHERE `min_amount` <= p_amount AND `min_age` <= user_age
    ORDER BY interest_rate DESC;
END //

DELIMITER ;

--sugest fixed prducts
DELIMITER //

CREATE PROCEDURE GetSuitableFixedProducts(
    IN p_username VARCHAR(20),
    IN p_amount DECIMAL(15,2),
    IN p_period INT
)
BEGIN
    DECLARE user_age INT;

    -- Calculate the age of the user
    SELECT TIMESTAMPDIFF(YEAR, birthday, CURDATE()) INTO user_age
    FROM reg_users
    WHERE `username` = p_username;

    -- Select the suitable fixed products
    SELECT f.f_ID, f.product_name, f.bank_ID, f.interest_rate, f.period,b.name
    FROM fixed_products f
    INNER JOIN banks b ON f.bank_ID = b.bank_ID
    WHERE `min_amount` <= p_amount 
      AND `min_age` <= user_age 
      AND `period` = p_period
    ORDER BY f.interest_rate DESC;
END //

DELIMITER ;




DELIMITER $$

CREATE PROCEDURE GetSavingsDepositsHistory(
    IN p_username VARCHAR(20) -- Input parameter for the username
)
BEGIN
    -- Select the confirmed deposits for the given username
    SELECT c.product_name,b.name,s.s_dep_ID, s.amount, s.date_of_deposite
    FROM savings_deposites s
    inner join savings_products c on s.s_ID=c.s_ID
    inner join banks b on c.bank_ID=b.bank_ID
    WHERE `username` = p_username
      AND `confirmed` = 1;
END$$

DELIMITER ;




DELIMITER $$

CREATE PROCEDURE GetFixedDepositsHistory(
    IN p_username VARCHAR(20) -- Input parameter for the username
)
BEGIN
    -- Select the confirmed deposits for the given username
    SELECT c.product_name,b.name,s.f_dep_ID, s.amount, s.date_of_deposite,c.period
    FROM fixed_deposites s
    inner join fixed_products c on s.f_ID=c.f_ID
    inner join banks b on c.bank_ID=b.bank_ID
    WHERE `username` = p_username
      AND `confirmed` = 1;
END$$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE GetUnconfirmedSavingsDepositsHistory(
    IN p_username VARCHAR(20) -- Input parameter for the username
)
BEGIN
    -- Select the confirmed deposits for the given username
    SELECT c.product_name,b.name,s.s_dep_ID, s.amount, s.date_of_deposite
    FROM savings_deposites s
    inner join savings_products c on s.s_ID=c.s_ID
    inner join banks b on c.bank_ID=b.bank_ID
    WHERE `username` = p_username
      AND `confirmed` = 0;
END$$

DELIMITER ;



DELIMITER $$

CREATE PROCEDURE GetUnconfirmedFixedDepositsHistory(
    IN p_username VARCHAR(20) -- Input parameter for the username
)
BEGIN
    -- Select the confirmed deposits for the given username
    SELECT c.product_name,b.name,s.f_dep_ID, s.amount, s.date_of_deposite,c.period
    FROM fixed_deposites s
    inner join fixed_products c on s.f_ID=c.f_ID
    inner join banks b on c.bank_ID=b.bank_ID
    WHERE `username` = p_username
      AND `confirmed` = 0;
END$$

DELIMITER;





DELIMITER $$

CREATE PROCEDURE GetFixedDepositDetails(
    IN p_f_dep_ID INT -- Input parameter for the fixed deposit ID
)
BEGIN
    -- Join the tables to get the required information for the given f_dep_ID
    SELECT
        r.NIC,r.full_name,r.gender,r.birthday,r.address,r.phone_number,r.e_mail,
        b.name AS bank_name,
        fp.product_name,
        fp.period,
        amount,
        date_of_deposite
    FROM 
        fixed_deposites 
    INNER JOIN 
        fixed_products fp ON fixed_deposites.f_ID = fp.f_ID
    INNER JOIN 
        banks b ON fp.bank_ID = b.bank_ID
	inner join reg_users r on fixed_deposites.username = r.username
    WHERE 
        `f_dep_ID`= p_f_dep_ID;
END$$

DELIMITER ;




DELIMITER $$

CREATE PROCEDURE GetSavingDepositDetails(
    IN p_s_dep_ID INT -- Input parameter for the Saving deposit ID
)
BEGIN
    -- Join the tables to get the required information for the given s_dep_ID
    SELECT
        r.NIC,r.full_name,r.gender,r.birthday,r.address,r.phone_number,r.e_mail,
        b.name AS bank_name,
        sp.product_name,
        
        amount,
        date_of_deposite
    FROM 
        savings_deposites 
    INNER JOIN 
        savings_products sp ON savings_deposites.s_ID = sp.s_ID
    INNER JOIN 
        banks b ON sp.bank_ID = b.bank_ID
	inner join reg_users r on savings_deposites.username = r.username
    WHERE 
        `s_dep_ID`= p_s_dep_ID;
END$$

DELIMITER ;

--delete user

DELIMITER //

CREATE PROCEDURE DeleteUser(IN userNameInput VARCHAR(20))
BEGIN
  -- First delete from reg_users because of the foreign key constraint
  DELETE FROM reg_users WHERE `username` = userNameInput;

  -- Then delete from users
  DELETE FROM users WHERE `username` = userNameInput;
END //

DELIMITER ;

---delete bank_admin

DELIMITER //

CREATE PROCEDURE DeleteBankAdmin(IN userNameInput VARCHAR(20))
BEGIN
  -- Delete from bank_admins table based on the username
  DELETE FROM bank_admins WHERE `username` = userNameInput;
END //

DELIMITER ;
