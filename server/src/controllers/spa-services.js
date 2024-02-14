import Spaservices from "../models/spa-services.js";
import SpaServicesSchema from "../models/spaCategoryServices.js";





// Create a controller function to handle the SpaServices post
export const createSpaServices = async (req, res) => {
  try {

    const {  title, description, duration,price,spaCategoryId } = req.body;
    
    const newSpaServicesPost = new Spaservices({
      title,
      description,
      duration,
      price,
      spaCategory:spaCategoryId
    });

    
    await newSpaServicesPost.save();

   
    await SpaServicesSchema.findByIdAndUpdate(spaCategoryId, {
      $push: { spaServices: newSpaServicesPost._id }, 
    });

  

    
    res.status(201).json({ message: 'SpaServices post created successfully', SpaServicesPost: newSpaServicesPost });
  } catch (error) {
    console.error('Error creating SpaServices post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getSpaServices = async (req, res) => {
  try {
    const spaService = await Spaservices.find({}).populate("spaCategory")
    res.json(spaService);
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

export const updateSpaServices = async (req, res) => {
  try {
    const { id } = req.params;
    const spaService = await Spaservices.findByIdAndUpdate(id, req.body);
    res.status(200).json("updated");
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

export const deleteSpaServices = async (req, res) => {
  try {
    const { id } = req.params;
    const spaService = await Spaservices.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

export const getByIdSpaServices = async (req, res) => {
  try {
    const { id } = req.params;
    const spaServices = await Spaservices.findById(id).populate("spaCategory")
    res.json(spaServices);
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};
