const config = require('config')
const express = require('express')
const app = express();

app.get('/', (req, res) => {
    console.log(config.get('vidly_jwtPrivateKey'))
    res.send("hello")
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))