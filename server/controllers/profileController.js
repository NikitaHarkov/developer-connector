const axios = require('axios');
const config = require('config');

const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id,
      }).populate('user', ['name', 'avatar']);

      if (!profile) {
        return res
          .status(400)
          .json({ msg: 'There is no profile for this user' });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Profile Server Error');
    }
  },

  createUserProfile: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json('Server Error');
    }
  },

  getAllProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', [
        'name',
        'avatar',
      ]);
      return res.json(profiles);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json('Server Error');
    }
  },

  getProfileByUserId: async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate('user', ['name', 'avatar']);
      if (!profile) return res.status(400).json({ msg: 'Profile not found' });
      return res.json(profile);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(400).json({ msg: 'Profile not found' });
      }
      console.error(err.message);
      return res.status(500).json('Server Error');
    }
  },

  deleteProfileAndUser: async (req, res) => {
    try {
      // Remove user posts
      await Post.deleteMany({ user: req.user.id });
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
      return res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json('Server Error');
    }
  },

  addProfileExperience: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.mesage);
      res.status(500).send('Server Error');
    }
  },

  deleteExperienceFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const tempExperience = profile.experience.filter(
        exp => exp.id !== req.params.exp_id
      );
      profile.experience = tempExperience;
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(error.mesage);
      res.status(500).send('Server Error');
    }
  },

  addProfileEducation: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEducation = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducation);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.mesage);
      res.status(500).send('Server Error');
    }
  },

  deleteEducationFromProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Get remove index
      const tempEducation = profile.education.filter(
        edu => edu.id !== req.params.edu_id
      );
      profile.education = tempEducation;
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(error.mesage);
      res.status(500).send('Server Error');
    }
  },

  getGithubRepos: async (req, res) => {
    try {
      const options = {
        url: `https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          'github_client_id'
        )}&client_secret=${config.get('github_secret')}`,
        method: 'get',
        headers: { 'user-agent': 'node.js' },
      };

      axios(options)
        .then(response => {
          res.json(response.data);
        })
        .catch(error => {
          console.error(error.message);
          res.status(404).json({ msg: 'No github profile found' });
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};
