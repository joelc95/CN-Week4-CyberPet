// Animal blueprint
class Animal {
    constructor(name) {
        this._name = name;
        this._hunger = 50;
        this._thirst = 50;
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
    get element() {
        return this._element;
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

// Trying to use local DL files for animejs...
// These don't work, idk why
// import anime from 'animejs/lib/anime.es';
// import anime from '../node_modules/animejs/lib/anime.es';
// import { default as anime } from '../node_modules/animejs/lib/anime.es.js';
// Only solution so far is to link externally which means GitHub preview
// blocks it ;_;

// Cat likes

// We can keep our cat Objects here
let cats = [];

// Cat img elements
let catElements = [];

// unused
let catFavs = ["fish", "milk", "chicken"];

// Get reference to cat spawner button
let spawnCatButton = document.getElementById("new-cat");

// Keep our sprite "pairs" together
let sprites = [['../Sprites/cat01Large.png', '../Sprites/cat01MADLarge.png'],
                ['../Sprites/cat02Large.png', '../Sprites/cat02MADLarge.png'],
                ['../Sprites/cat03Large.png', '../Sprites/cat03MADLarge.png']]

// Keep track of animals created
let animalCount = 0;

// Add event on click of Cat spawner button
spawnCatButton.addEventListener("click", () => {
    animalCount++;
    if (animalCount>15) {
        alert("That's enough!");
        return 1;
    }
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
    if (!newCat) {
        // if no name given, do nothing and exit function
        return 1;
    }
    for(let i=0; i<cats.length; i++) {
        if (newCat == cats[i].name){
            alert("This name is taken!");
            return 2;
        }
    }
    newCat = new Cat(newCat);
    // console.log(newCat);

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
    catTag.setAttribute("id", `${newCat.name}-tag`)

    
    // catTag.setAttribute("style", "flex-direction: column")
    // let catHunger = document.createTextNode(`Hunger: ${newCat.hunger}\nName: ${newCat.name}`)
    let catHunger = document.createElement("li");
    catHunger.setAttribute("id", `${newCat.name}-hunger-tag`);
    catHunger.innerHTML = `Hunger: ${newCat.hunger}`;
    let catName = document.createElement("li");
    catName.innerHTML = `${newCat.name}`;
    let catThirst = document.createElement("li");
    catThirst.setAttribute("id", `${newCat.name}-thirst-tag`);
    catThirst.innerHTML = `Thirst: ${newCat.thirst}`;
    let catMood = document.createElement("li");
    catMood.setAttribute("id", `${newCat.name}-mood-tag`);
    catMood.innerHTML = `Mood: ${newCat.mood}`;

    // Attach the text to the element
    catTag.appendChild(catName);
    catTag.appendChild(catHunger);
    catTag.appendChild(catThirst);
    catTag.appendChild(catMood);

    // Randomise which cat color
    let random3 = Math.floor(Math.random()*3);
    
    // Set variables that cannot be set in CSS afterwards
    newCatSprite.setAttribute("src", sprites[random3][0]);
    console.log(random3)
    newCatSprite.setAttribute("style", `z-index: ${animalCount}`)
    newCatSprite.setAttribute("id", newCat.name)
    // newCatSprite.setAttribute("class", "cat")
    newCatSprite.className = "cat";
    newCatSprite.setAttribute("value", 0)

    // Attach the sprite to its container
    newCatContainer.appendChild(newCatSprite);

    //Finally, attach the stats tag to the cat container
    newCatContainer.appendChild(catTag)
    // Also need to add our new Cat Object to a CATalogue HA HA
    cats.push(newCat);

    catElements.push([newCatSprite, random3]);
    console.log(catElements);
    console.log(sprites)
}
// let catSprite;
// This checks hunger and thirst levels
// and updates mood accordingly
function moodCheck() {
    for (let i=0; i<cats.length; i++) {
        let moodTag = document.getElementById(`${cats[i].name}-mood-tag`);
        let catSprite = document.getElementById(`${cats[i].name}`);
        // Change mood on either max value
        // This should change both the value inside the object...
        // ...AND the text displayed in the Cat Tag HTML element
        if (cats[i]._hunger==100 || cats[i]._thirst==100) {
            cats[i]._mood = 'Not Good!!';
            moodTag.innerHTML = 'Mood: Not Good!!';
            catSprite.setAttribute('value', 1);
        } else {
            cats[i]._mood = 'OK!';
            moodTag.innerHTML = 'Mood: OK!';
            catSprite.setAttribute('value', 0);
        }

        
        // Change text in tag
        let hungerTag = document.getElementById(`${cats[i].name}-hunger-tag`);
        let thirstTag = document.getElementById(`${cats[i].name}-thirst-tag`);
        hungerTag.innerHTML = `Hunger: ${cats[i]._hunger}`;
        thirstTag.innerHTML = `Thirst: ${cats[i]._thirst}`;
    }
}

// If the mood is "Not Good!!", change to angry sprite
// else neutral sprite
function setSprite() {
    for (let i=0; i<catElements.length; i++) {
        if(catElements[i][0].getAttribute('value') == 0) {
            catElements[i][0].setAttribute("src", sprites[catElements[i][1]][0]);
        } else if (catElements[i][0].getAttribute('value') == 1) {
            catElements[i][0].setAttribute("src", sprites[catElements[i][1]][1]);
        }
    }
}

// Checks mood and sprite every half a second
setInterval(()=>{
    moodCheck();
    setSprite();
}, 500);


// TO DO: have Cat Stats change over time ****DONE :)*****

// This ticks up hunger and thirst meters
function increaseNeeds() {
    
    for(let i=0; i<cats.length; i++) {
        // Lock max and min hunger
        if (cats[i]._hunger == 100) {
            cats[i]._hunger=100;

        } else if (cats[i]._hunger<0) {
            cats[i]._hunger=0;

        } else {
            cats[i]._hunger+=1;
        }

        //Lock max and min thirst
        if (cats[i]._thirst == 100) {
            cats[i]._thirst=100;

        } else if (cats[i]._thirst<0) {
            cats[i]._thirst=0;

        } else {
            cats[i]._thirst+=1;
        }

    }
}
// Here we can adjust how quickly they tick
setInterval(()=>{
    increaseNeeds();
}, 1000)





// TO DO: Make clouds move across screen (left to right) *****DONE :)*****

// Used animejs for convenient animations
// REMOVED: GitHub preview does not like external sources!
// All animations now made using CSS keyframes!

// let smallCloudMove = anime({
//     targets: '#small-cloud',
//     translateX: [-200, window.innerWidth],
//     delay: 500,
//     easing: 'linear',
//     loop: true,
//     duration: 40000
// })

// let cloudMove = anime({
//     targets: '#big-cloud',
//     translateX: [-400, window.innerWidth],
//     delay: 500,
//     easing: 'linear',
//     loop: true,
//     duration: 70000
// })

// TO DO: Have feed buttons decrease Cat Hunger Stat

let giveFishButton = document.getElementById("give-fish");

giveFishButton.addEventListener("click", () => {
    cats.forEach(kitty => {
        kitty._hunger-=25;
    })
})
// TO DO: ditto for thirst

let giveMilkButton = document.getElementById("give-milk");

giveMilkButton.addEventListener("click", () => {
    cats.forEach(kitty => {
        kitty._thirst-=25;
    })
})