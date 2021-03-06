import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const findOrder = container.resolve(FindOrderService);

      const orders = await findOrder.execute({ id });

      return response.status(200).json(orders);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    try {
      const { customer_id, products } = request.body;

      const createOrder = container.resolve(CreateOrderService);

      const order = await createOrder.execute({ customer_id, products });

      return response.status(200).json(order);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
