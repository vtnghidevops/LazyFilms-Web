const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new mongoose.Schema({
    username: String,
    movieId: String,
    reports: Array
});

const Reports = mongoose.model('report', reportSchema);

module.exports = Reports;