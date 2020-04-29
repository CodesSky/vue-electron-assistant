const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var entrySchema = new mongoose.Schema({
    websiteName: String,
    websiteUrl: String,
    visible: Boolean,
    editable: Boolean
});

const Entry = mongoose.model('Entry', entrySchema);
//Export the model

module.exports = Entry;
