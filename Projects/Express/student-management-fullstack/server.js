const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data store
let students = [];
let nextId = 1;

// ==================== REST API ROUTES ====================

// GET all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// GET single student by ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
});

// POST - Add new student
app.post('/api/students', (req, res) => {
    const { name, rollNumber, marks } = req.body;
    
    if (!name || !rollNumber || marks === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newStudent = {
        id: nextId++,
        name: name,
        rollNumber: rollNumber,
        marks: marks
    };
    
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT - Update student
app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    
    const { name, rollNumber, marks } = req.body;
    if (name) student.name = name;
    if (rollNumber) student.rollNumber = rollNumber;
    if (marks !== undefined) student.marks = marks;
    
    res.json(student);
});

// DELETE - Remove student
app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Student not found' });
    
    const deleted = students.splice(index, 1)[0];
    res.json({ message: 'Student deleted', student: deleted });
});

// Start server
app.listen(PORT, () => {
    console.log('=================================');
    console.log('Server running at http://localhost:' + PORT);
    console.log('Open browser: http://localhost:' + PORT);
    console.log('=================================');
});