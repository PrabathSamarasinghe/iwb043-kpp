# User
### CheckUser       - returns User cookie
### User/RemoveFixedInvestRequest   -Deletes a given fixedInvest
 Ex: param ==>  {"F_dep_ID" : 1}
### User/RemoveSavingsInvestRequest -Deletes a given SavingsInvest
 Ex: param ==>  {"S_dep_ID" : 1}
### User/name       - returns User full name
### User/verified   - returns if user is verified
### User/all        - returns all fields of reg_user entry

## Pr
### SignupUser -- pr.
 Ex: payload ==>
 {
  "username": "john_doe",
  "password": "P@ssw0rd123",
  "NIC": "199012345678",
  "full_name": "John Doe",
  "gender": "Male",
  "birthday": "1990-01-01",
  "address": "123 Main St, City, Country",
  "phone_number": "+94123456789",
  "e_mail": "john.doe@example.com"
}
### User/unconfirmedFixedDeposites -- pr.
### User/unconfirmedSavingsDeposites -- pr.
### User/historyFixedDeposites   -- pr.
### User/historySavingsDeposites   -- pr.
### User/getFixedSuggestions  -- pr.
 Ex: payload ==>
 {"period": 12,
  "amount": 5000.00}
### User/getSavingsSuggestions  -- pr.
 Ex: payload ==>{"amount": 5000.00}
### User/FixedInvestRequest -- pr.
 Ex: payload ==>
 {"F_ID": 1,
  "amount": 5000.00}
### User/SavingsInvestRequest -- pr.
 Ex: payload ==>
 {"S_ID": 2,
  "amount": 5000.00}


# SysAdmin 
### SysAdmin/name   - returns System Admin name
### CheckSysAdmin   - returns System Admin cookie
### VerifyUser      - verifies the given user
 Ex: payload ==> {username : "user1"}
### VerifyBankAdmin - verifies the given bank admin
 Ex: payload ==> {username : "user1"}

## pr
### NonVerifiedUsers -- pr.
### NonVerifiedBankAdmins  -- pr.
### DeleteUser  -- pr.
 Ex: param ==>  {username : "user1"}
### DeleteBankAdmin -- pr.
 Ex: param ==>  {username : "user1"}


# BankAdmin
### CheckBankAdmin  - returns Bank Admin cookie
### ConfirmFixedDeposite    - Confirms a fixed deposite
 Ex: payload ==>{"F_dep_ID": 2}
### ConfirmSavingsDeposite  - Confirms a savings deposite
 Ex: payload ==>{"S_dep_ID": 2}
### BankAdmin/bankID    - returns BankID of the Admin
### BankAdmin/verified  - returns if bank admin is verified
### BankAdmin/all   - returns all fields

## Pr
### Signup -- pr.
 Ex: payload ==>
{
  "username": "jane_smith",
  "password": "SecurePass@789",
  "bank_name": "ABC Bank",
  "branch_name": "Downtown Branch",
  "service_No": "1234567890"
}
### UpdateFixedRate -- pr.
 Ex: payload ==>
 {"F_ID": 2,
  "newRate": 5.00}
### UpdateSavingsRate -- pr.
 Ex: payload ==>
 {"S_ID": 2,
  "newRate": 5.00}
### GetFixedDeposite -- pr.
 Ex: payload ==>{"F_dep_ID": 2}
### GetSavingsDeposite  -- pr.
 Ex: payload ==>{"S_dep_ID": 2}


# Common
### CheckLogged - returns the usertype if any user has logged in otherwise 404.
### Logout      - logs out from the acount

## Pr
### AllBankStats -- pr.