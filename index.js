document.addEventListener('DOMContentLoaded', () => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
  .then(response => response.json())
  .then(data => {
    const cocktails = data.drinks;
    const cocktailsContainer = document.getElementById('cocktails');
    
    while (cocktailsContainer.firstChild) {
      cocktailsContainer.removeChild(cocktailsContainer.firstChild);
    }

    const randomCocktails = [];
    while (randomCocktails.length < 6) {
      const randomIndex = Math.floor(Math.random() * cocktails.length);
      const randomCocktail = cocktails[randomIndex];
      if (!randomCocktails.includes(randomCocktail)) {
        randomCocktails.push(randomCocktail);
      }
    }

    randomCocktails.forEach(cocktail => {
      const cocktailElement = document.createElement('div');
      cocktailElement.classList.add('cocktail');
      
      const nameElement = document.createElement('h3');
      nameElement.textContent = cocktail.strDrink;
      cocktailElement.appendChild(nameElement);
      
      const imageElement = document.createElement('img');
      imageElement.src = cocktail.strDrinkThumb;
      cocktailElement.appendChild(imageElement);
      
      const ingredientsElement = document.createElement('ul');
      for (let i = 1; i <= 1000; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient && measure) {
          const ingredientElement = document.createElement('li');
          ingredientElement.textContent = `${measure} ${ingredient}`;
          ingredientsElement.appendChild(ingredientElement);
        }
      }
      cocktailElement.appendChild(ingredientsElement);
      
      const instructionsElement = document.createElement('p');
      instructionsElement.textContent = cocktail.strInstructions;
      cocktailElement.appendChild(instructionsElement);
      
      cocktailsContainer.appendChild(cocktailElement);
      
    });
  })
  .catch(error => {
    console.error('Error fetching cocktails:', error);
  });


  
  

  const generateCocktailButton = document.querySelector('#generate-cocktail-button');
const cocktailDetailsContainer = document.querySelector('#cocktail-details');

generateCocktailButton.addEventListener('click', () => {
  cocktailDetailsContainer.innerHTML = 'Generating cocktail...';

  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const cocktail = data.drinks[0];
      const cocktailDetails = `
        <h3>${cocktail.strDrink}</h3>
        <img src="${cocktail.strDrinkThumb}">
        <p><strong>Instructions:</strong> ${cocktail.strInstructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          ${getCocktailIngredientsList(cocktail)}
        </ul>
      `;
      cocktailDetailsContainer.innerHTML = cocktailDetails;
    })
    .catch(error => {
      console.error('Error generating cocktail:', error);
      cocktailDetailsContainer.innerHTML = 'Error generating cocktail.';
    });
});

function getCocktailIngredientsList(cocktail) {
  let ingredientsList = '';
  for (let i = 1; i <= 1000; i++) {
    const ingredient = cocktail['strIngredient' + i];
    const measure = cocktail['strMeasure' + i];
    if (ingredient && measure) {
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else if (ingredient) {
      ingredientsList += `<li>${ingredient}</li>`;
    }
  }
  return ingredientsList;
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value.trim().toLowerCase();
  if (searchQuery) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        const cocktails = data.drinks;
        const cocktailsContainer = document.getElementById('cocktails');

        while (cocktailsContainer.firstChild) {
          cocktailsContainer.removeChild(cocktailsContainer.firstChild);
        }

        if (cocktails) {
          cocktails.forEach(cocktail => {
            const cocktailElement = createCocktailElement(cocktail);
            cocktailsContainer.appendChild(cocktailElement);
          });
        } else {
          const noResultsElement = document.createElement('p');
          noResultsElement.textContent = 'No cocktails found.';
          cocktailsContainer.appendChild(noResultsElement);
        }
      })
      
  }
});

function createCocktailElement(cocktail) {
  const cocktailElement = document.createElement('div');
  cocktailElement.classList.add('cocktail');

  const nameElement = document.createElement('h3');
  nameElement.textContent = cocktail.strDrink;
  cocktailElement.appendChild(nameElement);

  const imageElement = document.createElement('img');
  imageElement.src = cocktail.strDrinkThumb;
  cocktailElement.appendChild(imageElement);

  const ingredientsElement = document.createElement('ul');
  for (let i = 1; i <= 1000; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient && measure) {
      const ingredientElement = document.createElement('li');
      ingredientElement.textContent = `${measure} ${ingredient}`;
      ingredientsElement.appendChild(ingredientElement);
    }
  }
  cocktailElement.appendChild(ingredientsElement);

  const instructionsElement = document.createElement('p');
  instructionsElement.textContent = cocktail.strInstructions;
  cocktailElement.appendChild(instructionsElement);

  return cocktailElement;
}
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;

 
  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
  }

  
  const data = {
    name: name,
    email: email,
    message: message
  };

  fetch('submit-form.php', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      alert('Form submitted successfully!');
      form.reset(); 
    } else {
      throw new Error('Form submission failed.');
    }
  })
  
});


});

