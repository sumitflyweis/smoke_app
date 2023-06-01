const ContactModel = require("../model/contactlist");

exports.createContact = async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Create a new contact document using the ContactModel
    const contact = new ContactModel({ name, phone });

    // Save the contact to the database
    const savedContact = await contact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const contacts = await ContactModel.find();

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({ error: "Failed to get contacts" });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    // Find the contact by ID and update its name and phone
    const updatedContact = await ContactModel.findByIdAndUpdate(
      id,
      { name, phone },
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the contact by ID and delete it
    await ContactModel.findByIdAndDelete(id);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};


// exports.findAnyContact = async (req, res) => {
//   try {
//     const { search } = req.query;

//     // Create a query object to search by name or phone
//     const query = {
//       $or: [
//         { name: { $regex: search, $options: "i" } },
//         { phone: { $regex: search, $options: "i" } },
//       ],
//     };

//     // Find contacts matching the search query
//     const contacts = await ContactModel.find(query);

//     res.status(200).json(contacts);
//   } catch (error) {
//     console.error("Error searching contacts:", error);
//     res.status(500).json({ error: "Failed to search contacts" });
//   }
// }


exports.findAnyContact = async (req, res) => {
    try {
      const obj = {
        ...req.query
      }
    //   if(req.query.status){
    //  obj.status = obj.status == "true"?true:false
    //   }
     console.log(obj)
      const order = await ContactModel.find(obj)
      //const orders = await Order.find();
      res.status(200).json({
        success: true,
        total:order.length,
        data: order,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve orders",
        error: err.message,
      });
    }
  };


