const professor = {
    name: 'Maurício Neto',
    age: 35,
    courses: [
        {description: 'programming lang 1', hours: 80},
        {description: 'programming lang 2', hours: 80},
        {description: 'data visualization', hours: 40},
    ]
}

let professorJSON = JSON.stringify(professor);
console.log(typeof professorJSON);
console.log(professorJSON);

let schedule = `{
"meetups": [
  { "title": "Conference 1", "date": "2017-11-30T12:00:00.000Z" },
  { "title": "Conference 2", "date": "2017-04-18T12:00:00.000Z" }
    ] 
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

console.log("Date: " + schedule.meetups[1].date.getFullYear());