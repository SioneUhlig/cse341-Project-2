const Contact = require('../models/contact');

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contacts = await Contact.getAllContacts();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error retrieving contacts.' });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const contact = await Contact.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error retrieving contact.' });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const { firstName, lastName, username, email, favoriteColor, birthDay } = req.body;

  // Data validation
  if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
    return res.status(400).json({ error: 'firstName is required and must be a non-empty string.' });
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
    return res.status(400).json({ error: 'lastName is required and must be a non-empty string.' });
  }
  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({ error: 'username is required and must be a non-empty string.' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (!favoriteColor || typeof favoriteColor !== 'string' || favoriteColor.trim() === '') {
    return res.status(400).json({ error: 'favoriteColor is required and must be a non-empty string.' });
  }
  if (!birthDay || typeof birthDay !== 'string' || birthDay.trim() === '') {
    return res.status(400).json({ error: 'birthDay is required and must be a non-empty string.' });
  }

  try {
    const contact = { firstName, lastName, username, email, favoriteColor, birthDay };
    const result = await Contact.createContact(contact);
    if (result.insertedId) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ error: 'Some error occurred while creating the contact.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while creating the contact.' });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  const { firstName, lastName, username, email, favoriteColor, birthDay } = req.body;

  // Data validation
  if (!firstName || typeof firstName !== 'string' || firstName.trim() === '') {
    return res.status(400).json({ error: 'firstName is required and must be a non-empty string.' });
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim() === '') {
    return res.status(400).json({ error: 'lastName is required and must be a non-empty string.' });
  }
  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({ error: 'username is required and must be a non-empty string.' });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }
  if (!favoriteColor || typeof favoriteColor !== 'string' || favoriteColor.trim() === '') {
    return res.status(400).json({ error: 'favoriteColor is required and must be a non-empty string.' });
  }
  if (!birthDay || typeof birthDay !== 'string' || birthDay.trim() === '') {
    return res.status(400).json({ error: 'birthDay is required and must be a non-empty string.' });
  }

  try {
    const contact = { firstName, lastName, username, email, favoriteColor, birthDay };
    const result = await Contact.updateContact(req.params.id, contact);
    if (result.matchedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contact not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while updating the contact.' });
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts']
  try {
    const result = await Contact.deleteContact(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Contact not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message || 'Some error occurred while deleting the contact.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};