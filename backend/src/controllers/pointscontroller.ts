import { Request, Response } from 'express'
import Knex from '../dataBase/connection';


class PointsController {
    async create(req: Request, res: Response) {

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        const trx = await Knex.transaction();
        const point = {
            image: req.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };
        const insertedIds = await trx('points').insert(point);


        const points_id = insertedIds[0];

        const pointItems = items.split(',').map((item: String) => Number(item.trim())).map((items_id: number) => {
            return {
                items_id,
                points_id,
            }
        });


        await trx('points_itens').insert(pointItems);
        await trx.commit();
        return res.json({ id: points_id, ...point });

    };

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const point = await Knex('points').where('id', id).first();
        const serializedPoint =
        {
            ...point,
            image_url: `http://192.168.15.26:3333/uploads/${point.image}`
        };


        if (!point) {
            return res.status(400).json({ message: 'Point not found' });
        }
        const items = await Knex('items').join('points_itens', 'items.id', '=', 'points_itens.id').where('points_itens.points_id', id);

        return res.json({ point:serializedPoint, items });
    }

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        const parsedItems = String(items).split(',').map(items => Number(items.trim()));
        const points = Knex('points').join('points_itens', 'points.id', '=', 'points_itens.points_id').whereIn('points_itens.items_id', parsedItems).where('city', String(city)).where('uf', String(uf)).distinct().select('points.*');
        const serializedPoints = (await points).map(point => {
            return {
                ...point,
                image_url: `http://192.168.15.26:3333/uploads/${point.image}`
            };
        });
        return res.json(serializedPoints);
    }
}


export default PointsController;