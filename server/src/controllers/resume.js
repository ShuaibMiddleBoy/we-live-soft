const resumeSchema = require('../models/resumeSchema');

// Route for handling form data
const resume = async (req, res) => {

  try {
    const { education, experience, coding } = req.body;
    const newEducation = Array.isArray(education.title)
      ? education.title.map((_, index) => ({
        title: education.title[index],
        date: education.date[index],
        institute: education.institute[index],
        description: education.description[index],
      }))
      : [
        {
          title: education.title,
          date: education.date,
          institute: education.institute,
          description: education.description,
        },
      ];

    const newExperience = Array.isArray(experience.position)
      ? experience.position.map((_, index) => ({
        position: experience.position[index],
        timeline: experience.timeline[index],
        company: experience.company[index],
        description: experience.description[index],
      }))
      : [
        {
          position: experience.position,
          timeline: experience.timeline,
          company: experience.company,
          description: experience.description,
        },
      ];

    const newCoding = Array.isArray(coding.name)
      ? coding.name.map((_, index) => ({
        name: coding.name[index],
        percentage: coding.percentage[index],
      }))
      : [
        {
          name: coding.name,
          percentage: coding.percentage,
        },
      ];


    // Find the existing resume document
    const existingResume = await resumeSchema.findOne(education._id);

    if (existingResume) {
      existingResume.education = newEducation;
      existingResume.experience = newExperience;
      existingResume.coding = newCoding;
      if (req.file) {
        existingResume.resume = req.file.filename;
      }
      else if (!existingResume.resume && !req.file) {
        existingResume.resume = undefined;
      }
      await existingResume.save();
      res.status(200).json('Resume updated successfully.');
    } else {
      const newResume = new resumeSchema({
        education: newEducation,
        experience: newExperience,
        coding: newCoding,
        resume: req.file ? req.file.filename : (existingResume.resume || undefined),
      });

      await newResume.save();
      res.status(200).json('New resume created successfully.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// get resume data from db 
const getResume = async (req, res) => {
  try {
    const resumeData = await resumeSchema.findOne(); // Retrieve resume data

    if (resumeData) {
      res.status(200).json(resumeData);
    } else {
      res.status(404).json({ message: 'No resume data found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { resume, getResume };
