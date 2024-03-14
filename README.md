# Задание
Изготовить собственный компонент блока прогресса для мобильных web приложений

### Стэк
- html
- css
- js

# Выполнение
Ссылка на приложение: https://ggermashev.github.io/brute_spinner/

В рамках проекта реализовано два компонента:
- Спиннер для отображения прогресса
- Конпка-переключатель

### Спиннер API

Чтобы использовать спинер в своем приложении:
- Подключите в html соответствующие css- и js-файлы (spinner.css, spinner.js)
- Создайте div. Присвойте ему class="spinner", задайте диаметр спинера d="число", а также уникальный id.
- Для управления спинером предусмотрена функция sendSpinnerEvent

#### sendSpinnerEvent
params: 
- type: json
- properties:
    - eventType: "value" | "animation" | "visibility" (или можно использовать константы VALUE, ANIMATION, VISIBILITY соответственно)
    - spinnerId: id спинера, к которому отправляется событие
    - value: Значение, которое передается вместе с типом события

При передаче eventType и value реализована валидация. Если что-то передано не в том формате - выбрасывается соответствующая ошибка.

eventType - VALUE, value - Число от 0 до 100

eventType - ANIMATION или VISIBILITY, value - boolean

Стили можно менять, используя следующие css переменные и классы:
- var(--spinner-empty-color)
- var(--spinner-filled-color)
- .spinner
- .spinner__canvas__rotating
- .spinner__circle
- .spinner__canvas


### Toggle API
При клике генерируется событие "change".
Значение лежит внутри <b>event.value</b>

Стили можно менять используя следующие css классы:
- .toggle
- .tobble__bg
- .toggle__tumbler
- .toggle__bg__active
- .toggle__tumbler__active

## Структура проекта
- index.html, index.js, styles.css - демонстрация использования компонента spinner. Также файлы содержат логику для управления спинером средствами поля ввода и двух переключателей. В файле стилей реализована верстка в соответствии с макетом.

- toggle.js и toggle.css - реализация логики переключателей, а также их стили.

- spinner.js, spinner.css - логика спинера и его стили.

Спинер реализован с помощью canvas. При передаче значения от 0 до 100, оно преобразуется в угол от 0 до 2*PI радиан. Далее, на основе угла, высчитывается, какой сектор необходимо закрасить. На основе угла и радиуса спинера рассчитываются (х, у) координаты для отображения пикселей на canvas.

Для имитации кольца поверх canvas расположен круглый div меньшего радиуса.

