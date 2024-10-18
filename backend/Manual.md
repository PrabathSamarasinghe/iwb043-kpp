### CheckLogged - returns if any user has logged into some ac
### Logout      - logs out from the acount
### AllBankStats -- pr


## User
### CheckUser       - returns User cookie
### Signup -- procedure required.
### User/unconfirmedFixedDeposites -- pr.
### User/unconfirmedSavingsDeposites -- pr.
### User/historyFixedDeposites   -- pr.
### User/historySavingsDeposites   -- pr.
### User/getFixedSuggestions  -- pr.
### User/getSavingsSuggestions  -- pr.
### User/FixedInvestRequest -- pr.
### User/SavingsInvestRequest -- pr.
### User/RemoveFixedInvestRequest   -Deletes a given fixedInvest
### User/RemoveSavingsInvestRequest -Deletes a given SavingsInvest
### User/name       - returns User full name
### User/verified   - returns if user is verified
### User/all        - returns all fields of reg_user entry

## SysAdmin 
### SysAdmin/name   - returns System Admin name
### CheckSysAdmin   - returns System Admin cookie
### NonVerifiedUsers -- pr
### NonVerifiedBankAdmins  -- pr
### VerifyUser
### VerifyBankAdmin
### DeleteUser
### DeleteBankAdmin


## BankAdmin
### CheckBankAdmin  - returns Bank Admin cookie
### Signup -- pr
### updateFixedInterestRate
### updateSavingsInterestRate
### addFixedInterestRate
### addSavingsInterestRate
### GetFixedDeposite
### GetSavingsDeposite
### ConfirmFixedDeposite
### ConfirmSavingsDeposite
### BankAdmin/bankID    - returns BankID of the Admin
### BankAdmin/verified  - returns if bank admin is verified
### BankAdmin/all   - returns all fields except password