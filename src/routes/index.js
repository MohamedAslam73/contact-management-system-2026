const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// CREATE contact
router.post('/contacts', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// READ all contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ one contact
router.get('/contacts/:contactId', async (req, res) => {
    try {
        const contact = await Contact.findOne({
            contactId: req.params.contactId
        });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE contact
router.put('/contacts/:contactId', async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { contactId: req.params.contactId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE contact
router.delete('/contacts/:contactId', async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({
            contactId: req.params.contactId
        });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;