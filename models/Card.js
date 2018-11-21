const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const CardSchema = new mongoose.Schema(
    {
        card_title: {
            type: String,
            required: true,
            trim: true,
        },
        list_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
            index: true,
            required: true,
        }
    },
    { minimize: false }
);

CardSchema.plugin(timestamps);
CardSchema.plugin(mongooseStringQuery);
CardSchema.plugin(AutoIncrement, {inc_field: 'card_position'});

module.exports = mongoose.model('Card', CardSchema);
