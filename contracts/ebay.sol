pragma solidity ^0.4.0;

contract ownable {
     address public owner = msg.sender;

    modifier onlyBy(address _account)
    {
        require(msg.sender == _account);
        _;
    }
}

contract sell is ownable {
    
    struct userDetails {
        string userName;
        string _userName;
        string password;
        string _password;
        string email;
        string Laddress;
        uint mobile;
    }
    
    struct itemDetail{
        address seller;
        address buyer;
        string name;
        string listingtype;
        string description;
        string location;
        uint price;
        uint finalPrice;
        uint timestamp;
        Shipment shipment;
        
        bool init;
    }
    
    struct Shipment {
        address courier;
        uint price;
        uint date;

        bool init;
  }
  
  struct Invoice {
        uint orderno;
        uint number;

        bool init;
  }
    
     mapping(address => userDetails) Users;    
     mapping(address => itemDetail)itemDBP;
     mapping(uint => itemDetail)itemDB;
     mapping (address => uint) public balances;
     mapping (uint => Invoice) invoices;
     uint orderId;
     uint invoiceId;
   
    modifier costs(uint price) {
        require(msg.value>=price);
        _;
    }
    
    event LogUserDetails(string Name, string email, uint mobile,string Laddress );
    event LogItemDetails(string ItemName, string ListingType, string Description, string Location, uint Price,uint timestamp);
    event Logbuy(uint orderNo, string Name, address Seller, address Buyer, uint Price, uint timestamp);
    event LogInvoice(uint invoiceId,uint orderId, string Laddress, uint deliveryDate, uint Price);
    
    function userRegistration(string _userName, string _password, string _email, string _Laddress, uint _mobile) public {
        
        Users[msg.sender].userName = _userName;
        Users[msg.sender].password = _password;
        Users[msg.sender].email = _email;
        Users[msg.sender].mobile = _mobile;
        Users[msg.sender].Laddress = _Laddress;
        
        emit LogUserDetails(_userName,_email,_mobile,_Laddress);
    }

   function login(string _usrName, string _pwd) public returns(string,string,string,string) {
        
        Users[msg.sender]._userName = _usrName;
        Users[msg.sender]._password = _pwd;
        
        return ( Users[msg.sender].userName, Users[msg.sender]._userName, Users[msg.sender].password,
        Users[msg.sender]._password);
   }
    
    function itemListing(string _name,string _listingtype, string _description, string _location, uint _price) public onlyBy(msg.sender) {
        
        orderId++;
        itemDB[orderId].seller = msg.sender;
        itemDB[orderId].name = _name;
        itemDB[orderId].listingtype = _listingtype;
        itemDB[orderId].description = _description;
        itemDB[orderId].location = _location;
        itemDB[orderId].price = _price;
        itemDB[orderId].timestamp = now;
        itemDB[orderId].init = true;
        itemDBP[msg.sender].seller = msg.sender;
        
        itemDBP[msg.sender].name = _name;
        itemDBP[msg.sender].listingtype = _listingtype;
        itemDBP[msg.sender].description = _description;
        itemDBP[msg.sender].location = _location;
        itemDBP[msg.sender].price = _price;
        
        emit LogItemDetails(_name,_listingtype,_description,_location,_price,block.timestamp);
       
    }
    
   
    function getListing(uint _orderId) public view returns(address,string,string,string,string,uint,uint) { 
        
        return (itemDB[_orderId].seller,itemDB[_orderId].name,itemDB[_orderId].listingtype,itemDB[_orderId].description,itemDB[_orderId].location,
        itemDB[_orderId].price,orderId);
        
    }
    
    function viewListingPersonal(address _address) public view onlyBy(msg.sender) 
     returns (string, string, string, string, uint) {
        
        return (itemDBP[_address].name, itemDBP[_address].listingtype, itemDBP[_address].description,
        itemDBP[_address].location, itemDBP[_address].price);
    }
    
    function buy(uint productid) payable public returns(bool)  {
       require(itemDB[orderId].init == true);
       itemDB[orderId].buyer = msg.sender;
       itemDB[orderId].shipment.price = 5;
       itemDB[orderId].shipment.date = now;
       assert(itemDB[orderId].price + itemDB[orderId].shipment.price == msg.value);
       itemDB[orderId].finalPrice = msg.value;
       balances[msg.sender] -= msg.value;
       balances[itemDB[productid].seller] += msg.value;
       itemDB[orderId].init = false;
       
       emit Logbuy(orderId,itemDB[orderId].name,itemDB[orderId].seller,itemDB[orderId].buyer,itemDB[orderId].finalPrice,block.timestamp);
       return (itemDB[orderId].init);
    }
    
    function invoice () public returns(address,string,uint,uint) {
        invoiceId++;
        return (itemDB[orderId].buyer,itemDB[orderId].name,itemDB[orderId].shipment.date,itemDB[orderId].finalPrice);
        
        emit LogInvoice(invoiceId,orderId,Users[msg.sender].Laddress,block.timestamp,itemDB[orderId].finalPrice);
    }
    
}

