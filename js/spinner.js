const SPINNER = "spinner"
const VALUE = "value"
const ANIMATION = "animation"
const VISIBILITY = "visibility"

window.addEventListener('load', () => {
    const spinners = document.querySelectorAll(".spinner")

    spinners.forEach(spinner => {
        const id = spinner.getAttribute("id")
        const height = spinner.getAttribute("height")
        const width = spinner.getAttribute("width")

        spinner.addEventListener(`${SPINNER}-${VALUE}-${id}`, (el) => {
            drawSpinner(id, el.value)
        })
        spinner.addEventListener(`${SPINNER}-${ANIMATION}-${id}`, (el) => {
            rotateSpinner(id, el.value)
        })
        spinner.addEventListener(`${SPINNER}-${VISIBILITY}-${id}`, (el) => {
            setSpinerVisibility(id, el.value)
        })

        const canvas = document.createElement("canvas")
        canvas.setAttribute("class", "spinner__canvas")
        canvas.setAttribute("height", height)
        canvas.setAttribute("width", width)
        spinner.appendChild(canvas)

        const circle = document.createElement("div")
        circle.setAttribute("class", "spinner__circle")
        spinner.appendChild(circle)
    })
})

function drawSpinner(id, percent) {
    const spinner = document.getElementById(id)
    const children = spinner.children
    const canvas = children[children.length - 2]
    const context = canvas?.getContext('2d')

    const h = canvas.getAttribute("height")
    const w = canvas.getAttribute("width")
    const r = Math.round(Math.min(h, w)) / 2
    const centerX = Math.round(w/2)
    const centerY = Math.round(h/2)

    context.clearRect(0, 0, w, h)
    const styles = window.getComputedStyle(document.body)
    const color = styles.getPropertyValue("--spinner-filled-color");
    context.fillStyle = color || "#336699"

    const angle = 2 * Math.PI * percent / 100
    const [minX, maxX] = getMinMaxX(angle)
    for (let x = minX; x <= maxX; x+= 0.5) {
        const [minY, maxY] = getMinMaxY(x, angle)
        for (let y = minY; y <= maxY; y+= 0.5) {
            context.fillRect(x, y, 1, 1)
        }
    }

    function getMinMaxX(angle) {
        if (angle <= Math.PI / 2) {
            return [centerX, centerX + r * Math.sin(angle)]
        } 
        if (angle <= Math.PI) {
            return [centerX, centerX + r]
        }
        if (angle <= 3 * Math.PI / 2) {
            return [centerX + r * Math.sin(angle), centerX + r]
        }
        return [centerX - r, centerX + r]
    }

    function getMinMaxY(x, angle) {
        if (angle < Math.PI) {
            return [centerY - r, centerY - Math.min(r, (x - centerX) / Math.tan(angle))]
        }
        if (x >= centerX) {
            return [centerY - r, centerY + r]
        }
        return [centerY - Math.min(r, (x-centerX) / Math.tan(angle)), centerY + r]
    }
}

function rotateSpinner(id, isRotating) {
    console.log(isRotating)
}

function setSpinerVisibility(id, isVisible) {
    console.log(isVisible)
}

function sendSpinnerEnevt({eventType, spinnerId, value}) {
    const possibleValues = [VALUE, ANIMATION, VISIBILITY]
    if (!possibleValues.includes(eventType)) {
        throw new SpinnerInvalidEventTypeError(eventType, possibleValues)
    }

    if (eventType === VALUE) {
        if (typeof value !== "number") {
            throw new SpinnerEventValueTypeError(eventType, "number", typeof value)
        }

        if (Number.isNaN(value)) {
            throw new SpinnerEventValueTypeError(eventType, "number", "NaN")
        }

        if (value < 0 || value > 100) {
            throw new SpinnerEventValueOutOfRangeError(value, 0, 100)
        }

        value = Math.round(value)
    }

    if( eventType === ANIMATION || eventType === VISIBILITY) {
        if (typeof value !== "boolean") {
            throw new SpinnerEventValueTypeError(eventType, "boolean", typeof value)
        }
    }

    const spinner  = document.getElementById(spinnerId)
    const event = new Event(`${SPINNER}-${eventType}-${spinnerId}`)
    event.value = value
    spinner.dispatchEvent(event)
}

class SpinnerInvalidEventTypeError extends Error {
    constructor(passedType, possibleValues) {
        super(`type should be one of: ${possibleValues.join(', ')}. Passed: ${passedType}\n`)
        this.name = "Spinner-Event-Invalid-Type-Error"
    }
}

class SpinnerEventValueTypeError extends Error {
    constructor(eventType, valueType, passedType) {
        super(`Type of value for event '${eventType}' should be '${valueType}'. Passed: '${passedType}'\n`)
        this.name = "Spinner-Event-Value-Type-Error"
    }
}

class SpinnerEventValueOutOfRangeError extends Error {
    constructor(currentValue, minVal, maxVal) {
        super(`Passed value for event '${VALUE}' is out of range [${minVal}, ${maxVal}]. Passed: ${currentValue}\n`)
        this.name = "Spinner-Event-Value-Out-Of-Range-Error"
    }
}