import Fastify from 'fastify';
import mongoose from 'mongoose';
import multer from 'fastify-multer';

import {
  loginValidation,
  postCreateValidation,
  registerValidation,
} from './validation/validations.js';

import { handleValidationErrors, checkAuth } from './utils.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose
  .connect('url')
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB error: ', err));

const app = Fastify();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

app.register(import('@fastify/static'), {
  root: 'uploads',
  prefix: '/uploads/',
});
app.register(upload.contentParser);

app.addHook('preHandler', async (req, reply) => {
  req.body = req.body || {};
});

app.get('/', async (req, reply) => {
  reply.send('hello world');
});

app.post(
  '/auth/login',
  { preValidation: [loginValidation, handleValidationErrors] },
  UserController.login
);
app.post(
  '/auth/register',
  { preValidation: [registerValidation, handleValidationErrors] },
  UserController.register
);
app.get('/auth/me', { preHandler: [checkAuth] }, UserController.getMe);

app.post(
  '/upload',
  { preHandler: [checkAuth, upload.single('image')] },
  async (req, reply) => {
    reply.send({
      url: `/uploads/${req.file.originalname}`,
    });
  }
);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  {
    preValidation: [checkAuth, postCreateValidation, handleValidationErrors],
  },
  PostController.create
);
app.delete('/posts/:id', { preHandler: [checkAuth] }, PostController.remove);
app.patch(
  '/posts/:id',
  {
    preValidation: [checkAuth, postCreateValidation, handleValidationErrors],
  },
  PostController.update
);

app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
