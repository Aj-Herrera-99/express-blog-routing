/**
    - Usando l'array dei post con le relative immagini, creare un file di routing (routers/posts.js) che conterrà le rotte necessarie per l'entità post.
    -All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete
    - Tutte le risposte saranno dei testi che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST. 
    Ad esempio:
    Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;
    Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”
    e via dicendo… 
    - Registrare il router dentro app.js con il prefisso /posts.
 */

// inizialization
const express = require("express");
const app = express();
const PORT = 3000;
const HOST = `http://localhost:${PORT}`;

// routers
const postsRouter = require("./assets/routers/posts");

// main logic
app.get("/", (req, res) => {
    res.send("testing");
});

// middlewares
app.use(express.static("public"));
app.use("/posts", postsRouter);

// fallback
app.all("*", (req,res) => {
    res.send(`<h1>404 Not Found</h1>`)
})

// server opening
app.listen(PORT, () => {
    console.log(`Server aperto sulla porta ${PORT}
        ${HOST}`);
});
