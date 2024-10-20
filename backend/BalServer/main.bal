import ballerina/crypto;
import ballerina/http;
import ballerina/io;
import ballerina/jwt;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

// Create a MySQL client

mysql:Client dbClient = check new ("localhost", "KPP_user", "pass123",
    "kpp", 3306
);

final string secretKey = "KPP_secret";

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: true
    }
}

service / on new http:Listener(9090) {
    //For System Admins:
    resource function post CheckSysAdmin(Cred payl) returns http:Response|http:NotFound|error {
        //Returns a cookie for system admin credentials
        string hashedPass = crypto:hashSha256(payl.password.toBytes()).toBase16();
        sql:ParameterizedQuery qerry = `Select * FROM system_admins WHERE username = ${payl.username} 
        and password = ${hashedPass}`;
        SysAdmin|sql:Error response = dbClient->queryRow(qerry);
        if (response is SysAdmin) {
            jwt:IssuerConfig issuerConfig = {
                username: response.username,
                issuer: "KPP",
                audience: "SysAdmins",
                expTime: 3600,
                signatureConfig: {
                    config: secretKey,
                    algorithm: jwt:HS256
                }
            };
            string jwt = check jwt:issue(issuerConfig);

            http:Cookie cookie = new ("AuthToken", jwt, maxAge = 3600, httpOnly = true);

            // Create the HTTP response
            http:Response res = new;
            res.setPayload(jwt);

            // Add the cookie to the response
            res.addCookie(cookie);
            return res;

        }

        return http:NOT_FOUND;
    }

    resource function get SysAdmin/name(http:Request req) returns string|http:NotFound|error {
        // Get system admin name
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token
        if (audience != "SysAdmins") {
            return error("Unauthorized request");
        }

        // Query the database to fetch admin name using the username
        sql:ParameterizedQuery query = `SELECT name FROM system_admins WHERE username = ${username}`;
        string response = check dbClient->queryRow(query);
        io:print(response);
        return response;
    }

    resource function get NonVerifiedUsers(http:Request req) returns PendingUser[]|sql:Error|http:NotFound|error{
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token
        if (audience != "SysAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = ``;
        stream<PendingUser,sql:Error?> response = dbClient->query(query);


        return from var pUser in response
            select pUser;
    }

    resource function get NonVerifiedBankAdmins(http:Request req) returns PendingBankAdmin[]|sql:Error|http:NotFound|error{
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token

        if (audience != "SysAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `CALL GetNonVerifiedBankAdmins()`;
        stream<PendingBankAdmin,sql:Error?> response = dbClient->query(query);


        return from var pUser in response
            select pUser;
    }

    resource function post VerifiyUser(http:Request req) returns http:NotFound|http:Ok|error{
        json payl = check req.getJsonPayload();
        string username = check payl.username;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token
        if (audience != "SysAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `UPDATE reg_users
        SET verified = true
        WHERE username = ${username};`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        return http:OK;
    }

    resource function post VerifiyBankAdmin(http:Request req) returns http:NotFound|http:Ok|error{
        json payl = check req.getJsonPayload();
        string username = check payl.username;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token

        if (audience != "SysAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `UPDATE bank_admins
        SET verified = true
        WHERE username = ${username};`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        return http:OK;
    }

    resource function delete DeleteUser(http:Request req,string username) returns http:NotFound|http:Ok|error{
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token

        if (audience != "SysAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `CALL ${username};`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        else if (responce.affectedRowCount==0) {
            return http:NOT_FOUND;
        }
        return http:OK;
    }

    resource function delete DeleteBankAdmin(http:Request req,string username) returns http:NotFound|http:Ok|error{
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token

        if (audience != "SysAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `CALL ${username}`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        else if (responce.affectedRowCount==0) {
            return http:NOT_FOUND;
        }
        return http:OK;
    }

    //For Users:
    resource function post SignupUser(NewUser payl) returns http:Created|error {
        // Here you would typically validate the input and hash the password
        // For example:
        io:print("hihi");
        if (payl.username == "") {
            return error("Username cannot be empty");
        }

        if (payl.password.length() < 6) {
            return error("Password must be at least 6 characters long");
        }
        string hashedpass = crypto:hashSha256(payl.password.toBytes()).toBase16();
        sql:ParameterizedQuery query = `call AddNewUserAndRegUser(${payl.username},${hashedpass},${payl.NIC},${payl.full_name},${payl.gender},${payl.birthday},${payl.address},${payl.phone_number},${payl.e_mail})`;
        sql:ExecutionResult|sql:Error result = dbClient->execute(query);
        if (result is sql:Error) {
            return result;
        }
        // Insert user into the database logic here (pseudo code)
        // e.g., db:insert("users", { username: payl.username, password: hashedPassword });
        // Assuming user registration is successful
        return http:CREATED;
    }

    resource function post CheckUser(Cred payl) returns http:Response|http:NotFound|error {
        // Hash the password

        string hashedPass = crypto:hashSha256(payl.password.toBytes()).toBase16();

        // Query the users table
        sql:ParameterizedQuery qerry = `SELECT * FROM users WHERE username = ${payl.username} 
                                    AND password = ${hashedPass}`;
        Cred|sql:Error response = dbClient->queryRow(qerry);
        if (response is Cred) {


            jwt:IssuerConfig issuerConfig = {
                username: response.username,
                issuer: "KPP",
                audience: "users",
                expTime: 3600,
                signatureConfig: {
                    config: secretKey,
                    algorithm: jwt:HS256
                }
            };
            string jwt = check jwt:issue(issuerConfig);

            // Create a cookie to store the JWT token
            http:Cookie cookie = new ("AuthToken", jwt, maxAge = 3600, httpOnly = true);

            // Create the HTTP response
            http:Response res = new;
            res.setPayload(jwt);


            // Add the cookie to the response
            res.addCookie(cookie);

            // Return the response with the cookie
            return res;

        }
        // If the credentials are invalid, return 404 Not Found
        return http:NOT_FOUND;
    }


    resource function get User/name(http:Request req) returns string|http:NotFound|error {
        // Get user name
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }
        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `SELECT full_name FROM reg_users WHERE username = ${username}`;
        string response = check dbClient->queryRow(query);
        io:print(decRes[1].sub);
        return response;
    }

    resource function get User/verified(http:Request req) returns boolean|http:NotFound|error {
        //Get system admin name
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        io:print(cookies);
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }
        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;


        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `SELECT verified FROM reg_users WHERE username = ${username}`;
        boolean response = check dbClient->queryRow(query);
        io:print(decRes[1].sub);
        return response;
    }


    resource function get User/unconfirmedFixedDeposites(http:Request req) returns FixedDeposit[]|http:NotFound|error {
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `call GetUnconfirmedFixedDepositsHistory(${username})`;
        stream<FixedDeposit, sql:Error?> fds = dbClient->query(query);
        return from var fd in fds
            select fd;
    }


    resource function get User/unconfirmedSavingsDeposites(http:Request req) returns SavingsDeposit[]|http:NotFound|error {
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `call GetUnconfirmedSavingsDepositsHistory(${username}`;
        stream<SavingsDeposit, sql:Error?> sds = dbClient->query(query);

        return from var sd in sds
            select sd;
    }

    resource function get User/historyFixedDeposites(http:Request req) returns FixedDeposit[]|http:NotFound|error {
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `call GetFixedDepositsHistory(${username}`;
        stream<FixedDeposit, sql:Error?> fds = dbClient->query(query);

        return from var fd in fds
            select fd;
    }

    resource function get User/historySavingsDeposites(http:Request req) returns SavingsDeposit[]|http:NotFound|error {
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `call GetSavingsDepositsHistory(${username}`;
        stream<SavingsDeposit, sql:Error?> sds = dbClient->query(query);

        return from var sd in sds
            select sd;
    }

    resource function post User/getFixedSuggestions(http:Request req) returns FixedProduct[]|http:NotFound|error {
        json payl = check req.getJsonPayload();
        int period = check payl.period;
        int amount = check payl.amount;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `call GetSuitableFixedProducts(${username},${amount},${period})`;
        stream<FixedProduct, sql:Error?> sds = dbClient->query(query);

        return from var sd in sds
            select sd;
    }

    resource function post User/getSavingsSuggestions(http:Request req) returns SavingsProduct[]|http:NotFound|error {
        json payl = check req.getJsonPayload();
        int amount = check payl.amount;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }


        sql:ParameterizedQuery query = `call GetSuitableSavingsProducts(${username},${amount})`;
        stream<SavingsProduct, sql:Error?> sds = dbClient->query(query);

        return from var sd in sds
            select sd;
    }

    resource function delete RemoveFixedInvestRequest(http:Request req, int F_dep_ID) returns http:NotFound|error|http:NoContent {
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `DELETE FROM fixed_deposites WHERE f_ID = ${F_dep_ID} AND username = ${username} AND confirmed = false`;
        sql:ExecutionResult|sql:Error result = dbClient->execute(query);
        if (result is sql:Error) {
            return result;
        }
        else if (result.affectedRowCount==0) {
            return http:NOT_FOUND;
        }
        return http:NO_CONTENT;
    }

    resource function delete RemoveSavingsInvestRequest(http:Request req, int S_dep_ID) returns http:NotFound|error|http:NoContent {
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `DELETE FROM savings_deposites WHERE s_dep_ID = ${S_dep_ID} AND username = ${username}  AND confirmed = false`;
        sql:ExecutionResult|sql:Error result = dbClient->execute(query);
        if (result is sql:Error) {
            return result;
        }

        else if (result.affectedRowCount==0) {
            return http:NOT_FOUND;
        }

        return http:NO_CONTENT;
    }
    
    resource function post User/FixedInvestRequest(http:Request req) returns http:NotFound|int|error {
        // Creates a new deposit without confirmation
        // Payload should have the F_ID and amount
        // Returns the f_dep_ID of the new deposit
        json payl = check req.getJsonPayload();
        int F_ID = check payl.F_ID;
        decimal amount = check payl.amount;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        if (username is string) {
            // Call a stored procedure to insert the new fixed deposit record
            sql:ParameterizedQuery query = `CALL AddNewFixedDeposit(${amount},${F_ID},${username}, @new_f_dep_ID);SELECT @new_f_dep_ID as f_dep_ID`;
            int|sql:Error f_dep_ID = check dbClient->queryRow(query);

            return f_dep_ID; // Return the generated f_dep_ID
        }
        return http:NOT_FOUND;
    }

    resource function post User/SavingsInvestRequest(http:Request req ) returns http:NotFound|int|error {
        // Creates a new savings deposit without confirmation
        // Payload should have the s_ID and amount
        // Returns the s_dep_ID of the new deposit
        json payl = check req.getJsonPayload();
        int S_ID = check payl.S_ID;
        decimal amount = check payl.amount;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        if (username is string) {
            // Call a stored procedure to insert the new savings deposit record
            sql:ParameterizedQuery query = `CALL AddNewSavingsDeposit(${amount},${S_ID},${username}, @new_s_dep_ID);SELECT @new_s_dep_ID as s_dep_ID`;
            int|sql:Error s_dep_ID = check dbClient->queryRow(query);

            return s_dep_ID; // Return the generated s_dep_ID
        }
        return http:NOT_FOUND;
    }

    resource function get User/all(http:Request req) returns RegUser|http:NotFound|error {
        // Get user all fields
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "users") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `SELECT * FROM reg_users WHERE username = ${username}`;
        RegUser response = check dbClient->queryRow(query);
        io:print(decRes[1].sub);
        return response;
    }

    //For Bank Admins:
    resource function post CheckBankAdmin(Cred payl) returns http:NotFound|error|http:Response {
        // Returns a cookie for bank admin credentials
        string hashedPass = crypto:hashSha256(payl.password.toBytes()).toBase16();
        sql:ParameterizedQuery query = `SELECT * FROM bank_admins WHERE username = ${payl.username} 
    and password = ${hashedPass}`;
        BankAdmin|sql:Error response = dbClient->queryRow(query);
        if (response is BankAdmin) {
            jwt:IssuerConfig issuerConfig = {
                username: response.username,
                issuer: "KPP",
                audience: "BankAdmins",
                expTime: 3600,
                signatureConfig: {
                    config: secretKey,
                    algorithm: jwt:HS256
                }
            };
            string jwt = check jwt:issue(issuerConfig);
            // Create a cookie to store the JWT token
            http:Cookie cookie = new ("AuthToken", jwt, maxAge = 3600, httpOnly = true);

            // Create the HTTP response
            http:Response res = new;
            res.setPayload(jwt);

            // Add the cookie to the response
            res.addCookie(cookie);

            // Return the response with the cookie
            return res;
        }

        return http:NOT_FOUND;
    }

    resource function post SignupBankAdmin(NewBankAdmin payl) returns http:Created|error {

        // For example:
        if (payl.username == "") {
            return error("Username cannot be empty");
        }

        if (payl.password.length() < 6) {
            return error("Password must be at least 6 characters long");
        }
        string hashedpass = crypto:hashSha256(payl.password.toBytes()).toBase16();
        sql:ParameterizedQuery query = `CALL addnewbAdm${hashedpass}`;
        sql:ExecutionResult|sql:Error result = dbClient->execute(query);
        if (result is sql:Error) {
            return result;
        }
        // Insert user into the database logic here (pseudo code)
        // e.g., db:insert("users", { username: payl.username, password: hashedPassword });
        // Assuming user registration is successful
        return http:CREATED;
    }

    resource function post UpdateFixedRate(http:Request req) returns http:Ok|http:NotFound|error{
        
        json payl = check req.getJsonPayload();
        int F_ID = check payl.F_ID;
        decimal newInterestRate = check  payl.newRate;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }
        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `CALL ${F_ID},${newInterestRate}`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        return http:OK;
    }

    resource function post UpdateSavingsRate(http:Request req) returns http:Ok|http:NotFound|error{
        json payl = check req.getJsonPayload();
        int S_ID = check payl.S_ID;
        decimal newInterestRate = check  payl.newRate;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }
        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `call ${S_ID},${newInterestRate}`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        return http:OK;
    }

    resource function post GetFixedDeposite(http:Request req) returns FixedDepositDetails|http:NotFound|error{
        json payl = check req.getJsonPayload();
        int F_dep_ID = check payl.F_dep_ID;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `CALL ${F_dep_ID}`;
        FixedDepositDetails|sql:Error response = dbClient->queryRow(query);
        return response;
    }

    resource function post GetSavingsDeposite(http:Request req) returns SavingsDepositDetails|http:NotFound|error{
        json payl = check req.getJsonPayload();
        int S_dep_ID = check payl.S_dep_ID;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        // Ensure the request is coming from an admin token

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `CALL ${S_dep_ID}`;
        SavingsDepositDetails|sql:Error response = dbClient->queryRow(query);
        return response;
    }

    resource function post ConfirmFixedDeposite(http:Request req) returns http:NotFound|http:Ok|error{
        json payl = check req.getJsonPayload();
        int F_dep_ID = check payl.F_dep_ID;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `UPDATE fixed_deposites
        SET confirmed = true
        WHERE f_dep_ID = ${F_dep_ID};`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        return http:OK;
    }

    resource function post ConfirmSavingsDeposite(http:Request req) returns http:NotFound|http:Ok|error{
        json payl = check req.getJsonPayload();
        int S_dep_ID = check payl.S_dep_ID;
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `UPDATE savings_deposites
        SET confirmed = true
        WHERE s_dep_ID = ${S_dep_ID};`;
        sql:ExecutionResult|sql:Error responce = dbClient->execute(query);
        if(responce is sql:Error){
            return responce;
        }
        return http:OK;
    }

    resource function get BankAdmin/bankID(http:Request req) returns http:NotFound|error|int {
        // Get bankID
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }
        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `SELECT bank_ID FROM bank_admins WHERE username = ${username}`;
        int response = check dbClient->queryRow(query);
        return response;
    }

    resource function get BankAdmin/verified(http:Request req) returns boolean|http:NotFound|error {
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery query = `SELECT verified FROM bank_admins WHERE username = ${username}`;
        boolean response = check dbClient->queryRow(query);
        io:print(decRes[1].sub);
        return response;
    }

    resource function get BankAdmin/all(http:Request req) returns http:NotFound|error|BankAdmin {
        // Get all fields from BankAdmin
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;

        if (audience != "BankAdmins") {
            return error("Unauthorized request");
        }

        sql:ParameterizedQuery query = `SELECT * FROM bank_admins WHERE username = ${username}`;
        BankAdmin response = check dbClient->queryRow(query);
        io:print(decRes[1].sub);
        return response;
    }

    

    // Common
    resource function get Logout(http:Request req) returns http:Response {
        //Deletes all AuthToken cookies
        http:Response res = new;
        http:Cookie[] cookies = req.getCookies();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                res.removeCookiesFromRemoteStore(cookie);
            }
        }
        return res;
    }

    resource function get CheckLogged(http:Request req) returns error|http:NotFound|string {
        //Checks if logged in
        http:Cookie[] cookies = req.getCookies();
        http:Cookie? authCookie = ();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                authCookie = cookie;
            }
        }
        if (authCookie is ()) {
            return http:NOT_FOUND;
        }

        string jwt = authCookie.value;
        var decRes = check jwt:decode(jwt);
        string|string[]? audience = decRes[1].aud;
        if(audience is string){
            return audience;
        }
        return http:NOT_FOUND;
    }

    resource function get AllBankStats(http:Request req) returns BankStats[]|error {
        sql:ParameterizedQuery query = `call GetNo_FixedInvestmentsPerBank()`;
        stream<BankStat, sql:Error?> statsStream = dbClient->query(query);
        BankStat[] fix_nums = check from var stat in statsStream select stat;
        query = `call GetNo_FixedInvestmentsPerBank()`;
        statsStream = dbClient->query(query);
        BankStat[] fix_amounts = check from var stat in statsStream select stat;
        query = `call GetNo_FixedInvestmentsPerBank()`;
        statsStream = dbClient->query(query);
        BankStat[] sav_nums = check from var stat in statsStream select stat;
        query = `call GetNo_FixedInvestmentsPerBank()`;
        statsStream = dbClient->query(query);
        BankStat[] sav_amounts = check from var stat in statsStream select stat;
        int length = fix_nums.length();
        int i = 0;
        BankStats[] b = [];
        while i < length {
        b.push({Bank_Name: fix_amounts[i].Bank_Name,fixed_invest_amount: fix_amounts[i].stat,
        fixed_invest_number: fix_nums[i].stat, savings_invests_number: sav_nums[i].stat, savings_invests_amount: sav_amounts[i].stat});
        i += 1;
        }
        return b;

    }
}

function init() {
    io:println("Server running on port 9090");
}