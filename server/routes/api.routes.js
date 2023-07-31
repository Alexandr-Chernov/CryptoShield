const Router = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require('config');
const Account = require("../models/Account");
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/createwallet', async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Uncorrect request", errors })
        }
        const { fromAddress } = req.body;

        ////
        // Создается кошелек
        // Сохраняется с созданным аккаунтом в бд в модели с fromAddress
        // account: { address: fromAddress, pad_address: newcreatedaddress }
        ////

        res.json({ message: `From: ${fromAddress}` });
    } catch (e) {
        console.log(e);
        res.send({ message: 'Server error' });
    }
});

router.post('/auth/login', async (req, res) => {
    try {
        const address = req.body.address;

        let account = await Account.findOne({ address });

        if (!account) {
            account = new Account({
                address: address
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

module.exports = router
