import PostModel from '../models/Post.js';

export const getAll = async (req, reply) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    reply.send(posts);
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: 'Failed to load posts',
    });
  }
};

export const getOne = async (req, reply) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).populate('user');

    if (!post) {
      return reply.status(404).send({
        message: 'Post not found',
      });
    }

    reply.send(post);
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: 'Failed to load post',
    });
  }
};

export const remove = async (req, reply) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndDelete({ _id: postId });

    if (!post) {
      return reply.status(404).send({
        message: 'Post not found',
      });
    }

    reply.send({ success: true });
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: 'Failed to delete post',
    });
  }
};

export const create = async (req, reply) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();
    reply.send(post);
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: 'Failed to create post',
    });
  }
};

export const update = async (req, reply) => {
  try {
    const postId = req.params.id;

    const result = await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    if (result.modifiedCount === 0) {
      return reply.status(404).send({
        message: 'Post not found or no changes made',
      });
    }

    reply.send({ success: true });
  } catch (error) {
    console.error(error);
    reply.status(500).send({
      message: 'Failed to update post',
    });
  }
};
