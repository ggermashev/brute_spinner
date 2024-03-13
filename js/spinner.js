window.addEventListener('load', () => {
    // const emiter = new EventEmitter()

    const spinners = document.querySelectorAll(".spinner")
    const spinnerValues = document.querySelectorAll(".spinner-value")
    const spinnerAnimations = document.querySelectorAll(".spinner-animation")
    const spinnerVisibilities = document.querySelectorAll(".spinner-visibility")

    spinners.forEach(spinner => {
        const id = spinner.getAttribute("id")
        spinner.addEventListener(`spinner-value-${id}`, (el) => {
            console.log("value", el.value)
        })
        spinner.addEventListener(`spinner-animation-${id}`, (el) => {
            console.log("animation", el.value)
        })
        spinner.addEventListener(`spinner-visibility-${id}`, (el) => {
            console.log("visibility", el.value)
        })
    })

    spinnerValues.forEach(input => {
        const spinnerId = input.getAttribute("spinner_id")
        const spinner  = document.getElementById(spinnerId)

        input.addEventListener('change', (e) => {
            const event = new Event(`spinner-value-${spinnerId}`)
            event.value = e.target.value
            spinner.dispatchEvent(event)
        })
    })

    spinnerAnimations.forEach(checkbox => {
        const spinnerId = checkbox.getAttribute("spinner_id")
        const spinner  = document.getElementById(spinnerId)

        checkbox.addEventListener('change', (e) => {
            const event = new Event(`spinner-animation-${spinnerId}`)
            event.value = e.target.checked
            spinner.dispatchEvent(event)
        })
    })

    spinnerVisibilities.forEach(checkbox => {
        const spinnerId = checkbox.getAttribute("spinner_id")
        const spinner  = document.getElementById(spinnerId)

        checkbox.addEventListener('change', (e) => {
            const event = new Event(`spinner-visibility-${spinnerId}`)
            event.value = e.target.checked
            spinner.dispatchEvent(event)
        })
    })
})

function drawSpinner() {

}

function rotateSpinner() {

}

function setSpinerVisibility() {

}