import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({

  title: { 
    type: String, 
    required: true 
  },

  description: { 
    type: String, 
    required: true 
  },

  media: { 
    type: String, 
    default: null  // image or video path
  },

  category: {
    type: String,
    required: true,
    enum: [
      "sanitation",
      "water",
      "security",
      "electrical",
      "parking",
      "other"
    ]
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },

  status: {
    type: String,
    enum: ["New", "Assigned", "In Progress", "Resolved"],
    default: "New"
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Issue", issueSchema);
