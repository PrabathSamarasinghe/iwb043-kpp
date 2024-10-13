import ballerina/http;
import ballerina/io;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/sql;
import ballerina/jwt;

// Create a MySQL client
mysql:Client dbClient = check new ("localhost", "root", "123#sgm", 
                              "kpp", 3306);

final string secretKey = "KPP_secret";

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service / on new http:Listener(9090) {
    resource function post CheckSysAdmin(SysAdminCred payl) returns string|http:NotFound|http:ClientError|jwt:Error {
        //Returns a token for system admin credentials
        //Ex:-  http://localhost:9090/CheckSysAdmin?inputUsername=Geesan123&inputPassword=pass123
        sql:ParameterizedQuery qerry = `Select * FROM system_admins WHERE username = ${payl.username} 
        and password = ${payl.password}`;
        SysAdmin|sql:Error response = dbClient->queryRow(qerry);
        if(response is SysAdmin){
            jwt:IssuerConfig issuerConfig = {
            username: payl.username,
            issuer: "KPP",
            audience: "users",
            expTime: 3600,
            signatureConfig: {
                config: secretKey,
                algorithm: jwt:HS256
            }
        };
        string jwt = check jwt:issue(issuerConfig);
        return jwt;
        }
        return http:NOT_FOUND;
    }
    resource function post SysAdmin/name(http:Request req) returns string?|error{
        //Authorization header tag must have a valid token
        string jwt = check req.getHeader("Authorization");
        var decRes = check jwt:decode(jwt);
        return decRes[1].sub;
    }
}

function init(){
    io:println("Server running on port 9090"); 
}