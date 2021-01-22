pragma solidity ^0.5.0;

contract PlayerCard {
    event NewPlayer(uint playerId, string name, string imgUrl, uint price);
    
    struct Player {
        string name;
        string imgUrl;
        uint price;
    }    
    
    struct Utilisateur {
        uint balance;
    }
    
    mapping(address => uint256) public balanceOf;
    mapping (uint => address) public cardToOwner;
    mapping (address => uint) ownerCardCount;
    mapping (address => Utilisateur) public UserBalanceAddr;
    
    Player[] public players;
    
    function createPlayer(string memory _name, string memory _imgUrl, uint _price) public {
        uint id = players.push(Player(_name, _imgUrl, _price)) - 1;
        cardToOwner[id] = msg.sender;
        ownerCardCount[msg.sender]++;
        emit NewPlayer(id, _name, _imgUrl, _price);
    }
    
    function buyPlayerCard(uint _id) public payable returns (uint) {
        uint cardAmount = players[_id].price;
        require(balanceOf[msg.sender] >= cardAmount);
        balanceOf[msg.sender] -= cardAmount;
        return cardAmount;
    }
}