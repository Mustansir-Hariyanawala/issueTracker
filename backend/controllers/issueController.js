import issueModel from '../models/issueModel.js';
import userModel from '../models/userModel.js';

export const getAllIssues = async( req , res , next) => {
    try {
        const data = await issueModel.find(); 
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export const postIssue = async( req , res , next) => {
    try {
        const { title, description, category, priority, userid } = req.body;

        const issue = await issueModel.create({
            title,
            description,
            category,
            priority,
            media: req.file ? req.file.path : null,  // multer upload
            createdBy: userid                   // from auth middleware
        });

        res.status(201).json(issue);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}
export const getMyIssues = async( req , res , next) => {
    try {
        const userId = req.headers.authorization?.split(" ")[1];
        // console.log("User ID from headers:", userId); 

        const issues = await issueModel.find({ createdBy: userId });
        res.json(issues);
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: "Server error" });
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
        const updated = await issueModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updated) return res.status(404).json({ error: "Issue not found" });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
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
