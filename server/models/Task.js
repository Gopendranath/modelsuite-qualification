const mongoose = require('mongoose');
const Submission = require('./Submission');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Open', 'Claimed', 'Submitted', 'Approved', 'Rejected'],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    dueDate: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

taskSchema.pre('findOneAndDelete', async function (next) {
  const taskId = this.getQuery()._id;
  await Submission.deleteMany({ taskId });
  next();
});

module.exports = mongoose.model('Task', taskSchema);
