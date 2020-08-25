import express from 'express';
import multer from 'multer';
import Knex from './dataBase/connection';
import multerConfig from './config/multer';
import ItemsController from './controllers/itemsController';
import PointsController from './controllers/pointscontroller';
import { celebrate, Joi } from 'celebrate'
const upload = multer(multerConfig);
const routes = express.Router();
const pointscontroller = new PointsController();
const itemsController = new ItemsController();

routes.use(express.json());
routes.get('/items', itemsController.index);
routes.get('/points/:id', pointscontroller.show);
routes.get('/points', pointscontroller.index);



routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        }, {
            abortEarly: false
        })
    }),
    pointscontroller.create);

export default routes;