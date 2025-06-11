let professor = {
    name: 'mauricio neto',
    age: 35,
    isActive: true,
    courses: [
        {title: 'programming lang 1', vagas: 40},
        {title: 'programming lang 2', vagas: 20},
        {title: 'frameworks', vagas: 50}
    ]
}

console.log(typeof professor);

let professorJson = JSON.stringify(professor);
console.log(typeof professorJson);
console.log(professorJson);


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

console.log("Date: " + schedule.meetups[1].date.getDate().concat(schedule.meetups[1].date.getFullYear()));