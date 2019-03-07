async function getComponent() {
    const {
        default: _
    } = await import('lodash')
    var element = document.createElement('div')
    element.innerHTML = _.join(['wwt', 'syj'], '-')
    return element
}

document.addEventListener('click', () => {

    getComponent().then(element => {
        document.body.appendChild(element)
    })
})

// import test from './a.js'

// console.log(test.name)
// import _ from 'lodash'

// console.log(_.join(['wwt','syj'],'-'))