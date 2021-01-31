const FiveChainToken = artifacts.require("FiveChainToken");
const FiveChainTokenSale = artifacts.require("FiveChainTokenSale");
const PlayerCard = artifacts.require("PlayerCard");
const DaiToken = artifacts.require("DaiToken");

module.exports = async  function(deployer, network, accounts) {
    await deployer.deploy(DaiToken);
    const daiToken = await DaiToken.deployed();

    await deployer.deploy(FiveChainToken);
    const fiveChainToken = await FiveChainToken.deployed();

    await deployer.deploy(FiveChainTokenSale, FiveChainToken.address, DaiToken.address);
    const fiveChainTokenSale = await FiveChainTokenSale.deployed();

    // Transfer all tokens to TokenFarm (1 million)
    await fiveChainToken.transfer(fiveChainTokenSale.address, '1000000000000000000000000')

    // Transfer 100 Mock DAI tokens to investor
    await daiToken.transfer(accounts[1], '100000000000000000000')

    await deployer.deploy(PlayerCard);
};