import { Request, Response } from 'express';
import Knex from '../dataBase/connection';

class ItemsController {
    async index(req: Request, res: Response) {
        const items = await Knex('items').select('*');

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.15.26:3333/uploads/${item.image}`
            };
        });
        return res.json(serializedItems);
    }

};
export default ItemsController;