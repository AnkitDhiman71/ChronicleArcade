import ContactUs from '../models/contactUsModel.js';
import { validateContactUs } from '../validations/validateContactUs.js';
export const submitContactUs = async (req, res) => {
  try {
    const { name, phone, message } = await validateContactUs.validate(req.body, {
      abortEarly: false,
    });
    const contactRequest = await ContactUs.create({ name, phone, message });
    return res.status(201).json({
      message: 'Contact request submitted successfully',
      contact: {
        id: contactRequest._id,
        name: contactRequest.name,
        phone: contactRequest.phone,
        message: contactRequest.message,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.errors });
    }
    return res.status(500).json({ error: error.message || 'Failed to submit contact request' });
  }
};
