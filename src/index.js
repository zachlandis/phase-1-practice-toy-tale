let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {data.forEach(toy => buildToyCard(toy))})

  function buildToyCard(toy) {
    const toyCard = document.createElement('div')
    toyCard.className = 'card'

    const toyName = document.createElement('h2')
    toyName.id = 'toy-header'
    toyName.textContent = `${toy.name}`

    const toyImg = document.createElement('img')
    toyImg.src = toy.image
    toyImg.className = 'toy-avatar'

    const likeBtn = document.createElement('button')
    likeBtn.textContent = 'like'
    likeBtn.className = 'like-btn'
    likeBtn.id = toy.id
    likeBtn.addEventListener('click', () => increaseLikes(toy))
  

    document.querySelector(['#toy-collection']).append(toyCard)
    toyCard.append(toyName, toyImg, likeBtn)
    
  }
  
});


  let form = document.querySelector(['.add-toy-form'])
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target.name.value)
    createToy(e.target)
  })
    
function createToy(toy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": `${toy.name.value}`,
        "image": `${toy.image.value}`,
        "likes": `0`
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}


function increaseLikes(toy) {
  console.log(toy)
  let likeCounter = toy.likes
  console.log(likeCounter)
  likeCounter = toy.likes ++
  console.log(toy.likes)
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
}



