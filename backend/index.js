const express = require("express");
const router = require("./routes/formRouter");
const apiRouter = require("./routes/apiRouter");
const cors = require('cors');
const HTTP_PORT = process.env.HTTP_PORT;

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use('/', router);
app.use('/api/v1/', apiRouter);

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
})


