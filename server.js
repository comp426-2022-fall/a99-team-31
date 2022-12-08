#!/usr/bin/env node

import { getTeachers, computeDifficulty, computeRating } from './lib/rmp.js';
import express from "express";
import minimist from "minimist";
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";
import Database from "better-sqlite3"

const db = new Database('project.db');
db.pragma('journal_mode = WAL');

const sqlInit = `CREATE TABLE users ( user VARCHAR, pass VARCHAR);`;
try {
  db.exec(sqlInit);
} catch (error) {
}

const sqlInit2 = `CREATE TABLE data ( user VARCHAR, teachers VARCHAR, rating VARCHAR, difficulty VARCHAR );`
try {
    db.exec(sqlInit2);
} catch (error) {
}

const sqlInit3 = `CREATE TABLE logs ( user VARCHAR, message VARCHAR, time VARCHAR);`;
try {
  db.exec(sqlInit3);
} catch (error) {
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
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  let user = req.app.get('user')
  const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', ' a succesful login or return to home', '${today.toISOString()}');`;
  db.exec(stmt1)
  res.render('home');
})

app.get('/app/login/', (req, res) => {
    /*res.render('login-fail');*/
    const user = req.body.username;
    const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'attempt to login', '${today.toISOString()}');`;
    db.exec(stmt1)

    const stmt = db.prepare(`SELECT * FROM users WHERE user='${user}' and pass='${pass}';`);
    let row = stmt.get();
    console.log(stmt.all());
    if (row === undefined) {
        req.app.set('user', user);
        req.app.set('pass', pass);
        res.render('login-fail')
        //res.redirect('/newacc/');
    } else {
        req.app.set('user', user);
        req.app.set('pass', pass);
        //res.redirect('/app/login/acc/');
        res.render('login-succ')
    }
    
})

app.get('/app/newacc/', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const stmt2 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'attempt to create new user account', '${today.toISOString()}');`;
    db.exec(stmt2)

    const stmt1 = db.prepare(`SELECT * FROM users WHERE user='${user}'`);
    let row = stmt1.get();

    if (row === undefined) {
        const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
        db.exec(stmt)
        res.render('create-succ')
        //res.redirect('/app/login/acc/');
    } else {
        res.render('create-fail');
        //res.redirect('/app/login/')
    }
  
  /*res.render('create-succ');*/
})

app.get('/app/login/history/', (req,res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'viewed history', '${today.toISOString()}');`;
    db.exec(stmt1)
    const row = db.prepare(`SELECT * FROM data WHERE user = '${req.app.get('user')}';`);
    let all = row.all();
    res.render('history', {data: all});
})

app.get('/app/login/acc/', (req,res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'viewed account', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('acc', {user: req.app.get('user'), pass: req.app.get('pass')});
})

app.get('/app/login/delete', (req,res) =>{
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  let user1 = req.body.username
  const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user1}', 'deleted account', '${today.toISOString()}');`;
  db.exec(stmt1)

  const user = req.body.username;
  const pass = req.body.password;
  const stmt = `DELETE FROM users WHERE user='${user}' and pass='${pass}';`
  db.exec(stmt)
  res.render('deleted');
})

app.get('/app/login/ratings/', async(req, res) => {
    let rating = await computeRating();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'computed rating for predetermined proffessors', '${today.toISOString()}');`;
    db.exec(stmt1)
    const stmt2 = `INSERT INTO data (user, ratings) VALUES ('${user}', '${rating}');`;
    db.exec(stmt2)
    res.send(rating);
})

app.get('/app/login/ratings/:teachers/', async(req, res) => {
    var teachersArr = (req.params.teachers).split("+");

    for (let i = 0; i < teachersArr.length; i++) {
	    teachersArr[i] = teachersArr[i].replaceAll( '-',' ');
	  }
	
    let rating = await computeRating(teachersArr);
    
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'computed rating for user proffessors', '${today.toISOString()}');`;
    db.exec(stmt1)
    const stmt2 = `INSERT INTO data (user, teachers, rating) VALUES ('${user}', '${teachersArr}', '${rating}');`;
    db.exec(stmt2)
    res.send(rating);
  })

app.get('/app/login/difficulty/', async(req, res) => {
    let difficulty = await computeDifficulty();

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'computed difficulty of predetermined proffessors', '${today.toISOString()}');`;
    db.exec(stmt1)
    const stmt2 = `INSERT INTO data (user, difficulty) VALUES ('${user}', '${difficulty}');`;
    db.exec(stmt2)
    res.send(rating);
    res.send(difficulty);
})

app.get('/app/login/difficulty/:teachers/', async(req, res) => {
    var teachersArr = (req.params.teachers).split("+");

    for (let i = 0; i < teachersArr.length; i++) {
	teachersArr[i] = teachersArr[i].replaceAll( '-',' ');
	}
	
    let difficulty = await computeDifficulty(teachersArr);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'computed difficulty for user professors', '${today.toISOString()}');`;
    db.exec(stmt1)
    const stmt2 = `INSERT INTO data (user, teachers, difficulty) VALUES ('${user}', '${teachersArr}', '${difficulty}');`;
    db.exec(stmt2)
    res.send(rating);
    res.send(difficulty);
  })

app.get("*",(req, res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'entered invalid endpoint', '${today.toISOString()}');`;
    db.exec(stmt1)
	res.status(404).send("404 NOT FOUND");
})

app.listen(port);
