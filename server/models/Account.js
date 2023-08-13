const { Schema, model } = require('mongoose');


const Account = new Schema({
    address: {
        type: String,
        unique: true,
        required: true
    },
    pad: {
        address: {
            type: String,
            unique: true,
            required: true
        },
        private: {
            type: String,
            unique: true,
            required: true
        }
    }

});

module.exports = model('Account', Account)