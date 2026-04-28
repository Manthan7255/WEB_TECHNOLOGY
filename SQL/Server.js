const express = require('express');
const app = express();

app.use(express.json());

// GET
app.get('/students', (req, res) => {
  res.send('Get list of students');
});

// POST
app.post('/students', (req, res) => {
  const student = req.body;
  res.send(`Create student: ${JSON.stringify(student)}`);
});

// UPDATE (PUT)
app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  res.send(`Update student ${id} with ${JSON.stringify(updates)}`);
});

// DELETE
app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Delete student ${id}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));