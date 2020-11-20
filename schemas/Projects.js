const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String
    },
    todoIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todos' 
    }]
});

module.exports = Project = mongoose.model('project', ProjectSchema)

//{ title: '' }