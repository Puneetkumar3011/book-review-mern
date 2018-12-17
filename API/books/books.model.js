const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        id: {
            type: String
        },
        title: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        file: {
            type: Object,
            required: false
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        favorite: {
            type: Boolean
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('book', bookSchema);

