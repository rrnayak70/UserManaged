const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser  = await UserModel.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: 'User  already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new UserModel({ email, password: hashedPassword });
    await newUser .save();

    res.status(201).json({ message: 'User  registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
exports.loginUser  = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Login failed: Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Login failed: Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all users (for demonstration purposes)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, { password: 0 }); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a user
exports.updateUser  = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
  
    try {
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  
      const updatedUser  = await UserModel.findByIdAndUpdate(
        id,
        { email, password: hashedPassword },
        { new: true }
      );
  
      if (!updatedUser ) {
        return res.status(404).json({ message: 'User  not found' });
      }
  
      res.json(updatedUser );
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Delete a user
  exports.deleteUser  = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser  = await UserModel.findByIdAndDelete(id);
      if (!deletedUser ) {
        return res.status(404).json({ message: 'User  not found' });
      }
  
      res.json({ message: 'User  deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };