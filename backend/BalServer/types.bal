type SysAdmin record {|
    string username;
    string password;
    string name;
|};
type Cred record {|
    string username;
    string password;
|};
type BankAdmin record {|
    string username;
    string password;         
    int bank_ID;             
    string branch_name;      
    string service_No;       
    boolean verified;        
|};
type RegUser record {|
    string username;
    string NIC;
    string full_name;
    string gender;
    string birthday;
    string address;
    string phone_number;
    string e_mail;
    boolean verified;
|};
type NewUser record {
    string username;
    string password;
    string NIC;
    string full_name;
    string gender; 
    string birthday;
    string address;
    string phone_number;
    string? e_mail;
};
type FixedDeposit record {
    string product_name;
    string bank_name;
    int period;
    int f_dep_ID;
    decimal amount;
    string date_of_deposite;
};

type SavingsDeposit record {
    string product_name;
    string bank_name;
    int f_dep_ID;
    decimal amount;
    string date_of_deposite;
};
type FixedProduct record {|
    int f_ID;
    string product_name;
    string bank_name;
    int period;
    decimal interest_rate;
|};

type SavingsProduct record {|
    int s_ID;
    string product_name;
    string bank_name;
    decimal interest_rate;
|};