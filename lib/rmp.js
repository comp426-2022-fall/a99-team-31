import {default as rating} from '@mtucourses/rate-my-professors';
const { default: ratings} = rating

// UNC school ID for the MTU Courses API
const uncID = 'U2Nob29sLTEyMzI=';

// Getting the information useful for our application
const returnedKeys = [ "firstName", "lastName", "avgDifficulty", "avgRating"]

// If there is no teachers inputted, this array of teachers will be used for rating and difficulty 
const teacherList = ["kris jordan", "john martin", "brent munsell", "ketan mayer patel"]

// Searches for a teacher and retrieves ratings for the teacher
const getRatingsForTeacher = async (teacherName) => {
    const possibleTeachers = await ratings.searchTeacher(teacherName, uncID);
    if (!possibleTeachers.length) return {};

    const teacherId = possibleTeachers[0].id;
    const teacher = await ratings.getTeacher(teacherId);
  
    return Object
      .keys(teacher)
      .filter( key => returnedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = teacher[key];
        return obj;
  }, {});

};

// Calls the above function for each item in the array given an array of teachers as input
export async function getTeachers(namesArr) {
  const rmpPromises = []
  namesArr.forEach( name => rmpPromises.push(getRatingsForTeacher(name)))
  return Promise.allSettled(rmpPromises)
}

// For testing purposes, searches for professors given the default list
const searchTeachers = async () => {
  const teacherData = await getTeachers(teacherList)
}

searchTeachers()

// Finds difficulty of each teacher in the teacher array, and returns it in a JSON object after averaging
export async function computeDifficulty(teachers) {
  if (!teachers) {
    teachers = teacherList;
  }
  
  var sumOfDifficulty = 0
  const data = await getTeachers(teachers);
  var length = 0

  for (let i = 0; i < teachers.length; i++) {
    if (!isNaN(data[i].value.avgDifficulty))    {
      sumOfDifficulty += data[i].value.avgDifficulty;
      length +=1
    }
  }
  var difficulty = (sumOfDifficulty / length);
  let difficultyR = difficulty.toFixed(2);
  difficultyR = difficultyR.concat("/5");
  const difficultyObject = {'teachers': teachers,'averageDifficulty': difficultyR}

  return difficultyObject;
}

// Tests the compute difficulty function with no arguments/default teacher array 
const runDifficulty = async () => {
  const difficulty = await computeDifficulty();
}

runDifficulty()

// Finds rating of each teacher in the teacher array, and returns it in a JSON object after averaging
export async function computeRating(teachers) { 
   if (!teachers) {
    teachers = teacherList;
  }
    
  var sumOfRating = 0
  const data = await getTeachers(teachers) 
  var length = 0

  for (let i = 0; i < teachers.length; i++) {
    if (!isNaN(data[i].value.avgRating))    {
      sumOfRating += data[i].value.avgRating;
      length +=1;
    }
  }
  var rating = (sumOfRating / length);
  let ratingR = rating.toFixed(2);
  ratingR = ratingR.concat("/5");
  const ratingObject = {'teachers': teachers, 'averageRating': ratingR}
  return ratingObject;
}

// Tests the compute rating function with no arguments/default teacher array 
const runRating = async () => {
  const rating = await computeRating();
}

runRating()
