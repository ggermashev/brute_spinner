window.addEventListener('load', () => {
    const focuesInput = document.getElementById("focused-value-input")
    focuesInput?.focus()

    const spinnerValues = document.querySelectorAll(".spinner-value")
    const spinnerAnimations = document.querySelectorAll(".spinner-animation")
    const spinnerVisibilities = document.querySelectorAll(".spinner-visibility")

    spinnerValues.forEach(input => {
        const spinnerId = input.getAttribute("spinner_id")
        const value = parseFloat(input.value) || 0
        sendSpinnerEnevt({ eventType: VALUE, spinnerId, value })

        input.addEventListener('change', (e) => {
            const value = parseFloat(e.target.value)
            sendSpinnerEnevt({ eventType: VALUE, spinnerId, value })
        })
    })

    spinnerAnimations.forEach(toggle => {
        const spinnerId = toggle.getAttribute("spinner_id")

        toggle.addEventListener('change', (e) => {
            sendSpinnerEnevt({ eventType: ANIMATION, spinnerId, value: e.value })
        })
    })

    spinnerVisibilities.forEach(toggle => {
        const spinnerId = toggle.getAttribute("spinner_id")

        toggle.addEventListener('change', (e) => {
            sendSpinnerEnevt({ eventType: VISIBILITY, spinnerId, value: e.value })
        })
    })
})
