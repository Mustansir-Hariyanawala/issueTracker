import issueModel from '../models/issueModel.js';
import userModel from '../models/userModel.js';

export const getAllIssues = async( req , res , next) => {
    try {
        const data = await issueModel.find().populate('createdBy', 'name email role');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const postIssue = async( req , res , next) => {
    try {
        const { title, description, category, priority } = req.body;

        const newIssue = await issueModel.create({
            title,
            description,
            category,
            priority,
            media: req.file ? req.file.path : null, // if media uploaded
            createdBy: req.user.id                  // from auth middleware
        });

        res.status(201).json(newIssue);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}
export const getMyIssues = async( req , res , next) => {
    try {
        const data = await issueModel.find({ createdBy: req.user.id });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const getIssue = async( req , res , next) => {
    try {
        const issue = await issueModel.findById(req.params.id)
            .populate("createdBy", "name email role");

        if (!issue) return res.status(404).json({ error: "Issue not found" });

        res.json(issue);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
}

export const updateIssue = async( req , res , next) => {
    try {
        const updates = req.body; 

        const updated = await issueModel.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: 'Issue not found' });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const deleteIssue = async( req , res , next) => {
    try {
        const deleted = await issueModel.findByIdAndDelete(req.params.id);

        if (!deleted) return res.status(404).json({ error: "Issue not found" });

        res.json({ message: "Issue deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}
