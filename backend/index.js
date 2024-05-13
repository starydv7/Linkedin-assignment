// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware

// Create an Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://user:user123@cluster0.fzdi8au.mongodb.net/linkedin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define a schema for your data
const dataSchema = new mongoose.Schema({
    // Define your schema fields here
    // Example:
    name: String,
    age: Number,
});

// Create a mongoose model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Initialize counters
let addCount = 0;
let updateCount = 0;

// API to add data
app.post('/api/add', async (req, res) => {
    try {
        // Increment the addCount
        addCount++;
        // Create a new document
        const newData = new Data(req.body);
        // Save the document to the database
        await newData.save();
        res.json({ message: 'Data added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to update data
app.put('/api/update/:id', async (req, res) => {
    try {
        // Increment the updateCount
        updateCount++;
        // Find the document by ID and update it
        await Data.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Data updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get counts
app.get('/api/count', async (req, res) => {
    try {
        // Send the counts
        res.json({ addCount, updateCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/api/data', async (req, res) => {
    try {
        // Fetch all data from the database
        const allData = await Data.find();
        res.json(allData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 8080; // Change port to 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
