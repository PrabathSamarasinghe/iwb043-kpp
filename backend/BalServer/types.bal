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