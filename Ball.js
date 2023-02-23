
const INITIAL_VELOCITY = 0.025;
const INCREASE_VELO = 0.00001;

export default class Ball {
constructor(ballElem) {
    this.ballElem = ballElem

}

get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
}

set x (value) {
    this.ballElem.style.setProperty("--x", value)
}

get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
}

set y (value) {
    this.ballElem.style.setProperty("--y", value)
}

rect() {
return this.ballElem.getBoundingClientRec()
}

reset() {
    this.x = 50
    this.y = 50
    this.direction = {x: .75, y: .5 }
    while (Math.abs(this.direction.x) <= .2 
    || Math.abs(this.direction.x) >= .9)
    {
            const heading = randomNumberBetween(0, 2 * Math.PI)
            this.direction = { x: Math.cos(heading), y: Math.sin(heading)}

    }
this.velocity = INITIAL_VELOCITY;
}

update(delta) {
    this.x += this.direction.x * this.velocity * delta
    this.y +=  this.direction.y * this.velocity * delta
    const rect = this.rect()
    this.velocity += INCREASE_VELO * delta
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
        this.direction.y *= -1
    }
}

randomNumberBetween (min, max) {
    return Math.random() * (max-min) + min
}

}