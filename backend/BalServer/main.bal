import ballerina/http;
import ballerina/io;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/sql;

// Create a MySQL client
mysql:Client dbClient = check new ("localhost", "root", "123#sgm", 
                              "genplay", 3306);

service / on new http:Listener(9090) {
    resource function get videoCount() returns http:Response|error? {
        // Create a response and add CORS headers
        http:Response response = new;
        sql:ParameterizedQuery query = `SELECT vidcount from video_counts;`;
        // Reads the first  row of the query
        int result = check dbClient->queryRow(query);
        response.setTextPayload((result).toBalString());

        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");  // Allow all origins
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        return response; // Return the response object
    }
}

function init(){
    io:println("Server running on port 9090"); 
}