import ballerina/io;
import ballerina/http;

service / on new http:Listener(8080) {
    resource function get userData() returns http:Response|error?{
        //Initialize the response
        http:Response response = new;
        response.setTextPayload("This message is from the server");
        // Add CORS headers
        response.setHeader("Access-Control-Allow-Origin", "*");  // Allow all origins
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        return response;
    }
}
function init() {
    io:println("Server started on port 8080");
}
