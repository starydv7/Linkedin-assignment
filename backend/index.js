// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', {
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

// API to add data
app.post('/api/add', async (req, res) => {
    try {
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
        // Get counts from MongoDB
        const addCount = await Data.countDocuments();
        const updateCount = await Data.countDocuments();
        res.json({ addCount, updateCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
