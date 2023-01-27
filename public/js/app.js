const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const weatherIcon = document.querySelector('#weather-icon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location  = search.value
    msgOne.textContent = "Loading..."
    msgTwo.textContent = ''
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msgOne.innerText=''
                msgTwo.innerText = data.error
            } else {
                console.log(data)
                msgOne.innerText = data.city
                msgTwo.innerText = data.forecast
                weatherIcon.src = data.icon
            }
        })
    })
})