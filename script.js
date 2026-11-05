
const questions = [
    {
        question: "Which language is used to create the structure of a web page?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<href>", correct: false },
            { text: "<a>", correct: true },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style System", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which language is used to add interactivity to web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript (single line)?",
        answers: [
            { text: "<!-- -->", correct: false },
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "**", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to display an image?",
        answers: [
            { text: "<image>", correct: false },
            { text: "<picture>", correct: false },
            { text: "<img>", correct: true },
            { text: "<src>", correct: false }
        ]
    },
    {
        question: "Which CSS property changes the text color?",
        answers: [
            { text: "background-color", correct: false },
            { text: "font-size", correct: false },
            { text: "text-align", correct: false },
            { text: "color", correct: true }
        ]
    },
    {
        question: "Which method is used to select an element by its ID in JavaScript?",
        answers: [
            { text: "getElementById()", correct: true },
            { text: "getElementsByClass()", correct: false },
            { text: "queryById()", correct: false },
            { text: "selectElement()", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create an unordered list?",
        answers: [
            { text: "<ol>", correct: false },
            { text: "<ul>", correct: true },
            { text: "<li>", correct: false },
            { text: "<list>", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in modern JavaScript?",
        answers: [
            { text: "define", correct: false },
            { text: "variable", correct: false },
            { text: "let", correct: true },
            { text: "dim", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");

    nextButton.style.display = "none";

    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestionIndex / questions.length) * 100}%`;

    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");

        button.textContent = answer.text;
        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    scoreElement.textContent = `Score: ${score}`;
    nextButton.style.display = "block";
}

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    const percentage = (score / questions.length) * 100;

    finalScore.textContent =
        `You scored ${score} out of ${questions.length} (${percentage}%)`;

    progressBar.style.width = "100%";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

nextButton.addEventListener("click", handleNextButton);
restartButton.addEventListener("click", startQuiz);

startQuiz();
