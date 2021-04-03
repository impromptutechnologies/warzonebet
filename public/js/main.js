
console.log('client js loaded')



fetch('http://localhost:6969/weather?address=boston').then((response) => {
    response.json().then((data) => {
        console.log(data.weather[0].address)
    })
})

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#temperature')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    
    if (!location){
        p1.textContent = "No Address"
    } else {
        fetch('http://localhost:6969/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error
            } else {
                p1.textContent = data.weather[0].temperature
            }
        })
    })
}
})