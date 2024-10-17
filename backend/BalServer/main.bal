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
        //Returns a token for system admin credentials
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
        // Authorization header tag must have a valid token
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
        io:print(decRes[1].sub); // Optional: for debugging purposes
        return response;
    }

    //For Users:
    resource function post CheckUser(Cred payl) returns http:Response|http:NotFound|error {
        // Hash the password
        string hashedPass = crypto:hashSha256(payl.password.toBytes()).toBase16();

        // Query the users table
        sql:ParameterizedQuery qerry = `SELECT * FROM users WHERE username = ${payl.username} 
                                    AND password = ${hashedPass}`;
        Cred|sql:Error response = dbClient->queryRow(qerry);
        if (response is Cred) {
            // Create the JWT token
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
        // Authorization header tag must have a valid token
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
        //Authorization header tag must have a valid token
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

    resource function get User/all(http:Request req) returns RegUser|http:NotFound|error {
        // Get user all fields
        // Authorization header tag must have a valid token
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
        // Returns a token for bank admin credentials
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

    resource function get BankAdmin/bankID(http:Request req) returns http:NotFound|error|int {
        // Get user name
        // Authorization header tag must have a valid token
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

    resource function get BankAdmin/all(http:Request req) returns http:NotFound|error|BankAdmin {
        // Get all fields from BankAdmin
        // Authorization header tag must have a valid token
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

    resource function post User/FixedInvestRequest(http:Request req) returns int|http:NotFound|http:HeaderNotFoundError|http:ClientError|jwt:Error {
        // Creates a new deposite without confirmation
        // Payload should have the F_ID
        // Returns the f_dep_ID of the new deposite
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
            //Create the new F_dep_record and take fdip
            int F_dip_ID = 1;
            return F_dip_ID;
        }

        return http:NOT_FOUND;
    }

    resource function get Logout(http:Request req) returns http:Response {
        http:Response res = new;
        http:Cookie[] cookies = req.getCookies();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                res.removeCookiesFromRemoteStore(cookie);
            }
        }
        return res;
    }

    resource function get CheckLogged(http:Request req) returns boolean {
        http:Cookie[] cookies = req.getCookies();
        foreach var cookie in cookies {
            if (cookie.name === "AuthToken") {
                var result = cookie.isValid();
                if(result === true){
                    return true;
                }
            }
        }
        return false;
    }
}

function init() {
    io:println("Server running on port 9090");
}