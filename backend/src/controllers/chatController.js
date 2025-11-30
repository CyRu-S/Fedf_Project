const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// List conversations for current user
exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation
      .find({ participants: req.user.userId })
      .sort({ updatedAt: -1 })
      .populate('participants', 'email role');
    res.json({ conversations });
  } catch (err) {
    next(err);
  }
};

// Messages for a conversation
exports.getMessages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({ conversation: id }).sort({ createdAt: 1 });
    res.json({ messages });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const msg = await Message.create({
      conversation: id,
      sender: req.user.userId,
      content,
    });
    await Conversation.findByIdAndUpdate(id, { lastMessageAt: new Date() });
    res.status(201).json({ message: msg });
  } catch (err) {
    next(err);
  }
};
