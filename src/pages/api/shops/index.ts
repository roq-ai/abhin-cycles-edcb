import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { shopValidationSchema } from 'validationSchema/shops';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getShops();
    case 'POST':
      return createShop();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getShops() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.shop
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'shop'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createShop() {
    await shopValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.advertisement?.length > 0) {
      const create_advertisement = body.advertisement;
      body.advertisement = {
        create: create_advertisement,
      };
    } else {
      delete body.advertisement;
    }
    if (body?.cycle?.length > 0) {
      const create_cycle = body.cycle;
      body.cycle = {
        create: create_cycle,
      };
    } else {
      delete body.cycle;
    }
    const data = await prisma.shop.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
