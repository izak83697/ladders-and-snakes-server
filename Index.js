const morgan = require("morgan");
const mongoose = require('mongoose');
const express = require("express");
const socket = require("socket.io");

const GemeSchem = require("./Routers/GemeSchem");

const app = express();
 
mongoose.connect("mongodb+srv://Chaim24:" + process.env.MongoPasword + "@binders.uazlu3v.mongodb.net/binders");

mongoose.connection.on('connected', () => {
    console.log("Mongo db Connected !");
})

app.use((morgan('dev')));
app.use(express.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization');
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH ");
        return res.status(200).json({});
    }
    next();
})

app.use(express.static('public'));


app.use('/Geme', GemeSchem);

// app.get("/", async (req,res) => {
//     res.send("מונגו מחובר").status(200)
// })

app.use((req, res, next) => {
    const error = new Error('Soory, Not Found !');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            error: error.status
        }
    })
})





const PORT = process.env.PORT || 3010;

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});





const io = socket(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }  
});
 
io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('live On', ({data}) => {
        console.log(data);
        io.sockets.emit('live On React',data);
    });
});

