const stateModel = require('../model/state');

exports.createState = async (req, res) => {
  try {
    const { state } = req.body;
    const newCity = await stateModel.create({ state });
    res.status(201).json(newCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getState = async (req, res) => {
  try {
    const cities = await stateModel.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const updatedCity = await stateModel.findByIdAndUpdate(id, { state }, { new: true });
    res.json(updatedCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    await stateModel.findByIdAndDelete(id);
    res.json({ message: 'City deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
