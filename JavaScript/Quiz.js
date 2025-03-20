const questions = [
    {
        question: "Сколько дней в високосном году?",
        answers: ["365", "366", "356", "Не знаю"],
        correct: 1
    },
    {
        question: "Столица Украины...",
        answers: ["Киев", "Харьков", "Львов", "Житомир"],
        correct: 0
    },
    {
        question: "Самый короткий месяц года...",
        answers: ["Июнь", "Март", "Февраль", "Все месяцы одинаковые"],
        correct: 2
    },
    {
        question: "В каком году закончилась Первая мировая война?",
        answers: ["1914", "1918", "1939", "1941"],
        correct: 1
    },
    {
        question: "Кто победил в Первой мировой войне?",
        answers: ["Антанта", "Троистый союз", "Четверной союз", "Никто"],
        correct: 0
    },
    {
        question: "В каком году распалась Российская империя?",
        answers: ["1917", "1918", "1914", "1921"],
        correct: 0
    },
    {
        question: "Настоящая фамилия Иосифа Сталина...",
        answers: ["Джарахов", "Сталин", "Джугашвили", "Ленин"],
        correct: 2
    }
];

let currentQuestion = 0;
let correctAnswers = 0;
let timerInterval;
let timeLeft = 10;

// Таймер
function startTimer() {
    timeLeft = 10;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Осталось: ${timeLeft} секунд`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Осталось: ${timeLeft} секунд`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(-1); // Если время истекло, считаем ответ неправильным
        }
    }, 1000);
}

// Показать вопрос
function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(index);
        answersDiv.appendChild(btn);
    });

    startTimer();
}

// Проверка ответа
function checkAnswer(index) {
    const result = document.getElementById("result");
    const q = questions[currentQuestion];

    clearInterval(timerInterval); // Останавливаем таймер

    if (index === q.correct) {
        correctAnswers++;
        result.textContent = "Правильно!";
        result.style.color = "green";
    } else {
        result.textContent = "Неправильно!";
        result.style.color = "red";

        // Если ответ неправильный, вернуться в начало викторины
        setTimeout(resetQuiz, 2000);
        return;
    }

    setTimeout(nextQuestion, 2000);
}

// Следующий вопрос
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById("result").textContent = "";
    } else {
        showFinalScreen();
    }
}

// Показать итоговый экран
function showFinalScreen() {
    const questionElement = document.getElementById("question");
    const answersElement = document.getElementById("answers");
    const resultElement = document.getElementById("result");

    questionElement.textContent = `Викторина завершена! Вы набрали ${correctAnswers} из ${questions.length} правильных ответов.`;
    answersElement.innerHTML = "";
    resultElement.textContent = "";

    // Воспроизвести звук фейерверков
    playFireworksSound();
}

// Воспроизвести звук фейерверков
function playFireworksSound() {
    const sound = document.getElementById("fireworks-sound");
    sound.play();
}

// Сбросить викторину в начале
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    loadQuestion();
}

// Переход к викторине из меню
function startQuiz() {
    // Скрыть главное меню
    document.getElementById("menu").style.display = "none";
    // Показать викторину
    document.getElementById("quiz").style.display = "block";
    // Загрузить первый вопрос
    loadQuestion();
}
