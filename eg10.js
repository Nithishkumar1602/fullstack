const express = require('express');
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/eg10.html');
});

app.post('/calculate', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const bmi = weight / (height * height);
  res.send(`Your BMI is: ${bmi.toFixed(2)}`);
});

app.listen(port, () => {
  console.log(`BMI Calculator app listening at http://localhost:${port}`);
});
