const fs = require('fs').promises;
const path = require('path');
const uniqid = require('uniqid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf8', (err, data) => {
    if (err) {
      console.log('Something went wrong, please try again');
      return;
    }
    return data;
  });
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return JSON.parse(contacts).find(({ id }) => id === contactId + '');
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const parsedContacts = JSON.parse(contacts);
  const filteredContacts = JSON.stringify(
    parsedContacts.filter(({ id }) => id !== contactId + '')
  );

  try {
    await fs.writeFile(contactsPath, filteredContacts);
  } catch (error) {
    console.log('Something went wrong, please try again');
  }

  const updatedContacts = await listContacts();
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const parsedContacts = JSON.parse(contacts);
  const id = uniqid();

  parsedContacts.push({ id, name, email, phone });
  const stringifyResult = JSON.stringify(parsedContacts);

  try {
    await fs.writeFile(contactsPath, stringifyResult);
  } catch (error) {
    console.log('Something went wrong, please try again');
  }

  const updatedContacts = await listContacts();
  return updatedContacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
