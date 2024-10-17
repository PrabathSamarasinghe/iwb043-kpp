# Token issues:
    POST request payload should contain a valid username and a password
### CheckSysAdmin   - returns System Admin token
### CheckUser       - returns User token
### CheckBankAdmin  - returns Bank Admin token

# Direct Data read with token:
    Get request "Authorization"  header should contain a valid token
### SysAdmin/name   - returns System Admin name
### User/name       - returns User full name
### User/verified   - returns if user is registered
### User/all        - returns all fields of reg_user entry
### BankAdmin/bankID    - returns BankID of the Admin
### BankAdmin/all   - returns all fields except password
# To be added:
    

    # Direct Data inserts with token:
        POST request "Authorization"  header should contain a valid token
    ### User/FixedInvestRequest
    ### SavingsInvestRequest
    # Direct Data deletions with token:
        DELETE request "Authorization"  header should contain a valid token
    ### InvestRemove

    # Public data reads:
    ### AllBankStats
    # Bank admin only operations:
    ## data reads:
    ## data inserts:
    ## data updates:
    # System admin only operations:
    ## data reads:
    ## data inserts:
    ## data updates:


### Userdata -> db
### Bankdata -> db
### UncheckedUserbankreq <- db
### updateInteretrate -> db
### confirmedDeposites <- db
### historyDeposites   <- db
### 