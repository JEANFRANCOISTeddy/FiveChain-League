pragma solidity ^0.5.0;


contract Betting {

uint256 public initialBalance = 50000;
    
    

// Structure d'un Paris 
	struct Bet{
		uint betId; // Id du Bet
		bytes32 TitleBet; // Titre du Bet
		mapping(uint => OddsData) Odds; // Enregistrer les Cotes
		BetStatus betStatus; // Statuts du Paris (Ouvert / En cours / Fermé)
		uint lengthOdds; // Longueurs des Cotes
		mapping(uint => BetterData[]) bettersData; // Enregistrer les informations du paris
		uint Winner; // Team Gagnante
	}

// Strucutre d'une Cotes
	struct OddsData{
		bytes32 nameTeam; // Nom de la team
		int value; // 
	}

//structure Des Parieurs
	struct BetterData{
		address payable better; // Address d'une Parieur
		uint value; // Valeurs du Paris
	}

// Structure du paris du Parieur
	struct BetterBetData{
		uint betId; // Id du Paris
		uint nameTeamId; // nameTeam Choisi
		uint betValue; // Valeur du Bet
	}
	
	address	payable owner; 

	mapping(uint => Bet) public bets; // Enregistre tout les Paris
	uint public lengthBets; // Longueur des Paris

	mapping(address => BetterBetData[]) betterCacheData; 
	mapping(address => uint256) public balanceOf;
	 


	enum BetStatus {Open, Closed, Settled} // Les diferents statuts d'un Paris

	
	constructor() public{
		owner = msg.sender; 
		balanceOf[msg.sender] = initialBalance;

		// Ajout de deux Paris Manuellement
		bytes32[2] memory nameTeams = [bytes32("Chelsea"), bytes32("Liverpool")];
		int[2] memory values = [int(105), -150];
		addBet(bytes32("Chelsea vs Liverpool"), nameTeams, values);

		nameTeams = [bytes32("Arsenal"), bytes32("Wolves")];
		values = [int(110), -160];
		addBet(bytes32("Arsenal vs Wolves"), nameTeams, values);
	}

	modifier onlyByOwner{
		require(msg.sender == owner, "Unauthorised Access");
		_;
	}

	
	function isOwner() public view returns(bool){
		if(msg.sender == owner){
			return true;
		} else{
			return false;
		}
	}

	// Ajout d'un Paris Vide
	function addNewEmptyBet() public{
		Bet memory bet;
		bets[lengthBets] = bet;
	}

	// Ajout d'un Paris
	function addBet(bytes32 TitleBet, bytes32[2] memory nameTeams, int[2] memory values) public onlyByOwner{
		addNewEmptyBet();
		Bet storage bet = bets[lengthBets];
		bet.betId = lengthBets; // Id
		bet.TitleBet = TitleBet; // Titre
		bet.betStatus = BetStatus.Open; // Status
		lengthBets+=1;
		//  Mets en place la team ainsi que la Cote
		for(uint i=0; i<nameTeams.length; i++){
			bet.Odds[i] = OddsData(nameTeams[i], values[i]);
		}
		bet.lengthOdds+=nameTeams.length;
	}

	// get total number of nameTeams in a bet. Currently only 2
	function getLengthOdds(uint betId) public view returns(uint){
		return bets[betId].lengthOdds;
	}

	// get team name and betting odd for a given bet and a given team
	function getOdds(uint betId, uint idx) public view returns(bytes32, int, uint){
		OddsData storage oddsData = bets[betId].Odds[idx];
		uint totalBetValue = 0;
		for(uint i=0; i<bets[betId].bettersData[idx].length; i++){
			totalBetValue += bets[betId].bettersData[idx][i].value;
		}
		return (oddsData.nameTeam, oddsData.value, totalBetValue);
	}

	// allows the user to bet
	function bet(uint betId, uint OddsDataId, uint betValue)  payable public{
	    require(balanceOf[msg.sender] >= betValue);
	    balanceOf[msg.sender] -= betValue;
		bets[betId].bettersData[OddsDataId].push(BetterData(msg.sender, msg.value)); // record betters address, choice and bet value
		betterCacheData[msg.sender].push(BetterBetData(betId, OddsDataId, betValue));
		
	}

	// returns all the bet made by a user
	function myBets() public view returns (uint[] memory, bytes32[] memory, bytes32[] memory, int[] memory){
		uint n = betterCacheData[msg.sender].length;

		uint[] memory betValues = new uint[](n);
		bytes32[] memory nameTeams = new bytes32[](n);
		bytes32[] memory winStatus = new bytes32[](n);
		int[] memory OddsValues = new int[](n);

		for(uint i=0; i<n; i++){
			uint betId = betterCacheData[msg.sender][i].betId;
			uint nameTeamId = betterCacheData[msg.sender][i].nameTeamId;

			betValues[i] = betterCacheData[msg.sender][i].betValue;
			nameTeams[i] = bets[betId].Odds[nameTeamId].nameTeam;

			if(bets[betId].betStatus == BetStatus.Open || bets[betId].betStatus == BetStatus.Closed){
				winStatus[i] = "pending";
			} else{
				if(bets[betId].Winner == nameTeamId){
					winStatus[i] = "won";
					OddsValues[i] = bets[betId].Odds[nameTeamId].value;
				} else{
					winStatus[i] = "lost";
				}
			}
		}
		return (betValues, nameTeams, winStatus, OddsValues);
	}

	// close a bet before the toss
	function closeBet(uint betId) public onlyByOwner{
		bets[betId].betStatus = BetStatus.Closed;
	}

	// start the payout process after the winner is known
	function payout(uint betId, uint Winner) public onlyByOwner{
		if(bets[betId].betStatus == BetStatus.Closed){
			bets[betId].Winner = Winner;
			for(uint i=0; i<bets[betId].bettersData[Winner].length; i++){
				address payable better = bets[betId].bettersData[Winner][i].better;
				uint betValue = bets[betId].bettersData[Winner][i].value;
				
				int OddsValue = bets[betId].Odds[Winner].value;
				if(address(this).balance > 0){
					if(OddsValue > 0){
						better.transfer(betValue+uint(OddsValue)*betValue/uint(100));
					} else{
						better.transfer(betValue+(uint(100)*betValue)/uint(-OddsValue));				
					}
				} else{
					break;
				}
			}
			bets[betId].betStatus = BetStatus.Settled;
		}
	}

	// get ethers held by the contact
	function getBalance() public view onlyByOwner returns(uint){
		return address(this).balance;
	}

	// redeem the ethers in the contract
	function redeem() public onlyByOwner{
		if(address(this).balance > 0){	
			bool allBetsSettled = true;
			/*for(uint i=lengthBets-1; i>=0; i--){
				if(bets[i].betStatus != BetStatus.Settled){
					allBetsSettled = false;
					break;
				}else{
					allBetsSettled = true;
				}
			}*/
			if(allBetsSettled){
				owner.transfer(address(this).balance);
			}
		}
	}
}
