// Animal blueprint
class Animal {
    constructor(name) {
        this._name = name;
        this._hunger = 100;
        this._thirst = 100;
        this._mood = "OK!";
    }
    get name() {
        return this._name;
    }
    get hunger() {
        return this._hunger;
    }
    get thirst() {
        return this._thirst;
    }
    get mood() {
        return this._mood;
    }
    eat() {
        this._hunger--;
    }
    drink() {
        this._hunger--;
    }
}

// Cat blueprint
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    get favFood() {
        // generate random favfood
        return catFavs[Math.floor(Math.random()*catFavs.length)];
    }
    get likesFood() {
        return catFavs;
    }
}

// Cat likes
let catFavs = ["fish", "milk", "chicken"];

// Get reference to cat spawner button
let spawnCatButton = document.getElementById("new-cat");

// Keep track of animals created
let animalCount = 0;

// Add event on click of Cat spawner button
spawnCatButton.addEventListener("click", () => {
    animalCount++;
    makeNewCat();
})

// Large function that creates a Cat object in memory,
// randomly assigns a Cat Sprite and its Stats Tag,
// creates a container for the cat and its tag,
// then inserts the entire cat container into the HTML
function makeNewCat() {
        //Creates a new Cat object and insert img in html
    // NOTE: this could be put into its own function elsewhere...
    let newCat = prompt("enter name: ");
    newCat = new Cat(newCat);
    console.log(newCat);

    // Create new container for cat and its tags; set its id and class
    let newCatContainer = document.createElement("div");
    newCatContainer.setAttribute("class", "cat-container");
    newCatContainer.setAttribute("id", `${newCat.name}-container`);
    newCatContainer.setAttribute("style", `z-index: ${animalCount}`);

    // Append the container to the top ground div
    document.getElementById("top-ground").appendChild(newCatContainer);

    // Create an img element for sprite
    let newCatSprite = document.createElement("img");

    // Create an element that can hold text
    let catTag = document.createElement("ul");
    catTag.setAttribute("class", "cat-tag");
    
    // catTag.setAttribute("style", "flex-direction: column")
    // let catHunger = document.createTextNode(`Hunger: ${newCat.hunger}\nName: ${newCat.name}`)
    let catHunger = document.createElement("li");
    catHunger.innerHTML = `Hunger: ${newCat.hunger}`;
    let catName = document.createElement("li");
    catName.innerHTML = `${newCat.name}`;
    let catThirst = document.createElement("li");
    catThirst.innerHTML = `Thirst: ${newCat.thirst}`;
    let catMood = document.createElement("li");
    catMood.innerHTML = `Mood: ${newCat.mood}`;

    // Attach the text to the element
    catTag.appendChild(catName);
    catTag.appendChild(catHunger);
    catTag.appendChild(catThirst);
    catTag.appendChild(catMood);

    // Randomise which cat color
    let random3 = 1 + Math.floor(Math.random()*3);
    
    // Set variables that cannot be set in CSS afterwards
    newCatSprite.setAttribute("src", `../Sprites/cat0${random3}Large.png`);
    console.log(random3)
    newCatSprite.setAttribute("style", `z-index: ${animalCount}`)
    newCatSprite.setAttribute("id", newCat.name)
    newCatSprite.setAttribute("class", "cat")

    // Attach the sprite to its container
    newCatContainer.appendChild(newCatSprite);

    //Finally, attach the stats tag to the cat container
    newCatContainer.appendChild(catTag)
}

// TO DO: Make clouds move across screen (left to right)

// Used animejs for convenient animations :)

let smallCloudMove = anime({
    targets: '#small-cloud',
    translateX: [-200, window.innerWidth],
    delay: 500,
    easing: 'linear',
    loop: true,
    duration: 40000
})

let cloudMove = anime({
    targets: '#big-cloud',
    translateX: [-400, window.innerWidth],
    delay: 500,
    easing: 'linear',
    loop: true,
    duration: 70000

})