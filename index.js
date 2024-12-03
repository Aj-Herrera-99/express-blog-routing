console.log("test");
const express = require("express");
const app = express();
const PORT = 3000;
const HOST = `http://localhost:${PORT}`;

app.get("/", (req, res) => {
    res.send("testing");
});

app.listen(PORT, () => {
    console.log(`Server aperto sulla porta ${PORT}
        ${HOST}`);
});
