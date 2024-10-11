import ballerina/http;
import ballerina/io;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/sql;

// Create a MySQL client
mysql:Client dbClient = check new ("localhost", "root", "123#sgm", 
                              "kpp", 3306);

service / on new http:Listener(9090) {
    resource function get CheckSysAdmin(string inputUsername, string inputPassword) returns SysAdmin|http:NotFound {
        //Tells if the given username, password are correct 
        //Ex:-  http://localhost:9090/CheckSysAdmin?inputUsername=Geesan123&inputPassword=pass123
        sql:ParameterizedQuery qerry = `Select * FROM system_admins WHERE username = ${inputUsername} 
        and password = ${inputPassword}`;
        SysAdmin|sql:Error response = dbClient->queryRow(qerry);
        if(response is SysAdmin){
            return response;
        }
        return http:NOT_FOUND;
    }
}

function init(){
    io:println("Server running on port 9090"); 
}