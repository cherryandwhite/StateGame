'use strict';

class QuestionMaker {
    constructor(){
        this.fs = require('fs');
        this.paths = require('path');
        this.Question = require('./Question.js').class;
    }

    nextQuestionForSocket(socket) {

        // Get a random state from the list of states the user hasn't gotten right yet
        var state = this.randElementOfArray(socket.states);

        // Make sure something was returned
        // If nothing was returned, a question has been asked for every state
        // so just reset it to all the states again and recurse
        if (state == null) {
            socket.states = this.getAllStates();
            return this.nextQuestionForSocket(socket);
        }

        // Get a random question for that state
        var question = this.randomQuestionForState(state);

        // We already handeled errors in randomQuestionForState, so just return whether it's null or not
        return question;
    }

    randomQuestionForState(state) {

        // Get that state's data file as an object
        var stateDataFileLocation = this.paths.join(__dirname, '../data/states/' + state + '.json');
        var questions = JSON.parse(this.fs.readFileSync(stateDataFileLocation).toString()).questions;

        // Get a random element of the questions array
        var question = this.randElementOfArray(questions);

        // Make sure we got a question
        if(question == null) {
            console.log("[error]: No question could be found for " + state);
            return null;
        }

        // Convert this into a question object
        var q = new this.Question(question.clue, question.difficulty, question.category, state);

        // All good to go!
        return q;
    }

    // Utility method
    getAllStates() {
        var statesDataFileLocation = this.paths.join(__dirname, '../data/states.json');
        return JSON.parse(this.fs.readFileSync(statesDataFileLocation).toString()).states;
    }

    // Utility method for getting a random number in a range
    // Found at:
    rand(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Utility method using the above to get a random index of an array
    randElementOfArray(arr) {
        // Make sure there are elements in the array
        if(arr.length == 0) {
            return null;
        }

        // If not, get a random number between 0 and the end length - 1
        var index = this.rand(0,arr.length - 1);

        // Return that item
        return arr[index];
    }

}

exports.class = QuestionMaker;
