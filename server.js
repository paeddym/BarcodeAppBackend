const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.use(express.json());

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.post('/save-barcode', (req, res) => {
  const { barcode } = req.body;
  
  try {
    // Read the existing data or create an empty array
    const data = JSON.parse(fs.readFileSync('barcodes.json', 'utf8'));
    data.barcodes.push(barcode);
  
    // Write the updated data back to the file
    fs.writeFileSync('barcodes.json', JSON.stringify(data, null, 2));
  
    res.status(200).json({ message: 'Barcode saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/get-barcodes', (req, res) => {
    try {
      // Read the existing data from the JSON file
      const data = JSON.parse(fs.readFileSync('barcodes.json', 'utf8'));
  
      // Send the data as a JSON response
      res.status(200).json({ barcodes: data.barcodes });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
