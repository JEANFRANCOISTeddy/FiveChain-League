const DaiToken = artifacts.require('DaiToken')
const FiveChainToken = artifacts.require('FiveChainToken')
const FiveChainTokenSale = artifacts.require('FiveChainTokenSale')

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('fiveChainTokenSale', ([owner, investor]) => {
    let daiToken, fiveChainToken, fiveChainTokenSale

    before(async () => {
        daiToken = await DaiToken.new()
        fiveChainToken = await FiveChainToken.new()
        fiveChainTokenSale = await FiveChainTokenSale.new(daiToken.address, fiveChainToken.address)

        await fiveChainToken.transfer(fiveChainTokenSale.address, tokens('1000000'))

        await daiToken.transfer(investor, tokens('100'), { from: owner })
    })

    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })     
        
        it('contract has symbol', async () => {
            const name = await daiToken.symbol()
            assert.equal(name, 'mDAI')
        })
    })

    

    describe('FiveChainToken deployment', async () => {
        it('has a name', async () => {
            const name = await fiveChainToken.name()
            assert.equal(name, 'FiveChain Token')
        })
        
        it('contract has symbol', async () => {
            const name = await fiveChainToken.symbol()
            assert.equal(name, 'FCT')
        })
    })

    describe('FiveChainTokenSale deployment', async () => {
        it('has a name', async () => {
            const name = await fiveChainTokenSale.name()
            assert.equal(name, 'FiveChainToken Farm')
        })

        it('contract has tokens', async () => {
            let balance = await fiveChainToken.balanceOf(fiveChainTokenSale.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })
    })

    describe('Farming tokens', async () => {

        it('rewards investors for staking mDai tokens', async () => {
          let result
    
          // Check investor balance before staking
          result = await daiToken.balanceOf(investor)
          assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking')
    
          // Stake Mock DAI Tokens
          await daiToken.approve(fiveChainTokenSale.address, tokens('100'), { from: investor })
          await fiveChainTokenSale.depositTokens(tokens('100'), { from: investor })
    
          // Check staking result
          result = await daiToken.balanceOf(investor)
          assert.equal(result.toString(), tokens('0'), 'investor Mock DAI wallet balance correct after staking')
    
          result = await daiToken.balanceOf(fiveChainTokenSale.address)
          assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')
    
          result = await fiveChainTokenSale.balanceOf(investor)
          assert.equal(result.toString(), tokens('100'), 'investor staking balance correct after staking')
    
          result = await fiveChainTokenSale.isStaking(investor)
          assert.equal(result.toString(), 'true', 'investor staking status correct after staking')
    
          // Issue Tokens
          await fiveChainTokenSale.issueTokens({ from: owner })
    
          // Check balances after issuance
          result = await fiveChainToken.balanceOf(investor)
          assert.equal(result.toString(), tokens('100'), 'investor DApp Token wallet balance correct affter issuance')
    
          // Ensure that only onwer can issue tokens
          await fiveChainTokenSale.issueTokens({ from: investor }).should.be.rejected;
    
          // Unstake tokens
          await fiveChainTokenSale.withdrawTokens({ from: investor })
    
          // Check results after unstaking
          result = await daiToken.balanceOf(investor)
          assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct after staking')
    
          result = await daiToken.balanceOf(fiveChainTokenSale.address)
          assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI balance correct after staking')
    
          result = await fiveChainTokenSale.balanceOf(investor)
          assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after staking')
    
          result = await fiveChainTokenSale.isStaking(investor)
          assert.equal(result.toString(), 'false', 'investor staking status correct after staking')
        })
    })

})
