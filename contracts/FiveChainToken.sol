pragma solidity ^0.5.0;

contract FiveChainToken {
    string  public name = "FiveChain Token";
    string  public symbol = "FCT";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;
    
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approve(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[address(this)] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[address(this)] >= _value);
        
        balanceOf[address(this)] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(address(this), _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        
        emit Approve(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][address(this)]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][address(this)] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

}