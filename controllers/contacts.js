const Contact = require('../models/contact');

const getAll = async (req, res) => {
  //#swagger.tags=['Contacts]
  const contacts = await Contact.getAllContacts();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Contacts]
  const contact = await Contact.getContactById(req.params.id);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  //#swagger.tags=['Contacts]
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthDay: req.body.birthDay
  };
  const result = await Contact.createContact(contact);
  if (result.insertedId) {
    res.status(201).json({ id: result.insertedId });
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['Contacts]
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthDay: req.body.birthDay
  };
  const result = await Contact.updateContact(req.params.id, contact);
  if (result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['Contacts]
  const result = await Contact.deleteContact(req.params.id);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};