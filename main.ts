#! /usr/bin/env node
import inquirer from 'inquirer' ;
// bank account interface 
interface  BankAccount{
    accountNumber : number ;
    balance  : number ;
     withdraw(amount :number): void  
     deposit(amount :number): void 
     checkBalance() : void  
   

}
// bank account class 
class BankAccount implements BankAccount {
    accountNumber : number ;
    balance  : number ;

    constructor(accountNumber : number , balance  : number ){
        this.accountNumber = accountNumber ;
        this.balance  = balance ;
    }
    // Debit money 
    withdraw(amount : number ): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log (`withdrawal of $$ {amount} successful.Remaining balance : $${this.balance}`)
        }else {
            console.log("Insufficient balance.");
        }
    }
    // credit money 
    deposit(amount :number): void {
        if( amount > 100){
            amount -= 1;
        }this.balance +=amount 
        console.log(`Deposit of $${amount} successful. Remaining balance :$${this.balance}`);
    }
    // check balance 
    checkBalance() : void{
        console.log(` current balance :$${this.balance}`);
}
}

// create class
    class Customer{
    firstName : string ;
    lastName :string;
    gender  : string ;
    age     : number;
    mobileNumber: number;
    account : BankAccount;

    constructor(firstName : string ,lastName :string,  gender  : string , age: number, mobileNumber: number, account : BankAccount)
    {
        this.firstName =firstName;
        this.lastName  =lastName;
        this.gender    =gender ;
        this.age       =age;
        this.mobileNumber = mobileNumber;
        this.account = account 
    }
}
// create bank accounts
const accounts : BankAccount[]= [

    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// create customer
const customers: Customer[]   = [
    new Customer ("Hamzah","Khan", "Male",35,3162223334, accounts[0]),
    new Customer ("shamsa","Khan", "Female",35,3322223334, accounts[1]),
    new Customer ("Areesha","Khan", "Female",35,3142223334, accounts[2])
]
// function to interact with bank account
async function service()  {
    do{
        const accountNumberInput = await inquirer.prompt({
          name :"accountNumber",
          type : "number",
          message : "Enter your account number :"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`welcome,${customer.firstName}${customer.lastName}`);
            const ans = await inquirer.prompt([{
                name : "select",
                type :  "list",
                message : "Select an operation",
                choices : ["Deposit","Withdraw","Check Balance","Exit"]

            }]);
            switch (ans.select) {
                case "Deposit" :
                    const depositAmount = await inquirer.prompt({
                        name : "amount ",
                        type : "number",
                        message :"Enter the amount to deposit:"
                    })
                   customer.account.deposit(depositAmount['amount ']);
                   break;
                   case "withdraw" :
                    const withdrawAmount = await inquirer.prompt({
                        name : "amount ",
                        type : "number",
                        message :"Enter the amount to deposit:"
                    })
                   customer.account.deposit(withdrawAmount['amount ']);
                   break;
                   case "check Balance" :
                    customer.account.checkBalance();
                    break;
                   case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services.Have a great day!");
                    return;
        }
    } else{
        console.log("Invalid account number .please try again.");
    }
}while(true)
}
service()



