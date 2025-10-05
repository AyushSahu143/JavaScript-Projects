const form = document.querySelector('form')
const button = document.querySelector('button')

form.addEventListener('submit', function (e) {
    e.preventDefault();

   const height = parseInt(document.querySelector('#height').value)
   const weight = parseInt(document.querySelector('#weight').value)
   const result = document.querySelector('#results')

   if(height < 0 || isNaN(height) || height === 0) {
        result.appendChild(document.createTextNode("Please enter a valid measure!"))

   }

    if(weight < 0 || isNaN(weight) || weight === 0) {
        result.appendChild(document.createTextNode("Please enter a valid measure!"))
   }

   let bmiIndex = (weight / ((height*height)/10000)).toFixed(2)
   result.textContent = `Your BMI is ${bmiIndex}`;
});

