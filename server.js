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

// create table for users which contain the username and password
const sqlInit = `CREATE TABLE users ( user VARCHAR, pass VARCHAR);`;
try {
  db.exec(sqlInit);
} catch (error) {
}

// create table for data which contain the username, list of teachers, rating average, and average difficulty
const sqlInit2 = `CREATE TABLE data ( user VARCHAR, teachers VARCHAR, rating VARCHAR, difficulty VARCHAR );`
try {
    db.exec(sqlInit2);
} catch (error) {
}

// create table for user interactions which contain the username, a message of what activity was performed,
// and the time the interaction occurred
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

  // Add interaction to logs database, given the username and time
  const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', ' a succesful login or return to home', '${today.toISOString()}');`;
  db.exec(stmt1)
  res.render('home');
})

app.post('/app/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    // Add interaction to logs database, given the username and time
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'attempt to login', '${today.toISOString()}');`;
    db.exec(stmt1)
    // Searching if username exists
    const stmt = db.prepare(`SELECT * FROM users WHERE user='${user}' and pass='${pass}';`);
    let row = stmt.get();
    // If username is undefined, then login-fail is rendered
    if (row === undefined) {
        req.app.set('user', user);
        req.app.set('pass', pass);
        res.render('login-fail')
    } else {
        req.app.set('user', user);
        req.app.set('pass', pass);
        res.render('login-succ')
    }
    
})

app.post('/app/newacc', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    // Add interaction to logs database, given the username and time
    const stmt2 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'attempt to create new user account', '${today.toISOString()}');`;
    db.exec(stmt2)
  
    const stmt1 = db.prepare(`SELECT * FROM users WHERE user='${user}'`);
    let row = stmt1.get();
    // If username is undefined then create new user, else render create-fail
    if (row === undefined) {
        const stmt = `INSERT INTO users (user, pass) VALUES ('${user}', '${pass}');`;
        const stmt2 = `INSERT INTO data (user) VALUES ('${user}');`;
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
    // Add interaction to logs database, given the username and time
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'viewed history', '${today.toISOString()}');`;
    db.exec(stmt1)
    // Render all rows from logs database
    const row = db.prepare(`SELECT * FROM logs WHERE user = '${req.app.get('user')}';`);
    let all = row.all();
    res.render('history', {logs: all});
})

app.get('/app/login/acc/', (req,res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    // Add interaction to logs database, given the username and time
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'viewed account', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('acc', {user: req.app.get('user'), pass: req.app.get('pass')});
})

app.post('/app/login/acc/update/', (req,res) => {
  //Need to update the 'current' user to user with name 'username' and change password to 'password'
  const curruser = req.body.current;
  const username = req.body.username;
  const pass = req.body.password;

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  let user = req.app.get('user')
  // Add interaction to logs database, given the username and time
  const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'updated account', '${today.toISOString()}');`;
  db.exec(stmt1)
  // Update the users database to reflect new username and password
  const stm2 = `UPDATE users SET user = '${username}', pass = '${pass}' WHERE user = '${curruser}';`;
  db.exec(stm2)
  res.render('update', {user: req.app.get('user'), pass: req.app.get('pass')});
})

app.get('/app/login/delete', (req,res) =>{
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  let user1 = req.body.username
  // Add interaction to logs database, given the username and time
  const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user1}', 'deleted account', '${today.toISOString()}');`;
  db.exec(stmt1)
  // Delete user from 'data' and 'users' database when account is deleted
  let user = req.app.get('user')
  const stmt2 = `DELETE FROM data WHERE user='${user}';`;
  db.exec(stmt2)
  const stmt = `DELETE FROM users WHERE user='${user}';`;
  db.exec(stmt)
  
  res.render('deleted');
})
app.post('/app/login/ratings/', async(req, res) => {
    const t1 = req.body.t1;
    const t2 = req.body.t2;
    const t3 = req.body.t3;
    const t4 = req.body.t4;
    const t5 = req.body.t5;

    var teachersArr = []

    if (t1.length>0) {
      teachersArr.push(t1)
    }

    if (t2.length>0) {
      teachersArr.push(t2)
    }

    if (t3.length>0) {
      teachersArr.push(t3)
    }

    if (t4.length>0) {
      teachersArr.push(t4)
    }

    if (t5.length>0) {
      teachersArr.push(t5)
    }

    let rating = await computeRating(teachersArr);
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    // Add interaction to logs database, given the username and time
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'computed rating for user professors', '${today.toISOString()}');`;
    db.exec(stmt1)
    // Add the rating information to the users row in the 'data' database
    const stmt2 = `INSERT INTO data (user, teachers, rating) VALUES ('${user}', '${teachersArr}', '${rating}');`;
    db.exec(stmt2)
    let difficulty = await computeDifficulty(teachersArr);
    // Add interaction to logs database, given the username and time
    const stmt3 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'computed difficulty for user professors', '${today.toISOString()}');`;
    db.exec(stmt3)
    // Add the difficulty information to the users row in the 'data' database
    const stmt4 = `INSERT INTO data (user, teachers, difficulty) VALUES ('${user}', '${teachersArr}', '${difficulty}');`;
    db.exec(stmt4)
    const truerating = rating.averageRating;
    const truedifficulty = difficulty.averageDifficulty;
    res.render('ratings', {rating: truerating, difficulty: truedifficulty});
})

app.get("*",(req, res) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user = req.app.get('user')
    // Add interaction to logs database, given the username and time
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'entered invalid endpoint', '${today.toISOString()}');`;
    db.exec(stmt1)
	res.status(404).send("404 NOT FOUND");
})

app.listen(port);
