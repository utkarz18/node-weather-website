const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = input.value

    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
    
    const url = 'http://localhost:3000/weather?address=' + address
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error)
                return messageOne.textContent = data.error
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})