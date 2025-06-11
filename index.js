
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));

mongoose.connect("mongodb://localhost:27017/mycv", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree:      { type: String, required: true },
  year:        { type: String, required: true }
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
  role:     { type: String, required: true },
  company:  { type: String, required: true },
  duration: { type: String, required: true },
  details:  { type: String, required: true }
}, { _id: false });

const ResumeSchema = new mongoose.Schema({
  fullName:    { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  education:   { type: [EducationSchema], required: true },
  experience:  { type: [ExperienceSchema], required: true },
  skills:      { type: [String], required: true },
  tenth:       { type: String, required: true },
  twelfth:     { type: String },
  declaration: { type: Boolean, required: true }
}, { timestamps: true });

const Resume = mongoose.model('Resume', ResumeSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'cv.html'));
});

app.post('/post', async (req, res) => { 
  try {
    const resumeData = {
      ...req.body,
      skills: Array.isArray(req.body.skills) ? req.body.skills : req.body.skills?.split(',').map(s => s.trim()),
      declaration: req.body.declaration === 'true' || req.body.declaration === true
    };
    const newResume = new Resume(resumeData);
    await newResume.save();
    res.status(201).json({ message: 'Resume submitted successfully', resumeId: newResume._id });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Error saving resume', error: error.message });
  } 
});

app.get('/cv-preview/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send('Invalid ID');
  try {
    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).send('Resume not found');
    res.render('cv-template', { resume });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// fixed by chatgpt 

app.get('/download-pdf/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send('Invalid ID');
  try {
    const url = `http://localhost:${PORT}/cv-preview/${id}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="cv.pdf"'
    });
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate PDF');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});