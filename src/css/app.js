




web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
			web3.eth.defaultAccount = web3.eth.accounts[0];
		

const bettingAddr = '0xcc24A44fbEA7e9953FAE11928e4FcfeD10C9Ff69';

const bettingAbi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "TitleBet",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[2]",
				"name": "nameTeams",
				"type": "bytes32[2]"
			},
			{
				"internalType": "int256[2]",
				"name": "values",
				"type": "int256[2]"
			}
		],
		"name": "addBet",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "addNewEmptyBet",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "OddsDataId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "betValue",
				"type": "uint256"
			}
		],
		"name": "bet",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "TitleBet",
				"type": "bytes32"
			},
			{
				"internalType": "enum Betting.BetStatus",
				"name": "betStatus",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "lengthOdds",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Winner",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			}
		],
		"name": "closeBet",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			}
		],
		"name": "getLengthOdds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "getOdds",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "initialBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "lengthBets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "myBets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
			},
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Winner",
				"type": "uint256"
			}
		],
		"name": "payout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "redeem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


var bettingContract = web3.eth.contract(bettingAbi);

var beting = bettingContract.at(bettingAddr);



App = {
	web3Provider: null,
	contracts: {},
	account: 'guest',
	isOwner: false,

	init: async function() {
		return await App.initWeb3();
		
	},

	initWeb3: async function() {
		if (typeof web3 !== 'undefined') {
			// If a web3 instance is already provided by Meta Mask.
			App.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
		
			
		}
		return App.initContract();
	},

	initContract: function() {
		$.getJSON("../../build/contracts/Betting.json", function(betting) {
			App.contracts.Betting = TruffleContract(betting);
			App.contracts.Betting.setProvider(App.web3Provider);
			return App.render();
		});

	},

	render: function(){
		var loader = $("#loader");
    	var content = $("#content");
		web3.eth.getCoinbase(function(err, account) {
			if(err === null){
				App.account = account;
				$("#accountAddress").html("Current account: " + account);
			}
		});

	
		App.contracts.Betting.deployed().then(function(_instance){
			return _instance.isOwner({from: App.account});
		}).then(function(isOwner){
			console.log("isOwner", isOwner);
			if(isOwner){
				
				App.contracts.Betting.deployed().then(function(_instance){
					return _instance.getBalance({from: App.account});
				}).then(function(bal){
					$("#redeem").append(`<button id="redeem" class="close-bet btn btn-success btn-sm">Redeem | ${web3.fromWei(bal, "ether")}</button><br><br>`);					
				});
				
			} else{
				$("#payoutABet").hide();
				$("#addABet").hide();
			}
			App.isOwner = isOwner;			
			return isOwner
		});

	
		App.contracts.Betting.deployed().then(function(_instance){

			bettingInstance = _instance;
			return bettingInstance.lengthBets();}).then(function(lengthBets){

			for(var i=lengthBets-1; i>=0; i--){

				bettingInstance.bets(i).then(function(_bet) {



					let bet = _bet;
					// if bet is open
					let TitleBetHTML = App.getTitleBetHTML(bet[0], bet[1], bet[2]);
					if(bet[2] == 0){					
						$("#openBets").append(TitleBetHTML);
						$("#closeABet").append(TitleBetHTML);
					} else if(bet[2] == 1){
						$("#payoutABet").append(TitleBetHTML);						
					}
				
						for(var j=0; j<2; j++){
							console.log("TEQT");

							let nameTeamIdx = j;

							bettingInstance.getOdds(i, nameTeamIdx).then(function(_Odds){
								if(bet[2] == 0){	
									
									$("#openBets").find("#bet-" + bet[0]).append(App.getOddsHTML(bet[0], nameTeamIdx, _Odds, false));
								} else if(bet[2] == 1){
									
									$("#payoutABet").find("#bet-"+bet[0]).append(App.getOddsHTML(bet[0], nameTeamIdx, _Odds, false));
								}
							});
						}
						if(App.isOwner){
							$("#openBets").find(`#bet-${bet[0]} ~ .close-bet-wrapper`).append(App.getCloseBetHTML(bet[0]));
						}
					
				});
			}
		});

		//get Prev Bets
		App.myBets();
	},


	getTitleBetHTML: function(betId, TitleBet, betStatus){
		html = `<div class="bet-card col-lg-5 col-lg-offset-1">`;
		html += `<div style="color: white" id="bet-${betId}">#${betId} ${web3.toAscii(TitleBet)}</div>`;
		html += `<div class="close-bet-wrapper"></div>`;
		html += `</div>`;
		return html;
	},

	getOddsHTML: function(betId, i, Odds, disablenameTeams){

		html = '<button id="bet-${betId}-option-${i}" class="bet-option btn btn-primary btn-sm ${disableOptions ? "disabled" : ""}"> <scrpit>${web3.toAscii(Odds[0])} | ${Odds[1]} | ${web3.fromWei(Odds[2], "ether")} </scrpit></button>';
		return html;
	},

	getCloseBetHTML: function(betId){

		html = '<button id="close-bet-${betId}" class="close-bet btn btn-primary btn-sm"> Close</button>';
		return html;
	},

	addBet: function(){
		
		var TitleBet;
		var nameTeams = [];
		var values = [];

		TitleBet = $("#TitleBet").val();

		$(".OddsnameTeam").each(function(){
			nameTeams.push($(this).val());
		});

		$(".OddsValue").each(function(){
			values.push(parseInt($(this).val()));
		});

		// add bet to the contract

		App.contracts.Betting.deployed().then(function(_instance){
			return _instance.addBet(TitleBet, nameTeams, values, {from: App.account, gas: 6721975 }).then(function(res){
				console.log("Bet has been added", res)
			}).catch(function(err){
				console.log(TitleBet);
				console.log("Error adding bet", err);
			});
		});
	},

	bet: function(betId, OddsDataId, betValue){
		App.contracts.Betting.deployed().then(function(_instance){
			return _instance.bet(betId, OddsDataId, betValue, {from: App.account, value: web3.toWei(betValue, "ether")});
		}).then(function(res){
			console.log("Bet has been placed", res);			
		});
	},

	closeBet: function(betId){
		if(App.isOwner){
			App.contracts.Betting.deployed().then(function(_instance){
				return _instance.closeBet(betId, {from: App.account, gas: 6721975 });
			}).then(function(res){
				console.log("Bet has been closed", res);			
			});
		} else{
			console.log("Unauthorized Access: Only admin can close a bet");
		}

	},

	payout: function(betId, OddsDataId){
		if(App.isOwner){	
			App.contracts.Betting.deployed().then(function(_instance){
				return _instance.payout(betId, OddsDataId, {from: App.account, gas: 6721975 });
			}).then(function(res){
				console.log("Bet has been settled", res);		
			}).catch(function(err){
				console.log("Error settling bet", err);
			});
		} else{
			console.log("Unauthorized access: Only admin can initiate payout");
		}
	},

	myBets: function(){
		App.contracts.Betting.deployed().then(function(_instance){
			return _instance.myBets({from: App.account, gas: 6721975 });
		}).then(function(res){
			var betValues = res[0];
			var nameTeams = res[1];
			var winStatuses = res[2];
			var OddsValues = res[3];
			
			if(betValues.length == 0){
			

			} else{
				$("#myBets").append(App.getMyBetHTML(betValues, nameTeams, winStatuses, OddsValues));
			}
		});
	},

	
	getMyBetHTML(betValues, nameTeams, winStatuses, OddsValues){
		html = `<table class="table">
    				<thead>
      					<tr>
					        <th>Choice</th>
					        <th>Bet Value</th>
					        <th>Reward</th>
				      	</tr>
				    </thead>
				    <tbody>`;
		for(var i=0; i<nameTeams.length; i++){
			var reward=0;
			var winStatus = web3.toUtf8(winStatuses[i]);
			if(OddsValues[i]>0 && winStatus == "won"){
				reward = "+" + betValues[i]*1+(OddsValues[i]*betValues[i])/100 + " ether";

			} else if(OddsValues[i]<0 && winStatus == "won"){

				reward = betValues[i]*1-(100*betValues[i])/OddsValues[i] + " ether";

			} else if(winStatus == "lost") {

				reward = `-${betValues[i]} ether`;

			} else{

				reward = "pending";

			}
			var color = "#FFFFFF";
			if(winStatus == "won"){
				color = "#aed581";
			} else if(winStatus == "lost"){
				color = "#e57373";
			}
			html += `<tr>
						<td style="color: ${color};}">${web3.toAscii(nameTeams[i])}</td>
						<td style="color: ${color};}">${betValues[i]} ether</td>
						<td style="color: ${color};}">${reward}</td>
					</tr>`;
			html += `</tbody>`;
		}
		return html;
	},

	getBalance: function(){
		// implemented before
	},

	redeem: function(){
		App.contracts.Betting.deployed().then(function(_instance){
			return _instance.redeem({from: App.account, gas: 6721975 });
		}).then(function(res){
			console.log("redeemed", res);
		});
	}
};

$(function() {
	$(window).load(function() {
		App.init();
	});
});

web3.eth.getAccounts(console.log);

