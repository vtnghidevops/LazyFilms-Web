const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    }
});

const movieSchema = new Schema({
    name_vn: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: false
    },
    category: {
        type: Array,
       required: false
    },
    nation: {
        type: String,
        required: false
    },
    actor_name: {
        type: Array,
        required: false
    },
    director_name: {
        type: String,
        required: false
    },
    rating: {
        type: String,
       required: false
    },
    duration: {
        type: Number,
       required: false
    },
    views: {
        type: Number,
       required: false
    },
    discription: {
        type: String,
       required: false
    },
    path: {
        type: String,
       required: false
    },
    vip: {
        type: Boolean,
        required: false
    },
    comments: [commentSchema] // Array of comment sub-documents
}, { timestamps: true });

const Movies = mongoose.model('movies', movieSchema);
module.exports = Movies;
