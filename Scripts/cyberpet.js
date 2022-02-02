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
    let catName = prompt("enter name: ")
    catName = new Cat(catName);
    console.log(catName);
    let newCat = document.createElement("img");
    newCat.setAttribute("src", "../Sprites/cat01Large.png");
    newCat.setAttribute("z-index", `-${animalCount}`)
    newCat.setAttribute("height", "100")
    newCat.setAttribute("style", "align-self: flex-end")
    newCat.setAttribute("id", catName.name)
    document.getElementById("top-ground").appendChild(newCat);
    
})
