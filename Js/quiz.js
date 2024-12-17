

const quizData = [
    {
        question: "Qu'est-ce que HTML signifie ?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Quel langage de programmation est utilisé pour rendre les pages web interactives ?",
        options: ["JavaScript", "Java", "Python", "C++"],
        correctAnswer: "JavaScript"
    },
    {
        question: "Qu'est-ce que CSS signifie ?",
        options: ["Counter Style Sheets", "Computer Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "Quel élément HTML est utilisé pour afficher du texte en gras ?",
        options: ["<strong>", "<bold>", "<b>", "<big>"],
        correctAnswer: "<strong>"
    },
    {
        question: "Quelle fonction JavaScript est utilisée pour imprimer quelque chose dans la console ?",
        options: ["console.log()", "print()", "log()", "write()"],
        correctAnswer: "console.log()"
    },
    {
        question: "Quel sélecteur CSS est utilisé pour sélectionner toutes les balises ?",
        options: ["*", "all", "element", "tag"],
        correctAnswer: "*"
    },
    {
        question: "Quel événement JavaScript est déclenché lorsqu'un formulaire est soumis ?",
        options: ["onsubmit", "onclick", "onchange", "onformsubmit"],
        correctAnswer: "onsubmit"
    },
    {
        question: "Quelle propriété CSS est utilisée pour changer la couleur du texte d'un élément ?",
        options: ["color", "text-color", "font-color", "foreground-color"],
        correctAnswer: "color"
    },
    {
        question: "Quel élément HTML est utilisé pour créer une liste non ordonnée ?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        correctAnswer: "<ul>"
    },
    {
        question: "Quelle balise HTML est utilisée pour lier un fichier CSS externe à votre page HTML ?",
        options: ["<link>", "<style>", "<css>", "<script>"],
        correctAnswer: "<link>"
    }
];



const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const resultContainer = document.getElementById("result-container");
const scoreContainer = document.getElementById("score-container");
const timerContainer = document.getElementById("timer-container");

let currentQuestionIndex = 0;
let score = 0;
let timerSeconds = 60;
let timerInterval;

function startQuiz() {
    displayQuestion();
    startTimer();

    nextButton.addEventListener("click", nextQuestion);
}

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.innerText = option;
        optionButton.addEventListener("click", () => checkAnswer(option, currentQuestion.correctAnswer));
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        score++;
    }

    const resultMessage = userAnswer === correctAnswer ? "Correct !" : "Incorrect. La réponse correcte est : " + correctAnswer;
    resultContainer.innerText = resultMessage;

    disableOptions();
    showScore();
}

function disableOptions() {
    const optionButtons = document.querySelectorAll("#options-container button");
    optionButtons.forEach(button => button.disabled = true);
}

function showScore() {
    scoreContainer.innerText = "Score: " + score;
}

function nextQuestion() {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        resultContainer.innerText = "";
        enableOptions();
    } else {
        endQuiz();
    }
}

function enableOptions() {
    const optionButtons = document.querySelectorAll("#options-container button");
    optionButtons.forEach(button => button.disabled = false);
}

function endQuiz() {
    clearInterval(timerInterval);
    timerContainer.innerText = "Temps écoulé";
    nextButton.disabled = true;
    showScore();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds--;

        if (timerSeconds <= 0) {
            endQuiz();
        } else {
            timerContainer.innerText = "Temps restant : " + timerSeconds + " secondes";
        }
    }, 1000);
}

startQuiz();
