import express from 'express';
import { submitContactUs } from '../controllers/contactUsController.js';
const router = express.Router();
router.post('/', submitContactUs);
export default router;
