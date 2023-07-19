const router = require('express').Router();
const path = require('path');
const fs = require('fs');

// adds a note to db.json
const addToDB = (note) => {
    fs.readFile('db/db.json', (err, data) => {
        let notes = [];
        // console.log('data: ' + data);
        if(data[0]){
            notes = JSON.parse(data);
        }
        notes.push(note);
        fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
            if(err) { console.error(err) }
        });
    });
}

router.get('/', async (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if(data[0]){
            res.json(JSON.parse(data));
        }
    })
});

router.post('/', async (req, res) => {
    if(req.body.title && req.body.text){
        const note = {
            title: req.body.title,
            text: req.body.text
        };
        addToDB(note);
        res.status(200).json(note);
    }else{
        res.json({ message: 'need title and text'});
    }
});

router.delete('/:title', async (req, res) => {
    console.log(req.params.title);
    fs.readFile('db/db.json', (err, data) => {
        var notes = JSON.parse(data);
        console.log(notes.length);
        for(let i = 0; i < notes.length; i++){
            if(notes[i].title === req.params.title){
                console.log('match at ' + i);
                notes.splice(i, 1);
                fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
                    if(err){ console.error(err) }
                });
                break;
            }
        }
    });
    res.status(200).json({ message: 'note deleted'});
});

module.exports = router;