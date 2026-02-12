import express from 'express';
import { doctorlist } from '../Controller/doctorcontroller.js';

const doctorRouter = express.Router();

doctorRouter.get('/doctors/list', doctorlist);

export default doctorRouter;