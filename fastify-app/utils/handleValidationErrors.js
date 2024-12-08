import { validationResult } from 'fastify';

export default async (req, reply) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return reply.status(400).send(errors.array());
  }
};
