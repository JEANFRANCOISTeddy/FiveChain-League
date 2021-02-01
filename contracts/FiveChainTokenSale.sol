pragma solidity ^0.5.0;
import "./FiveChainToken.sol";
import "./DaiToken.sol";

contract FiveChainTokenSale {
    string public name = "FiveChainToken Farm";
    FiveChainToken public tokenContract;
    DaiToken public daiToken;
    address public owner;

    address[] public stakers;
    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    
    event Sell(address _buyer, uint256 _amount);

    constructor(DaiToken _daiToken, FiveChainToken _tokenContract) public {
        owner = msg.sender;
        daiToken=_daiToken;
        tokenContract = _tokenContract;
    }

    //Deposit Tokens
    function depositTokens(uint _amount) public {
        require(_amount > 0, "amount cannot be 0");

        //Transfer investor tokens to Token Farm Contract
        daiToken.transferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] = balanceOf[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;   
    }


    //Withdraw Tokens
    function withdrawTokens() public {
        uint balance = balanceOf[msg.sender];

        require(balance > 0, "staking balance cannot be 0");
        daiToken.transfer(msg.sender, balance);

        balanceOf[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

    function issueTokens() public {
        //Pour chaque Dai = 1 FCT
        require(msg.sender == owner, "caller must be the owner");

        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = balanceOf[recipient];
            if(balance > 0) {
                tokenContract.transfer(recipient, balance);
            }
        }
    }
}