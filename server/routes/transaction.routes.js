const Router = require("express");
const { validationResult } = require("express-validator");
const router = new Router();

router.post('/transaction', async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Uncorrect request", errors })
        }
        const { fromAddress, toAddress, amount } = req.body;

        ////
        // проверка на существоваение кошелька "toAddress"
        ////

        ////
        // Создается кошелек
        ////

        //// 
        // Предположительно, если аккаунт существует открывается смарт-контракт
        // для перевода валюты на созданный кошелек
        ////
        
        res.json({ message: `From: ${fromAddress}\nTo: ${toAddress}\nAmount: ${amount}` });
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'});
    }
})

module.exports = router
