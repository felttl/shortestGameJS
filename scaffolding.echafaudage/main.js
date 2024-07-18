

function randi(min, max) {
    const floatRandom = Math.random()
    const difference = max - min
    // random between 0 and the difference
    return Math.round(difference * floatRandom) + min
}

/**
 * create a new user object
 * @param {x} x coordinates hirizontally
 * @param {y} y coordinates vertically
 * @param {he} set the current heading of the caracter (in degree)
 * @param {ctx} is the context of the "scene"
 * 
*/ 	
class User{
    #x
    #y
    #he=0
    #ctx
    #repr

    constructor(x,y,he,ctx){
        this.#x = x
        this.#y = y
        this.#he = he
        this.#ctx = ctx
        this.#repr = {
            color: "skyblue",
            x: ()=>this.#x,
            y: ()=>this.#y,
            w: 15,
            h: 10,
            he: ()=>(this.#he * Math.PI) / 180
        }
    }

    move(canvasW, canvasH){
        const tmpx = randi(-10,10)
        const tmpy = randi(-10,10)
        if(this.#x+tmpx > 0 && this.#x+tmpx < this.#repr.w)
            this.#x+=tmpx
        if(this.#y+tmpy > 0 && this.#y+tmpy < this.#repr.h)
            this.#y+=tmpy
    }

    render(w,h){
        this.#clear(w, h)
        this.#ctx.fillStyle = this.#repr.color
        this.#ctx.fillRect(
            this.#repr.x(),
            this.#repr.y(),
            this.#repr.w,
            this.#repr.h
        )
          this.#ctx.rotate(this.#repr.he())
    }
    #clear(w,h){
        this.#ctx.rotate(-this.#repr.he())
        this.#ctx.clearRect(0,0,w,h)
    }

}
class Run{
    #items = []
    #speed = 500
    #surface
    constructor(canvas){
        this.#surface = canvas
    }
    addItem(newItem){
        this.#items.push(newItem)
    }
    addGroupItems(group){
        this.#items.push(...group)
    }	
    renderer(){
        // private variables not allowed here
        const localConst = {
            items: this.#items,
            speed: this.#speed,
            surface: this.#surface
        }
        setInterval(function render() {
            // must implement render on each elems
            for (let i=0;i<localConst.items.length;i++){
                localConst.items[i].render(
                    localConst.surface.width,
                    localConst.surface.height
                )
                localConst.items[i].move(
                    localConst.surface.clientWidth,
                    localConst.surface.clientHeight
                )
            }
        }, localConst.speed);
    }


}



// end page