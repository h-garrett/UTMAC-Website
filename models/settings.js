const { urlencoded } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    nominationLink: {
        type: String,
        default: ""
    },

    votingLink: {
        type: String,
        default: ""
    },

    phaseOverride: {
        type: Boolean,
        default: false
    },

    setPhase: {
        type: String,
        default: ""
    },

    setGenre : {
        type: String,
        default: ""
    }

}, {collection: 'Settings', timestamps: true});

const Settings = mongoose.model('Settings', settingsSchema, 'Settings');
module.exports = Settings;