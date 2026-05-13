alert('Hello. Ты впервые зашел на сайт')

const container = document.getElementById('container')
const page1Title = document.getElementById('page1Title')
const linkToPage2 = document.getElementById('linkToPage2')

linkToPage2.addEventListener('click', () => {
    page1Title.remove()
    linkToPage2.remove()

    const newPage2Title = document.createElement('h1')
    newPage2Title.innerText = 'Page 2'

    container.appendChild(newPage2Title)
})