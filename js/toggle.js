const TOGGLE = "toggle"

window.addEventListener('load', () => {
    const toggles = document.querySelectorAll(`.${TOGGLE}`)

    toggles.forEach(toggle => {
        const bg = document.createElement("div")
        bg.setAttribute("class", `${TOGGLE}__bg`)
        
        const tumbler = document.createElement("div")
        tumbler.setAttribute("class", `${TOGGLE}__tumbler`)

        toggle.appendChild(bg)
        toggle.appendChild(tumbler)

        toggle.setAttribute("value", false)
        toggle.addEventListener('click', (e) => {
            const sValue = toggle.getAttribute("value")
            const newValue = sValue === "true" ? false : true
            toggle.setAttribute("value", newValue)

            if (newValue) {
                const bgClassName = bg.getAttribute("class")
                bg.setAttribute("class", bgClassName + " toggle__bg__active")

                const tumblerClassName = tumbler.getAttribute("class")
                tumbler.setAttribute("class", tumblerClassName + " toggle__tumbler__active")
            } else {
                const bgClassName = bg.getAttribute("class")
                let lastClass = bgClassName.split(' ').at(-1)
                if (lastClass === "toggle__bg__active") {
                    bg.setAttribute("class", bgClassName.split(' ').slice(0, -1).join(' '))
                }
               
                const tumblerClassName = tumbler.getAttribute("class")
                lastClass = tumblerClassName.split(' ').at(-1)
                if (lastClass === "toggle__tumbler__active") {
                    tumbler.setAttribute("class",  tumblerClassName.split(' ').slice(0, -1).join(' '))
                }
            }

            const event = new Event("change")
            event.value = newValue
            toggle.dispatchEvent(event)
        })
    })
})