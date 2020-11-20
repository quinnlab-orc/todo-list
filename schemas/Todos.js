const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    },
    project: {
        type: String
    },
    complete: {
        type: Boolean,
        default: false
    }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);

//{ title: '', description: '', dueDate: '', project: '', complete: false }