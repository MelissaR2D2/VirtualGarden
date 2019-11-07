const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

let items = [{
        id: 0,
        color: "red",
        img: ""
    },
    {
        id: 1,
        color: "blue",
        img: ""
    }
];
let id = 0;

app.post('/api/flowers', (req, res) => {
    id = id + 1;
    let item = {
        id: id,
        color: req.body.color,
        img: req.body.img
    };
    items.push(item);
    res.send(item);
});

app.get('/api/flowers', (req, res) => {
    res.send(items);
});

app.put('/api/flowers/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let itemsMap = items.map(item => {
        return item.id;
    });
    let index = itemsMap.indexOf(id);
    if (index === -1) {
        res.status(404)
            .send("Sorry, that item doesn't exist");
        return;
    }
    let item = items[index];
    item.color = req.body.color;
    item.img = req.body.img;
    res.send(item);
});

app.delete('/api/flowers/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = items.map(item => {
            return item.id;
        })
        .indexOf(id);
    if (removeIndex === -1) {
        res.status(404)
            .send("Sorry, that item doesn't exist");
        return;
    }
    items.splice(removeIndex, 1);
    res.sendStatus(200);
});

app.listen(4200, () => console.log('Server listening on port 4200!'));
