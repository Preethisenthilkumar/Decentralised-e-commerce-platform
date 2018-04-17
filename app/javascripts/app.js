import '../stylesheets/app.css';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
import './browser-solc.js';

var accounts;
var account;
var ebayContract;
var ebayCode;

window.App = {
  start: function () {
    var self= this;
    web3.eth.getAccounts(function (err,accs){
      console.log(accs);
      if(err != null) {
        alert("There was an error fetching your account");
        return;
      }
      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your ethereum client is configured properly ");
        return;
      }
      accounts = accs;
      account = accounts[0];
      web3.eth.defaultAccount = account;
      BrowserSolc.loadVersion('soljson-v0.4.17+commit.bdeb9e52.js', function (compiler) {

        ebayContract = web3.eth.contract([ { "constant": false, "inputs": [ { "name": "_name", "type": "string" }, { "name": "_listingtype", "type": "string" }, { "name": "_description", "type": "string" }, { "name": "_location", "type": "string" }, { "name": "_price", "type": "uint256" } ], "name": "itemListing", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_orderId", "type": "uint256" } ], "name": "getListing", "outputs": [ { "name": "", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_usrName", "type": "string" }, { "name": "_pwd", "type": "string" } ], "name": "login", "outputs": [ { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_address", "type": "address" } ], "name": "viewListingPersonal", "outputs": [ { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "string", "value": "" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "invoice", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x6ddd8cf0299a08ddc1ee0a5402a62557cfc9b3ed" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_userName", "type": "string" }, { "name": "_password", "type": "string" }, { "name": "_email", "type": "string" }, { "name": "_Laddress", "type": "string" }, { "name": "_mobile", "type": "uint256" } ], "name": "userRegistration", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "productid", "type": "uint256" } ], "name": "buy", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "Name", "type": "string" }, { "indexed": false, "name": "email", "type": "string" }, { "indexed": false, "name": "mobile", "type": "uint256" }, { "indexed": false, "name": "Laddress", "type": "string" } ], "name": "LogUserDetails", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "ItemName", "type": "string" }, { "indexed": false, "name": "ListingType", "type": "string" }, { "indexed": false, "name": "Description", "type": "string" }, { "indexed": false, "name": "Location", "type": "string" }, { "indexed": false, "name": "Price", "type": "uint256" }, { "indexed": false, "name": "timestamp", "type": "uint256" } ], "name": "LogItemDetails", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "orderNo", "type": "uint256" }, { "indexed": false, "name": "Name", "type": "string" }, { "indexed": false, "name": "Seller", "type": "address" }, { "indexed": false, "name": "Buyer", "type": "address" }, { "indexed": false, "name": "Price", "type": "uint256" }, { "indexed": false, "name": "timestamp", "type": "uint256" } ], "name": "Logbuy", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "invoiceId", "type": "uint256" }, { "indexed": false, "name": "orderId", "type": "uint256" }, { "indexed": false, "name": "Laddress", "type": "string" }, { "indexed": false, "name": "deliveryDate", "type": "uint256" }, { "indexed": false, "name": "Price", "type": "uint256" } ], "name": "LogInvoice", "type": "event" } ]);
      });
   });
  },

  userRegistration: function () {
    var _userName = document.getElementById('_userName').value;
    var _password = document.getElementById('_password').value;
    var _email = document.getElementById('_email').value;
    var _mobile = document.getElementById('_mobile').value;
    var _Laddress = document.getElementById('_Laddress').value;

    var deployedCode = ebayContract.at('0xf48F7e97F47dd9F5812c067900fAB9502E1Db336');

    deployedCode.userRegistration(_userName,_password,_email,_mobile,_Laddress, function (error) {
      if(error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var logUserDetails = deployedCode.LogUserDetails();
      logUserDetails.watch(function(error,result) {
        if(!error) {
          console.log(result);
        }
      });
      document.getElementById('message').innerText = login.html;
    });

  },

  login: function () {
    var _usrName = document.getElementById('_usrName').value;
    var _pwd = document.getElementById('_pwd').value;

    var deployedCode = ebayContract.at('0xf48F7e97F47dd9F5812c067900fAB9502E1Db336');

    deployedCode.login.call(_usrName,_pwd, function (error,trailCount) {
      if(error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }
  
        var index = trailCount - 1;
        if (index < 0) {
          document.getElementById('message').innerText = 'No data found.';
          return;
        }
        
        
        deployedCode.login.call(_usrName,_pwd,function (error, returnValues) {
          if (error) {
            console.error(error);
            document.getElementById('message').innerText = error;
            return;
          }
          
          console.log(returnValues);
          if((returnValues[0]==returnValues[1]) && (returnValues[2]==returnValues[3])) {
            document.getElementById('message').innerText = 'Login Successful';
            document.getElementById('login').disabled = true;
          }
          else
          window.alert ("Login Unsuccessful");
        });
    
    });

  },

  itemListing: function () {
    var _itemName = document.getElementById('_itemName').value;
    var _listingType = document.getElementById('_listingType').value;
    var _description = document.getElementById('_description').value;
    var _location = document.getElementById('_location').value;
    var _price = document.getElementById('_price').value;

    var deployedCode = ebayContract.at('0xf48F7e97F47dd9F5812c067900fAB9502E1Db336');

    deployedCode.itemListing(_itemName,_listingType,_description,_location,_price, function (error) {
      if(error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }
      var logItemDetails = deployedCode.LogItemDetails();
      logItemDetails.watch(function(error,result) {
        if(!error) {
          console.log(result);
        }
      });
      document.getElementById('message').innerText = "Item Successfully Posted";
    });

  },

  getListing: function () {
    
   var deployedCode = ebayContract.at('0xf48F7e97F47dd9F5812c067900fAB9502E1Db336');
    var itemId = document.getElementById("itemId").value;
    deployedCode.getListing.call(itemId,function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
        return;
      }
      
      
      deployedCode.getListing.call(itemId,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }
        
        console.log(returnValues);
        
       // document.getElementById('seller').value = returnValues[0];
        document.getElementById('items').style.visibility='visible';
        document.getElementById('name').value = returnValues[1];
        document.getElementById('type').value = returnValues[2];
        document.getElementById('des').value = returnValues[3];
        document.getElementById('loc').value = returnValues[4];
        document.getElementById('price').value = returnValues[5];
        document.getElementById('orderno').value =returnValues[6];
        
      });
    
    });
  },

  viewListingPersonal: function () {
    console.log(account);
    var deployedCode = ebayContract.at('0xf48F7e97F47dd9F5812c067900fAB9502E1Db336');
    deployedCode.viewListingPersonal.call(account,function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
        return;
      }
      
      
      deployedCode.viewListingPersonal.call(account,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }
        
        console.log(returnValues);
        document.getElementById('pitems').style.visibility='visible';
        document.getElementById('pname').value = returnValues[0];
        document.getElementById('ptype').value = returnValues[1];
        document.getElementById('pdes').value = returnValues[2];
        document.getElementById('ploc').value = returnValues[3];
        document.getElementById('ppri').value = returnValues[4];
       
      });
    });
  },

  buy: function () {
    var itemId = document.getElementById("itemId").value;
    console.log(itemId);
    var deployedCode = ebayContract.at('0xf48F7e97F47dd9F5812c067900fAB9502E1Db336');
    deployedCode.buy.call(itemId,function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }

      var index = trailCount - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
        return;
      }
      
      deployedCode.buy.call(itemId,function (error, returnValues) {
        if (error) {
          console.error(error);
          document.getElementById('message').innerText = error;
          return;
        }
        console.log(returnValues);
        if(returnValues=="true") {
          document.getElementById("buy").value = "Sold";
          document.getElementById("buy").style.color = "red"; 
        }
      });
    });
  },

  invoice: function () {
    var deployedCode = ebayContract.at('0xf48F7e97F47dd9F5812c067900fAB9502E1Db336');
    deployedCode.invoice.call(function (error, trailCount) {
      if (error) {
        console.error(error);
        document.getElementById('message').innerText = error;
        return;
      }
      var index = trailCount - 1;
      if (index < 0) {
        document.getElementById('message').innerText = 'No data found.';
        return;
      }
      console.log(trailCount);
      document.getElementById('invoice1').style.visibility='visible';
      document.getElementById("oname").value = trailCount[1];
      document.getElementById("sdate").value = trailCount[2];
      document.getElementById("fianlPrice").value = trailCount[3];
    })
  }

};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }

  App.start();
});
