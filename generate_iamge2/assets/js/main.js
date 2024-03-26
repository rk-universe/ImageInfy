/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close')

// SHOW
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show')
})

// HIDDEN
closeMenu.addEventListener('click', ()=>{
    navMenu.classList.remove('show')
})

/*===== MOUSEMOVE HOME IMG =====*/
document.addEventListener('mousemove', move);
function move(e){
    this.querySelectorAll('.move').forEach(layer =>{
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/120
        const y = (window.innerHeight - e.pageY*speed)/120

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}

/*===== GSAP ANIMATION =====*/
// NAV
gsap.from('.nav__logo, .nav__toggle', {opacity: 0, duration: 1, delay:2, y: 10})
gsap.from('.nav__item', {opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2,})

// HOME
gsap.from('.home__title', {opacity: 0, duration: 1, delay:1.6, y: 30})
gsap.from('.home__description', {opacity: 0, duration: 1, delay:1.8, y: 30})
gsap.from('.home__button', {opacity: 0, duration: 1, delay:2.1, y: 30})
gsap.from('.home__img', {opacity: 0, duration: 1, delay:1.3, y: 30})
  
//image generation
//image genearation api
const textInput = document.getElementById('textInput');
const generateButton = document.getElementById('generateButton');
const resultArea = document.getElementById('resultArea');
generateButton.addEventListener('click', () => {
    // Disable the button and change its text
    generateButton.disabled = true;
    generateButton.textContent = 'Generating...';

    // Make the API request
    console.log(textInput.value); // Log the input value
    query({"inputs": textInput.value }).then((response) => {
        const imageURL = URL.createObjectURL(response);
        const imageElement = document.createElement('img'); // Fixed typo: removed '+' before 'document.createElement'
        imageElement.src = imageURL;
        resultArea.innerHTML = ''; // Clear previous result
        resultArea.appendChild(imageElement);
        
        // Re-enable the button and restore its text
        generateButton.disabled = false;
        generateButton.textContent = 'Generate';
    }).catch(error => {
        console.error('Error:', error);
        // Re-enable the button and restore its text
        generateButton.disabled = false;
        generateButton.textContent = 'Generate';
    });
});
async function query(data) {
    console.log("query fired")
    const response = await fetch(
        "https://api-inference.huggingface.co/models/rahulkumawat/kiara_fine_tune_lora",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}
