// Function to generate a random number between 0 and num-1
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// Function to get a random entry from a list
function getRandomListEntry(list) {
    const randomIndex = getRandomNumber(list.length);
    return list[randomIndex];
}

// Function to generate star rating HTML
function ratingTemplate(rating) {
    // begin building an html string using the ratings HTML as a model
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    
    // our ratings are always out of 5, so create a for loop from 1 to 5
    for (let i = 1; i <= 5; i++) {
        // check to see if the current index of the loop is less than or equal to our rating
        if (i <= rating) {
            // if so then output a filled star
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            // else output an empty star
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    
    // after the loop, add the closing tag to our string
    html += `</span>`;
    // return the html string
    return html;
}

// Function to generate tags HTML
function tagsTemplate(tags) {
    // initialize empty HTML string
    let html = '';
    
    // loop through the tags list and transform the strings to HTML
    tags.forEach(tag => {
        html += `<span class="tag">${tag}</span>`;
    });
    
    return html;
}

// Function for recipe template
function recipeTemplate(recipe) {
    return `<article class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-content">
            <div class="recipe-tags">
                ${tagsTemplate(recipe.tags)}
            </div>
            <h2 class="recipe-title">${recipe.name}</h2>
            ${ratingTemplate(recipe.rating)}
            <p class="recipe-description">
                ${recipe.description}
            </p>
        </div>
    </article>`;
}

// Function to render recipes to the page
function renderRecipes(recipeList) {
    // get the element we will output the recipes into
    const mainElement = document.querySelector('main');
    
    // clear the current content
    mainElement.innerHTML = '';
    
    // use the recipeTemplate function to transform our recipe objects into recipe HTML strings
    recipeList.forEach(recipe => {
        mainElement.innerHTML += recipeTemplate(recipe);
    });
}

// Function to filter recipes based on a query
function filterRecipes(query) {
    if (!query) {
        return recipes;
    }
    
    // Filter the recipes based on the query
    const filteredRecipes = recipes.filter(recipe => {
        // Check if query appears in name, description, or tags
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
            recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))
        );
    });
    
    // Sort alphabetically by name
	return filteredRecipes.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}
``
// Function to handle search
function searchHandler(event) {
    event.preventDefault();
    
    // Get the search term
    const searchTerm = document.querySelector('.search-form input').value.toLowerCase();
    
    // Filter and render recipes
    const filteredRecipes = filterRecipes(searchTerm);
    renderRecipes(filteredRecipes);
}

// Initialize the page
function init() {
    // Get a random recipe
    const recipe = getRandomListEntry(recipes);
    
    // Render the recipe
    renderRecipes([recipe]);
    
    // Add event listener for search form
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', searchHandler);
}

// Call init function when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Recipe data already present in the file
const recipes = [
	{
		author: 'Provo High Culinary Students',
		url: '',
		isBasedOn: '',
		cookTime: '30 Min',
		datePublished: '2016-10-16',
		tags: ['Waffles', 'Sweet Potato', 'Side'],
		description: 'Savory waffles made with Sweet potato with a hint of Ginger',
		image: './images/sweet-potato-waffle-md.jpg',
		recipeIngredient: [
			'2 separated eggs',
			'1/4 C Oil',
			'1/4 tsp salt',
			'1/4 tsp Cayenne pepper',
			'3/4 C milk',
			'1 Tbsp Brown Sugar',
			'2 tsp Shredded Ginger',
			'3/4 C Mashed Sweet Potatoes',
			'1 Tbsp Minced Shallots',
			'1 Tbsp Baking Powder',
			'1 Tbsp Chives',
			'1/4 C Cornmeal',
			'1 C Flour'
		],
		name: 'Sweet Potato Waffles',
		prepTime: '30 Min',
		recipeInstructions: [
			'Add the egg yolks, oil, salt, cayenne, sugar, ginger, shallots, sweet potatoes (steam and mash before), and milk and mix well.',
			'Next add the cornmeal, chives, and flour and baking powder',
			'Whip the egg whites until stiff and fold in',
			'Cook until golden brown in a waffle iron. Serve with butter and Wilted Greens or Honey.'
		],
		recipeYield: '6 waffles',
		rating: 4
	},
	{
		author: 'Shane Thompson',
		url: '',
		isBasedOn: '',
		cookTime: '20 min',
		datePublished: '',
		tags: ['Chicken', 'Entree'],
		description:
			'Delicious quick and easy creamy rice dish. The mustard, mushrooms, and lemon all blend together wonderfully',
		image: './images/escalopes-de-poulet-a-la-creme.webp',
		recipeIngredient: [
			'2 Chicken Tenders, Cubed',
			'4 Mushrooms, Sliced',
			'1/2 C Whipping Cream',
			'1-2 Tbsp Stone Ground Mustard',
			'1 tsp Lemon Juice',
			'Salt and Pepper to taste',
			'1 C Rice, uncooked',
			'4-5 oz Fresh Green Beans'
		],
		name: 'Escalope de Poulet a la Creme with steamed green beans (Chicken with Cream)',
		prepTime: '10 min',
		recipeInstructions: [
			'Add 1 1/2 cups of water to a pan and bring to a boil.  Add the rice and reduce heat to low and simmer for 10-15 minutes or until all the moisture is gone.',
			'Cube chicken then cook over medium high heat in a fry pan, add the mushrooms about halfway through. (10 minutes). ',
			'Pour in cream, mustard and salt and pepper.  Stir.  On medium heat, simmer until it thickens (5 minutes)',
			'While preparing sauce: wash the beans, then trim the ends and snap (or cut) into 2in lengths.  In a sauce pan with a colander add about 1 cup water and steam the beans (10-15 minutes)',
			'Serve sauce over rice, with the Green beans on the side.'
		],
		recipeYield: '3 servings',
		rating: 4.5
	},
	{
		author: 'Shane Thompson',
		url: '',
		isBasedOn: '',
		cookTime: '30 min',
		datePublished: '2018-09-19',
		tags: ['Potatoes', 'side'],
		description:
			'Easy and delicious oven roasted potatoes that go great with almost anything.',
		image: './images/roasted-potatoes.webp',
		recipeIngredient: [
			'3-4 Medium Potatoes',
			'1 Tbsp Olive oil',
			'2 tsp Italian Seasoning',
			'1/2 tsp Salt',
			'1/2 tsp Ground Black Pepper',
			'1-2 tsp Hot Sauce (optional)'
		],
		name: 'Oven Roasted potato slices',
		prepTime: '10 min',
		recipeInstructions: [
			'Preheat oven to 400 deg F',
			'Wash and thinly slice the potatoes (I usually slice the potato in half lengthwise, then thinly slice the halves, again lengthwise)',
			'Mix together the oil, salt, pepper, Italian seasoning, and hot sauce.',
			'Toss the potatoes in the spice mixture to evenly coat then spead over a baking sheet',
			'Bake for 30 min or until the desired level of crispyness is achieved.'
		],
		recipeYield: '',
		rating: 4
	},
	{
		author: 'Shane Thompson',
		url: '',
		isBasedOn: '',
		cookTime: '20 min',
		datePublished: '2018-09-19',
		tags: ['Southwest', 'entree'],
		description:
			'Black beans and tomatoes served over a bed of rice. Top with cheese and scoop up with tortilla chips for maximum enjoyment.',
		image: './images/black-beans-and-rice.jpg',
		recipeIngredient: [
			'1 Medium Onion, diced',
			'2 Cloves Garlic, minced',
			'1 Tbsp Olive oil',
			'1 Can Black Beans (15oz)',
			'1 Can Diced Tomatoes (15oz)',
			'1/8 tsp Cayenne Pepper (optional)',
			'2 C Brown Rice (uncooked)',
			'Grated Cheese',
			'Tortilla Chips'
		],
		name: 'Black Beans and Rice',
		prepTime: '10 min',
		recipeInstructions: [
			'Add 4 cups water to a saucepan and bring to a boil. Add Rice, stir, cover, and reduce heat to low. Cook until moisture is gone. (20-30 minutes)',
			'In another saucepan heat the oil and add the diced onion and garlic. Cook until tender.',
			'Stir in the drained Black beans, Undrained tomatoes, and Cayenne.',
			'Bring to a boil, then reduce heat and simmer uncovered for 15 min.',
			'Serve over rice, topped with grated cheese and Tortilla chips.'
		],
		recipeYield: '4 servings',
		rating: 3
	},
	{
		author: 'Shane Thompson',
		url: '',
		isBasedOn: '',
		cookTime: '30 min',
		datePublished: '2018-09-19',
		tags: ['chicken', 'entree', 'Indian'],
		description:
			'Quick and easy Chicken curry recipe made with easy to find ingredients.',
		image: './images/chicken-curry.webp',
		recipeIngredient: [
			'4 Slices Bacon',
			'1 clove Garlic',
			'2 Tbsp Flour',
			'1 C water',
			'1 C Milk',
			'3 Tbsp Tomato Paste',
			'1/2 C Apple Sauce',
			'3-4 tsp Curry Powder',
			'2 tsp Chicken Bouillion',
			'3/4 C Sour Cream',
			'1-2 C Chicken, cubed',
			'2 C Rice, uncooked'
		],
		name: 'Chicken Curry',
		prepTime: '10 min',
		recipeInstructions: [
			'Add 3 cups water to a saucepan and bring to a boil. Add Rice, stir, cover, and reduce heat to low. Cook until moisture is gone. (15-20 minutes)',
			'Cook bacon until crisp, drain reserving 1 Tbsp of bacon drippings, crumble bacon and set aside.',
			'Cook Chicken and Cube.',
			'Blend flour into bacon drippings then stir in the milk until the flour is well mixed. Stir in water, applesauce, tomato paste, curry, and bullion, and garlic.',
			'Bring to a boil, then reduce heat and simmer until rice is done.',
			'Before serving add crumbled bacon, chicken and stir in sour cream. Serve over rice.',
			'Can add condiments if desired: fried potatoes, raisins, toasted coconut, chutney, diced peppers, almonds, cashews.'
		],
		recipeYield: '5 servings',
		rating: 5
	},
	{
		author: 'Shane Thompson',
		url: '',
		isBasedOn: '',
		cookTime: '11 min',
		datePublished: '2018-09-19',
		tags: ['dessert'],
		description: 'Delicious soft chocolate chip cookies with coconut.',
		image: './images/chocolate-chip-cookies.jpg',
		recipeIngredient: [
			'1 Lb butter, softened',
			'1 C white sugar',
			'3 Eggs',
			'1 1/2 C Brown sugar',
			'1 tsp Baking soda',
			'1 tsp Vanilla extract',
			'1/4 tsp Salt',
			'5 C Flour (We like mixing 2 cups whole wheat with 3 cups white)',
			'2 C Chocolate Chips',
			'1 C Shredded Coconut'
		],
		name: 'Chocolate Chip Cookies',
		prepTime: '15 min',
		recipeInstructions: [
			'Preheat oven to 350F.',
			'Cream butter, white sugar, and eggs together.',
			'Add brown sugar, salt, baking soda, and vanilla. Mix well.',
			'Add flour, chocolate chips, and coconut. Mix well.',
			'Place on baking sheet in rows of 1-1.5 inch balls of dough.',
			'Bake for 11-12 minutes.'
		],
		recipeYield: '8 dozen',
		rating: 5
	}
];