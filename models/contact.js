const mongodb = require('../routes/data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async () => {
  const result = await mongodb.getDatabase().collection('contacts').find();
  return result.toArray();
};

const getContactById = async (id) => {
  const contactId = new ObjectId(id);
  const result = await mongodb.getDatabase().collection('contacts').find({ _id: contactId });
  const contacts = await result.toArray();
  return contacts[0];
};

const createContact = async (contact) => {
  return await mongodb.getDatabase().collection('contacts').insertOne(contact);
};

const updateContact = async (id, contact) => {
  const contactId = new ObjectId(id);
  return await mongodb.getDatabase().collection('contacts').replaceOne(
    { _id: contactId },
    contact
  );
};

const deleteContact = async (id) => {
  const contactId = new ObjectId(id);
  return await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};