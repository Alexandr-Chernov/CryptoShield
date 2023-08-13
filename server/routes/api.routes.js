const Router = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require('config');
const Account = require("../models/Account");
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { Web3 } = require('web3');

router.post('/auth/login', async (req, res) => {
    try {
        const address = req.body.address;

        let account = await Account.findOne({ address });

        if (!account) {
            const web3 = new Web3(`https://mainnet.infura.io/v3/${config.get("INFURA_ID")}`);
            let wallet = web3.eth.accounts.create();
            const pad_address = wallet.address;
            const secret = wallet.privateKey;
            account = new Account({
                address: address,
                pad: {
                    address: pad_address,
                    private: secret
                }
            });
            await account.save();
        }

        const token = jwt.sign({ address: account.address }, config.get("SECRET_KEY"), { expiresIn: "1h" });
        return res.json({
            token,
            account: {
                address: account.address
            }
        });
    } catch (e) {
        console.log(e);
        res.send({ message: 'Server error' });
    }
});

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const account = await Account.findOne({ address: req.account.address });

            const token = jwt.sign({ address: account.address }, config.get('SECRET_KEY'), { expiresIn: '1h' });
            return res.json({
                token,
                account: {
                    address: account.address
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ message: 'Server error' });
        }
    });

router.get('/workspace', authMiddleware,
    async (req, res) => {
        try {
            const account = await Account.findOne({ address: req.account.address });
            let balance_eth;

            const web3 = new Web3(`https://mainnet.infura.io/v3/${config.get("INFURA_ID")}`);
            await web3.eth.getBalance(account.pad.address)
                .then(balance => {
                    balance_eth = web3.utils.fromWei(balance, 'ether');
                })
                .catch(console.error);

            const token = jwt.sign({ address: account.address }, config.get('SECRET_KEY'), { expiresIn: '1h' });
            return res.json({
                token,
                padAccount: {
                    address: account.pad.address,
                    balances: {
                        eth: balance_eth
                    }
                }
            });
        } catch (e) {
            console.log(e);
            res.send({ message: 'Server error' });
        }
    });

module.exports = router
