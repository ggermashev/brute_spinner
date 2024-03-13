window.addEventListener('load', () => {
    const spinnerValues = document.querySelectorAll(".spinner-value")
    const spinnerAnimations = document.querySelectorAll(".spinner-animation")
    const spinnerVisibilities = document.querySelectorAll(".spinner-visibility")

    spinnerValues.forEach(input => {
        const spinnerId = input.getAttribute("spinner_id")

        input.addEventListener('change', (e) => {
            const value = parseFloat(e.target.value)
            sendSpinnerEnevt({ eventType: VALUE, spinnerId, value })
        })
    })

    spinnerAnimations.forEach(checkbox => {
        const spinnerId = checkbox.getAttribute("spinner_id")

        checkbox.addEventListener('change', (e) => {
            sendSpinnerEnevt({ eventType: ANIMATION, spinnerId, value: e.target.checked })
        })
    })

    spinnerVisibilities.forEach(checkbox => {
        const spinnerId = checkbox.getAttribute("spinner_id")

        checkbox.addEventListener('change', (e) => {
            sendSpinnerEnevt({ eventType: VISIBILITY, spinnerId, value: e.target.checked })
        })
    })
})
