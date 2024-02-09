const { Profile, Product } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    // Resolver to get all products
    getAllProducts: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },

    // Resolver to get a single product by ID
    getProductById: async (_, { productId }) => {
      try {
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } catch (error) {
        throw new Error('Error fetching product');
      }
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { skills: skill },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },

    removeSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { skills: skill } },
        { new: true }
      );
    },

    // Resolver to create a new product
    createProduct: async (_, { input }) => {
      try {
        const product = await Product.create(input);
        return product;
      } catch (error) {
        throw new Error('Error creating product');
      }
    },

    // Resolver to update a product by ID
    updateProduct: async (_, { productId, input }) => {
      try {
        const product = await Product.findByIdAndUpdate(productId, input, {
          new: true,
        });
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } catch (error) {
        throw new Error('Error updating product');
      }
    },

    // Resolver to delete a product by ID
    deleteProduct: async (_, { productId }) => {
      try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      } catch (error) {
        throw new Error('Error deleting product');
      }
    },
  },
};

module.exports = resolvers;
