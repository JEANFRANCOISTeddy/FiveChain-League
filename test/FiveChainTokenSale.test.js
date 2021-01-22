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
    })

    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('FiveChainToken deployment', async () => {
        it('has a name', async () => {
            const name = await fiveChainToken.name()
            assert.equal(name, 'FiveChain Token')
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

})
