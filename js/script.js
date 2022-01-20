'use strict';

const main = document.querySelector('.main'),
    selection = document.querySelector('.selection'),
    title = document.querySelector('.main__title');

const getData = () => {
    const dataBase = [
        {
            id: '01',
            theme: 'Тема01 тест',
            rezult: [
                [40, 'Есть задатки, нужно развиваться'],
                [80, 'Очень хорошо, но есть пробелы'],
                [100, 'Отличный результат'],
            ],
            list: [
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'неправильный'],
                    correct: 2,
                },
                {
                    type: 'radio',
                    question: 'Вопос',
                    answers: ['Правильный1', 'неПравильный1', 'неправильный', 'неправильный'],                    
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'неправильный', 'неправильный'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'неправильный', 'неправильный'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'правильный', 'неправильный'],
                    correct: 3,
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'неПравильный1', 'неправильный', 'неправильный'],
                    correct: 1,
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'неправильный', 'неправильный'],
                    correct: 2,
                }
            ]
        },
        {
            id: '02',
            theme: 'Тема02 тесттоже',
            rezult: [
                [30, 'Есть задатки, нужно развиваться'],
                [60, 'Очень хорошо, но есть пробелы'],
                [100, 'Отличный результат'],
            ],
            list: [
                {
                    type: 'radio',
                    question: 'Вопос',
                    answers: ['Правильный1', 'неПравильный1', 'неправильный', 'неправильный'],                    
                },
                {
                    type: 'radio',
                    question: 'Вопос',
                    answers: ['Правильный1', 'неПравильный1', 'неправильный', 'неправильный'],                    
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'неправильный', 'неправильный'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'неправильный', 'неправильный'],
                    correct: 2,
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'Правильный1', 'правильный', 'неправильный'],
                    correct: 3,
                },
                {
                    type: 'checkbox',
                    question: 'Вопос',
                    answers: ['Правильный1', 'неПравильный1', 'неправильный', 'неправильный'],
                    correct: 1,
                },                
            ]
        }
    ];

    return dataBase;
};

const hideElem = elem => {
    let opacity = getComputedStyle(elem).getPropertyValue('opacity'); // получаем свойства
    
    const animation = () => {
        opacity -= 0.05; 
        elem.style.opacity = opacity;
        
        if(opacity > 0) {
            requestAnimationFrame(animation);
        } else {
            elem.style.display = 'none';
        }
    };

    requestAnimationFrame(animation);
};

const renderTheme = (themes) => {

    // console.log(themes);

    const list = document.querySelector('.selection__list');
    list.textContent = '';

    themes.forEach((themes) => {
        list.innerHTML += `
            <li class="selection__item">
                <button class="selection__theme" data-id="${themes.id}">${themes.theme}</button>
            </li>
        `;
    });
    
    return document.querySelectorAll('.selection__theme');
};

const createAnswer = data => {
    const type = data.type;

    return data.answers.map(item => {
        const label = document.createElement('label'),
            input = document.createElement('input');
        
            label.className = 'answer';
            input.type = type;
            input.name = 'answer';
            input.className = `answer__${type}`;

        const text = document.createTextNode(item);

        label.append(input, text);

        return label;
    });
};

const renderQuiz = quiz => {
    hideElem(title);
    hideElem(selection);

    const questionBox = document.createElement('div');
    questionBox.className = 'main__box main__box_question';

    main.append(questionBox);

    let questionCount = 0;

    const showQuestion = () => {
        const data = quiz.list[questionCount];
        questionCount += 1;

        questionBox.textContent = '';

        const form = document.createElement('form');
        form.className = 'main__form-question';
        form.dataset.count = `${questionCount}/${quiz.list.length}`;

        const fieldset = document.createElement('fieldset'),
            legend = document.createElement('legend');
            legend.className = 'main__subtitle';
            legend.textContent = data.question;
            
        const answers = createAnswer(data);            

        const button = document.createElement('button');
        button.className = 'main__btn question__next';
        button.type = 'submit';
        button.textContent = 'Подтвердить';
            
        fieldset.append(legend, ...answers);           

        form.append(fieldset, button);

        questionBox.append(form);

        form.addEventListener('submit', event => {
            event.preventDefault();
            
            let ok = false;

            const answer = [...form.answer].map(input => {

                if(input.checked) ok = true;

                return input.checked ? input.value : false;
            });
            console.log(answer);
            
        });
    };

    showQuestion();

};  

const addClick = (buttons, data) => {

    buttons.forEach(btn => {

        btn.addEventListener('click',() => {
            const quiz = data.find(item => item.id === btn.dataset.id);
            renderQuiz(quiz);
        });

    });

};

const initQuiz = () => {

    const data = getData();

    const buttons = renderTheme(data);

    addClick(buttons, data);
};

initQuiz();