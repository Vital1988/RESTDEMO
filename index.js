const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
];

// GET 

app.get('/',(req,res) =>{
    res.send('Hello Vitaly');
});

app.get('/api/courses',(req,res) =>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('no such course');
    res.send(course);
});

// POST 

app.post('/api/courses',(req,res) => {
    if(!req.body.name){
        res.status(400).send('name is required')
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// PUT 

app.put('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('no such course');

    if(!req.body.name){
        res.status(400).send('name is required')
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

// DELETE

app.delete('/api/courses/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('no such course');

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
    
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listen on port ${port}...`);
});
