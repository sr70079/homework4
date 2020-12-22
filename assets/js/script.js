var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include",
        answers: {
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
        },
        correctAnswer: "c"
    },
    {
        question: "The condition in an if/else statement is enclosed within ______",
        answers: {
        a: "quotes",
        b: "curly brackets",
        c: "parentheses",
        d: "square brackets"
        },
        correctAnswer: "c"
    },
    {
        question: "Arrays in javaScript can be used to store _______",
        answers: {
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "String value must be enclosed within ____ when being assigned to variables",
        answers: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "parentheses"
        },
        correctAnswer: "c"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is _______",
        answers: {
            a: "javaScript",
            b: "termiinal/bash",
            c: "for loops",
            d: "console.log"
    },
        correctAnswer: "d"
    }
];

var quiz = document.getElementById('quiz');
var results = document.getElementById('results');
var start = document.getElementById('start');



function showQuestion(index){
    
    var output = [];
    var answers = [];   
        
    for(letter in quizQuestions[index].answers){
        
        answers.push(
            '<label>'
                + '<button onclick="answerQuestion('+ index +', \''+ letter +'\')" class="button" name="question'+ index +'" value="'+ letter +'">'
                + letter + ': '
                + quizQuestions[index].answers[letter]
            + '</label>'
        )
    };

    output.push(
        
        '<div class="question">' + quizQuestions[index].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
                
    );     

    quiz.innerHTML = output.join('');
};

function answerQuestion(questionIndex, answerLetter){
    showQuestion(questionIndex + 1);
};

function showResults(){        

    var answerContainers = quiz.querySelectorAll('.answers');

    var userAnswer = '';
    var numCorrect = 0;

    for(var i=0; i<quizQuestions.length; i++){

        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

        if(userAnswer===quizQuestions[i].correctAnswer){

            numCorrect++;                

            answerContainers[i].style.color = 'lightgreen';
        }

        else{

            answerContainers[i].style.color = 'red';
        };
    };

    results.innerHTML = numCorrect + ' out of ' + quizQuestions.length;
};

start.onclick = function() {
    showQuestion(0);
    start.style.display = "none";
};











