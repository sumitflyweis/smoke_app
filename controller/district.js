const districtModel = require('../model/district');

exports.createdistrict = async (req, res) => {
  try {
    const { district } = req.body;
    const newCity = await districtModel.create({ district });
    res.status(201).json(newCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getdistrict = async (req, res) => {
  try {
    const cities = await districtModel.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatedistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { district } = req.body;
    const updatedCity = await districtModel.findByIdAndUpdate(id, { district }, { new: true });
    res.json(updatedCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletedistrict = async (req, res) => {
  try {
    const { id } = req.params;
    await districtModel.findByIdAndDelete(id);
    res.json({ message: 'City deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
