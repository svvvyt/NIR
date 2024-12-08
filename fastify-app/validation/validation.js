export const loginValidation = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 5 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

export const registerValidation = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 5 },
    fullName: { type: 'string', minLength: 3 },
    avatarUrl: { type: 'string', format: 'uri', nullable: true },
  },
  required: ['email', 'password', 'fullName'],
  additionalProperties: false,
};

export const postCreateValidation = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 3 },
    text: { type: 'string', minLength: 3 },
    imageUrl: { type: 'string', format: 'uri', nullable: true },
  },
  required: ['title', 'text'],
  additionalProperties: false,
};
