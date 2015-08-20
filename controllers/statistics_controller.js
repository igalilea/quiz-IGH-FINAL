var models = require('../models/models.js');

// GET /quizes/statistics

var stat = {
	// questions: 0,
	// comentarios: 0,
	// media_comentarios: 0,
	// questionsNoComment: 0,
	// questionsComment: 0
};

exports.calculo = function (req, res, next) {

	models.Quiz.count().then(function(questions) {

		stat.numQuestions = questions;
		return models.Comment.count();

	}).then(function(comments) {

		stat.numComments = comments;
		stat.mediaComments = (stat.numComments / stat.numQuestions).toFixed(2);
		return models.Comment.countQuizComments();

	}).then(function(withComments) {

			stat.questionsComment = withComments;
			stat.questionsNoComment = stat.numQuestions - stat.questionsComment;

		}).catch(function(error) { next(error);}
		).finally(function () {
		next();
	});

	
};

exports.show = function(req, res) {
	console.log(stat.questions);
	res.render('quizes/statistics', {stat: stat, errors: []});
};