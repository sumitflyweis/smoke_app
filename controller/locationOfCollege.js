const Location = require('../model/locationOfCollege'); // Assuming the locationModel is in a separate file

exports.getLocation = async (req, res) => {
  try {
    
    const location = await Location.find();

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.status(200).json({msg:location})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}



exports.getLocationById = async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await Location.findById(locationId);

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.status(200).json({msg:location});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createLocation = async (req, res) => {
  try {
    const locationData = req.body;
    const newLocation = await Location.create(locationData);

    return res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const locationData = req.body;
    const updatedLocation = await Location.findByIdAndUpdate(
      locationId,
      locationData,
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.status(200).json(updatedLocation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const deletedLocation = await Location.findByIdAndDelete(locationId);

    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    return res.status(200).json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

