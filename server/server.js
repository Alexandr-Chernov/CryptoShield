const config = require("config");
const express = require('express'),
    app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./routes/api.routes');

const PORT = config.get('SERVER_PORT');

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const start = async () => {
    try {
        await mongoose
            .connect(config.get("DB_URL"), {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then((res) => console.log('Connected to DB'))
            .catch((error) => console.log(error));

        app.listen(PORT, () => {
            console.log(`PORT: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
