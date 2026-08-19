const { urlencoded } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required: true
    },

    cover: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    }
}, {collection: 'Albums', timestamps: true});

const Album = mongoose.model('Album', albumSchema, 'Albums');
module.exports = Album;