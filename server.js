#!/usr/bin/env node

import { getTeachers, computeDifficulty, computeRating } from './lib/rmp.js';
import express from "express";
import minimist from "minimist";
import bodyParser from "body-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));

const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

app.get('/app', (req, res) => {
    res.status(200).send('200 OK');
  })

app.get('/app/ratings/', async(req, res) => {
    let rating = await computeRating();
    res.send(rating);
})

app.get('/app/ratings/:teachers/', async(req, res) => {
    var teachersArr = (req.params.teachers).split("+");

    for (let i = 0; i < teachersArr.length; i++) {
	teachersArr[i] = teachersArr[i].replaceAll( '-',' ');
	}
	
    let rating = await computeRating(teachersArr);
    res.send(rating);
  })

app.get('/app/difficulty/', async(req, res) => {
    let difficulty = await computeDifficulty();
    res.send(difficulty);
})

app.get('/app/difficulty/:teachers/', async(req, res) => {
    var teachersArr = (req.params.teachers).split("+");

    for (let i = 0; i < teachersArr.length; i++) {
	teachersArr[i] = teachersArr[i].replaceAll( '-',' ');
	}
	
    let difficulty = await computeDifficulty(teachersArr);
    res.send(difficulty);
  })

app.get("*",(req, res) => {
	res.status(404).send("404 NOT FOUND");
})

app.listen(port);
