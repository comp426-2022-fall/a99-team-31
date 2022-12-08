#!/usr/bin/env node

import { getTeachers, computeDifficulty, computeRating } from './lib/rmp.js';
import express from "express";
import minimist from "minimist";
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));

const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/app', (req, res) => {
    res.render('home');
  })

app.get('/app/login', (req, res) => {
    /*res.render('login-fail');*/
    res.render('login-succ')
})

app.get('/app/newacc', (req, res) => {
  res.render('create-fail');
  /*res.render('create-succ');*/
})

app.get("/app/login/history", (req,res) => {
  res.render('history');
})

app.get('/app/login/ratings/', async(req, res) => {
    let rating = await computeRating();
    res.send(rating);
})

app.get('/app/login/ratings/:teachers/', async(req, res) => {
    var teachersArr = (req.params.teachers).split("+");

    for (let i = 0; i < teachersArr.length; i++) {
	teachersArr[i] = teachersArr[i].replaceAll( '-',' ');
	}
	
    let rating = await computeRating(teachersArr);
    res.send(rating);
  })

app.get('/app/login/difficulty/', async(req, res) => {
    let difficulty = await computeDifficulty();
    res.send(difficulty);
})

app.get('/app/login/difficulty/:teachers/', async(req, res) => {
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
