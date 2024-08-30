import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 4000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;
let recommendedCollegesCollection;

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('college_predictor');
    collection = db.collection('Colleges');
    recommendedCollegesCollection = db.collection('Recommended');

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if we cannot connect
  }
}

connectToDB();

app.get('/api/filters', async (req, res) => {
  try {
      const college_name = await collection.distinct('College Name');
      const branches = await collection.distinct('Branch Name');
      const categories = await collection.distinct('Category');
      const courses = await collection.distinct('Course Name');
      const city = await collection.distinct('District');
      const links = await collection.distinct('Website URL');
      res.json({ college_name,branches, categories, courses, city, links});
  } catch (error) {
      console.error('Error occurred while fetching filters', error);
      res.status(500).json({ error: 'An error occurred while fetching filters' });
  }
});


app.post('/api/predict', async (req, res) => {
  const { percentile, city, Branch_Name, Category, Course_Name } = req.body;

  const query = {};

  if (city && city.trim() !== '' && city !== '-- select an option --') {
    query['District'] = city.trim(); 
  }

  if (percentile && percentile.trim() !== '') {
    const percentileNumber = parseFloat(percentile);
    if (!isNaN(percentileNumber)) {
      query['percentile'] = { $lte: percentileNumber };
    } else {
      return res.status(400).json({ error: 'Invalid percentile value' });
    }
  }

  if (Branch_Name && Branch_Name.trim() !== '' && Branch_Name !== '-- select an option --') {
    query['Branch Name'] = Branch_Name.trim();
  }

  if (Category && Category.trim() !== '' && Category !== '-- select an option --') {
    query['Category'] = Category.trim();
  }

  if (Course_Name && Course_Name.trim() !== '' && Course_Name !== '-- select an option --') {
    query['Course Name'] = Course_Name.trim();
  }
  try {
    const colleges = await collection.find(query).sort({ percentile: -1 }).limit(10).toArray();
    res.json(colleges);
  } catch (error) {
    console.error('Error occurred while fetching colleges', error);
    res.status(500).json({ error: 'An error occurred while fetching colleges' });
  }
});

app.get('/api/recommended', async (req, res) => {
  try {
    // Switch to the correct collection
    const db = client.db('college_predictor');
    const recommendedCollection = db.collection('Recommended'); // Ensure this is correct

    // Fetch documents from the collection with specific fields
    const recommendedColleges = await recommendedCollection.find(
      {}, // No filter, retrieve all documents
      {
        projection: { 
          _id: 1, 
          colleege_name: 1, 
          ciity: 1, 
          percentiile: 1 
        }
      }
    ).toArray();

    // Send the fetched documents as JSON response
    res.json(recommendedColleges);
  } catch (error) {
    console.error('Error occurred while fetching recommended colleges', error);
    res.status(500).json({ error: 'An error occurred while fetching recommended colleges' });
  }
});




// Add a user record
async function addUserRecord(req, res) {
  try {
    const db = client.db("mydb");
    const userCollection = db.collection("user");

    const { username, password, email, mobile } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send("Required fields are missing");
    }

    const inputDoc = { username, password, email, mobile };

    await userCollection.insertOne(inputDoc);
    res.json({ operation: "success" });
  } catch (err) {
    console.error("Error in addUserRecord:", err);
    res.status(500).send("Error: " + err.message);
  }
}

// Handle login by POST request
async function loginByPost(req, res) {
  try {
    const db = client.db("mydb");
    const userCollection = db.collection("user");

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Required fields are missing");
    }

    const query = { email, password };
    const userRef = await userCollection.findOne(query);

    if (!userRef) {
      return res.status(401).send("Invalid email or password");
    }

    res.json(userRef);
  } catch (err) {
    console.error("Error in loginByPost:", err);
    res.status(500).send("Error: " + err.message);
  }
}

// Add a contact us record
app.post('/addtodo', async (req, res) => {
  try {
    const db = client.db("mydb");
    const contactUsCollection = db.collection("contactus");

    const { name, email, description } = req.body;

    if (!name || !email || !description) {
      return res.status(400).send("Required fields are missing");
    }

    const contactData = { name, email, description };

    await contactUsCollection.insertOne(contactData);
    res.status(200).json({ operation: "success" });
  } catch (error) {
    console.error("Error in addtodo:", error);
    res.status(500).json({ error: error.message });
  }
});

// Routes
app.post("/addUser", addUserRecord);
app.post("/login-by-post", loginByPost);

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});