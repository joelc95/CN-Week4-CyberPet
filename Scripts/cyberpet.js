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

let catFavs = ["fish", "milk", "chicken"];

let spawnCatButton = document.getElementById("new-cat");

let animalCount = 0;





spawnCatButton.addEventListener("click", () => {
    animalCount++;

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
    
    // Set variables that cannot be set in CSS afterwards
    newCatSprite.setAttribute("src", "../Sprites/cat01Large.png");
    newCatSprite.setAttribute("style", `z-index: ${animalCount}`)
    newCatSprite.setAttribute("id", newCat.name)
    newCatSprite.setAttribute("class", "cat")

    // document.getElementById("top-ground").appendChild(newCatSprite);

    // Attach the sprite to its container
    newCatContainer.appendChild(newCatSprite);

    //Finally, attach the stats tag to the cat container
    newCatContainer.appendChild(catTag)
    
})


