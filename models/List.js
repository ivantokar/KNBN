const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ListSchema = new mongoose.Schema(
    {
        list_title: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { minimize: false }
);

ListSchema.plugin(timestamps);
ListSchema.plugin(mongooseStringQuery);
ListSchema.plugin(AutoIncrement, {inc_field: 'list_position'});

module.exports = mongoose.model('List', ListSchema);