const express = require("express");
const router = express.Router();

const Contact = require("../../models/Contact");
const Company = require("../../models/Company");
const _ = require("lodash");

// @route GET /api/contacts
// @desc get all contacts
router.get("/", async (req, res) => {
  try {
    const query = {};
    const company = req.query.company;
    if (company) {
      query.CompanyID = company;
    }
    const page = parseInt(req.query.page || 1);
    const perPage = parseInt(req.query.perPage || 5);
    const limit = (page - 1) * perPage;
    const contacts = await Contact.find(query)
      .limit(perPage)
      .skip(limit)
      .populate("CompanyID")
      .sort({ CreatedAt: -1 });
    const count = await Contact.countDocuments(query);
    res.json({ page, perPage, count, company, data: contacts });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/company", async (req, res) => {
  try {
    const contacts = await Company.find();
    res.json({ data: contacts });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    let newContact = await Contact.create(req.body);
    newContact = await Contact.populate(newContact, { path: "CompanyID" });
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let contact = Contact.findById(req.params.id);
    res.json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const body = _.pick(req.body, [
      "FirstName",
      "LastName",
      "Email",
      "CompanyID",
      "PhoneNumber",
    ]);
    const contact = await Contact.findByIdAndUpdate(req.params.id, body, {
      returnOriginal: false,
    }).populate("CompanyID");
    if (contact == null) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
