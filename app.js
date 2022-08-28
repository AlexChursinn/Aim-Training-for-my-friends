/* 5) первое что мы должны сделать обработать кнопку начать игру */
const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen') /* 7) Добавляем обработку экранов всех */

const timeList = document.querySelector('#time-list') /* 10) Получаю наши кнопки со временем */

/* 23) Получаем доску board чтобы туда поместить наши мишени */
const board = document.querySelector('#board')


/* 18) Теперь в третьем окне надо указать сколько времени должно быть у нас в игре */
const timeEl = document.querySelector('#time') /* 19) достаем id time */

/* 13) Теперь нужно определить какую кнопку я нажал и сколько времени нужно добавить */
let time = 0 /* 14) по умолчанию ноль */
let score = 0 /* 34) счет нашей игры */

startBtn.addEventListener('click', (event) => {
  event.preventDefault() /* 6) создали обработку кнопки клик и функцию эвент чтобы сбросить # при клике по кнопке */
  screens[0].classList.add('up') /* 8) создаем переход от экрана к экрану */
} )

timeList.addEventListener('click', event => { /* 11) событие для кнопок, создали одно свойство для всех кнопок, но нам надо обрабатывать по одной кнопке будем делать через делегирование событий */
  if (event.target.classList.contains('time-btn')) { /* 12) if (event.target.classList.contains('time-btn')) если у элемента есть класс time-btn значит у элемента есть кнопка */
  time = parseInt(event.target.getAttribute('data-time')) /* 15) выбираем время кнопки */
  screens[1].classList.add('up') /* 17) Первое изменяем наш экран по аналогу как до этого */
  startGame() /* 16) Добавляем начало игры */
  }
})


board.addEventListener('click', event => { /* 33) Клик по мишене */
  if (event.target.classList.contains('circle')) {
  score++
  event.target.remove() /* 35) удаляет мишень при клике */
  createRandomCircle() /* 36) чтобы появилась новая мишень задаю опять это значение */
  }
})

/* 18) DEBUG startGame()*/ 

function startGame() { 
  setInterval(decreaseTime, 1000) /* 19) чтобы задать сколько времени нам нужно */
  createRandomCircle() /* 25) Добавляем при начале игры наши мишени */
  setTime(time)
}

function decreaseTime() { 
  if (time === 0) { /* 21) если время равно нулю то закончить игру если нет то отчет идет */
    finishGame()
  } else {
    let current = --time
    if (current < 10) { /* 20 если время меньше 10 секнд добавляем 0 (пример 09, 08 и тд) */
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() { /* 37) Дописываем эту функцию */
  timeEl.parentNode.classList.add('hide') /* 39) Удаляем вверхню строчку */
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>` /* 38) Показываю счет игры */
}
 
function createRandomCircle() { /* 21) функция создания всплывающих мишеней */
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60) /*29) получаем сайз мишени от 10 до 60 пикс  */
  const {width, height} = board.getBoundingClientRect() /* 31) Получаем ширину и высоту нашего board */
  const x = getRandomNumber(0, width - size) /* 30) В цсс они позиция абсолют и мы задаем свойства по иксу и игрику икс это лево право игрик вверх низ 32) Получаем значение минимум 0 и ширина минус сайз(размер мишени)*/
  const y = getRandomNumber(0, height - size)/* 30) В цсс они позиция абсолют и мы задаем свойства по иксу и игрику икс это лево право игрик вверх низ 32) Получаем значение минимум 0 и ширина минус сайз(размер мишени)*/

  circle.classList.add('circle') /* 22) создали доп класс мишень */
  circle.style.width = `${size}px` /* 26) Создаем стиль для наших мишеней */
  circle.style.height = `${size}px` /* 27) Создаем стиль для наших мишеней */
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`


  board.append(circle) /* 24) Добавили нашу мишень в поле */
}

function getRandomNumber(min, max) { /* 28) Функция создания рандомных мишеней на поле с минимальным и макс значением */
  return Math.round(Math.random() * (max - min) + min) 

}