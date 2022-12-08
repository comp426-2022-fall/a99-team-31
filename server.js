#!/usr/bin/env node

import { getTeachers, computeDifficulty, computeRating } from './lib/rmp.js';
import express from "express";
import minimist from "minimist";
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";
import Database from "better-sqlite3"

const db = new Database('user.db');
db.pragma('journal_mode = WAL');

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='user';`)
let row = stmt.get();
if(row == undefined) {
  console.log('User database appears to be empty. Creating user database...')

  const sqlInit = `
      CREATE TABLE user (
        username TEXT PRIMARY KEY,
        password TEXT);`;
  db.exec(sqlInit)
} else {
  console.log('User database exists.')
}

const app = express();
app.use(express.urlencoded({ extended: true }));

const args = minimist(process.argv.slice(2));
const port = args.port || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/app/', (req, res) => {
    res.render('home');
  })

app.get('/app/login/', (req, res) => {
    /*res.render('login-fail');*/
    res.render('login-succ')
})

app.get('/app/newacc/', (req, res) => {
  res.render('create-fail');
  /*res.render('create-succ');*/
})

app.get('/app/login/history/', (req,res) => {
  res.render('history');
})

app.get('/app/login/acc/', (req,res) => {
  res.render('acc');
})

app.get('/app/login/delete', (req,res) =>{
  res.render('deleted');
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
