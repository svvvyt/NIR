import jwt from 'jsonwebtoken';

export default async (req, reply) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (!token) {
    return reply.status(403).send({
      message: 'No access',
    });
  }

  try {
    const decoded = jwt.verify(token, 'secret123'); // TODO: Use environment variable for the secret key
    req.userId = decoded._id;
  } catch (error) {
    console.error(error);
    return reply.status(403).send({
      message: 'No access',
    });
  }
};
