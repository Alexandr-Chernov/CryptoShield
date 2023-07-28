const express = require('express'),
    app = express();
const cors = require('cors');
const transactionRouter = require('./routes/transaction.routes');

const HOST = 'localhost';
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/', transactionRouter);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`PORT: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
