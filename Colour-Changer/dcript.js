const buttons = document.querySelectorAll('.button')
const body = document.querySelector('body')


buttons.forEach(function (button) {
    console.log(button);
    button.addEventListener('click', function(e) {
        console.log(e.target)
        const color = e.target.id
        const partone = document.getElementById('part1')
        partone.style.color = '#333';

        switch(color) {
            case 'grey':
                body.style.backgroundColor = e.target.id
                partone.style.color = '#fff'
                break;

            case 'white':
                body.style.backgroundColor = e.target.id
                break;

            case 'blue':
                body.style.backgroundColor = e.target.id
                partone.style.color = '#fff'
                break;

            case 'yellow':
                body.style.backgroundColor = e.target.id
                break;
        }
    })
});