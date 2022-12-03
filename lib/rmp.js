import {default as rating} from '@mtucourses/rate-my-professors';
const { default: ratings} = rating
const uncID = 'U2Nob29sLTEyMzI=';
const returnedKeys = [ "firstName", "lastName", "avgDifficulty", "avgRating"]
const teacherList = ["kris jordan", "john martin", "brent munsell", "ketan mayer patel"]

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

export async function getTeachers(namesArr) {
  const rmpPromises = []
  namesArr.forEach( name => rmpPromises.push(getRatingsForTeacher(name)))
  return Promise.allSettled(rmpPromises)
}

// for testing purposes
const run = async () => {
  const teacherData = await getTeachers(teacherList)
}

run()

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
  const difficultyObject = {'teachers': teachers,'averageDifficulty': difficultyR}

  return difficultyObject;
}

// for testing purposes
const runDifficulty = async () => {
  const difficulty = await computeDifficulty();
}

runDifficulty()

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
  const ratingObject = {'teachers': teachers, 'averageRating': ratingR}
  return ratingObject;
}

// for testing purposes
const runRating = async () => {
  const rating = await computeRating();
}

runRating()
