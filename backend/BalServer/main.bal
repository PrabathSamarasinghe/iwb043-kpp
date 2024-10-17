import ballerina/http;
import ballerina/io;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/sql;
import ballerina/jwt;
import ballerina/crypto;

// Create a MySQL client
mysql:Client dbClient = check new ("localhost", "KPP_user", "pass123", 
                              "kpp", 3306);

final string secretKey = "KPP_secret";

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}

service / on new http:Listener(9090) {
    //For System Admins:
    resource function post CheckSysAdmin(Cred payl) returns http:Response|http:NotFound|error{
        //Returns a token for system admin credentials
        string hashedPass = crypto:hashSha256(payl.password.toBytes()).toBase16();
        sql:ParameterizedQuery qerry = `Select * FROM system_admins WHERE username = ${payl.username} 
        and password = ${hashedPass}`;
        SysAdmin|sql:Error response = dbClient->queryRow(qerry);
        if(response is SysAdmin){
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
        http:Cookie cookie = new("AuthToken",jwt,maxAge = 3600,httpOnly = true);

        // Create the HTTP response
        http:Response res = new;
        res.setPayload(jwt);

        // Add the cookie to the response
        res.addCookie(cookie);
        return res;
        }

        return http:NOT_FOUND;
    }
    resource function get SysAdmin/name(http:Request req) returns string?|error{
        //Get system admin name
        //Authorization header tag must have a valid token
        string jwt = check req.getHeader("Authorization");
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;
        if(audience!="SysAdmins"){
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery qerry = `Select name FROM system_admins WHERE username = ${username}`;
        string response = check dbClient->queryRow(qerry);
        io:print(decRes[1].sub);
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
    io:print(response);
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
        http:Cookie cookie = new("AuthToken", jwt, maxAge = 3600, httpOnly = true);

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
    resource function get User/name(http:Request req) returns string?|error {
    // Get user name
    // Authorization header tag must have a valid token
    string authHeader = check req.getHeader("Authorization");
    string jwt = authHeader.substring(7);
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
    resource function get User/verified(http:Request req) returns boolean?|error{
        //Get system admin name
        //Authorization header tag must have a valid token
        string authHeader = check req.getHeader("Authorization");
        string jwt = authHeader.substring(7);
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;
        if(audience!="users"){
            return error("Unauthorized request");
        }
        sql:ParameterizedQuery qerry = `Select verified FROM reg_users WHERE username = ${username}`;
        boolean response = check dbClient->queryRow(qerry);
        io:print(decRes[1].sub);
        return response;
    }
    resource function get User/all(http:Request req) returns RegUser?|error {
    // Get user all fields
    // Authorization header tag must have a valid token
    string authHeader = check req.getHeader("Authorization");
    string jwt = authHeader.substring(7);
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
        http:Cookie cookie = new("AuthToken", jwt, maxAge = 3600, httpOnly = true);

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
    resource function get BankAdmin/bankID(http:Request req) returns int?|error {
        // Get user name
        // Authorization header tag must have a valid token
        string authHeader = check req.getHeader("Authorization");
        string jwt = authHeader.substring(7);
        var decRes = check jwt:decode(jwt);
        string? username = decRes[1].sub;
        string|string[]? audience = decRes[1].aud;
        
        if (audience != "users") {
            return error("Unauthorized request");
        }
        
        sql:ParameterizedQuery query = `SELECT full_name FROM reg_users WHERE username = ${username}`;
        int response = check dbClient->queryRow(query);
        io:print(decRes[1].sub);
        return response;
    }
    resource function get BankAdmin/all(http:Request req) returns BankAdmin?|error {
    // Get all fields from BankAdmin
    // Authorization header tag must have a valid token
    string authHeader = check req.getHeader("Authorization");
    string jwt = authHeader.substring(7);
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
    resource function post User/FixedInvestRequest(http:Request req) returns string|http:NotFound|http:HeaderNotFoundError|http:ClientError|jwt:Error {
    // Creates a new deposite without confirmation
    // Payload should have the F_ID
    // Returns the f_dep_ID of the new deposite
    string authHeader = check req.getHeader("Authorization");
    string jwt = authHeader.substring(7);
    var decRes = check jwt:decode(jwt);
    string? username = decRes[1].sub;
    string|string[]? audience = decRes[1].aud;

    if (audience != "users") {
        return error("Unauthorized request");
    }
    if(username is string){
        return username;
    }
    // sql:ParameterizedQuery query = `${username}`;
    // int|sql:Error response = dbClient->queryRow(query);
    
    // if (response is int) {
    //     return response;
    // }
    
    return http:NOT_FOUND;
    }
}

function init(){
    io:println("Server running on port 9090"); 
}