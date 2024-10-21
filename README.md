# Ballerina Project - KPP Investments Planner
This is a project created by team KPP for the Innovate with Ballerina competition. This Web Application provides ease of access for the Investment options.
# Dependencies
The application is using React for the frontend, Ballerina for the backend, and MySql for the database
# Testing the Application
To test the application it is required to have Node, MySql and Ballerina installed.
## Setup Database
Execute the querries in the /database folder in the local database
## Setup Backend
run these commands from the root:
cd .\backend\BalServer\
bal run
## Setup Frontend
run these commands from the root in a seperate terminal:
cd .\frontend
npm install
npm run dev
## Testing
goto [localhost:](http://localhost:5173/) to see thw home page for the users
goto [localhost:](http://localhost:5173/login_bank) to login as a bank admin
goto [localhost:](http://localhost:5173/login_admin) to login as a system admin
goto [localhost:](http://localhost:5173/bank_admin_signup) to signup as a bank admin
