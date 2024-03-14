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
- Создайте div. Присвойте ему class="spinner", а также задайте диаметр спинера d="число".
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


## Toggle API
При изменение генерируется событие "change"
Значение лежит внутри event.value

Стили можно менять используя следующие css классы:
- .toggle
- .tobble__bg
- .toggle__tumbler
- .toggle__bg__active
- .toggle__tumbler__active


