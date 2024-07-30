
// usefull functions

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
// @BuildMode (en réflexion de la gestion des évènements)
class EventManager{
    #ctx
    /**
     * 
     * @param {*} ctx EXPLICIT !
     * @see https://www.w3schools.com/jsref/event_onclick.asp
     */
    constructor(ctx){
        const e = [
            "click",
            "keypress"
        ]
        this.e = e
        this.#ctx=ctx
        // add event listener
        for (let i = 0; i < e.length; i++) {
            this.#ctx.addEventListener(
                e[i],
                function(eg){// eg=event genereated (by sys)
                    console.log(eg)
                }
            )            
        }
    }
    /**
     * permet d'afficher la liste des évènement des "...EventListener" dans la console
     * @param {*} event evenement système a ne pas renseigner ! 
     */
    getAllEvents(){
        (
            function () {
                console.log(this.type)
            }
        )();
    }

    /**
     * permet d'ajouter au système la détection les "events" de l'utilisateur 
     */
    addUserEventsArrow(){
        if()
    }


    addMovementDetection(){

    }



}
class Enemies{

}
class Weapon{

}
class Physics{

}

// outils pour la classe s7algos 

class Graph{
    add(){
        // a implémenter
    }
    // supprimer un sommet
    removeVertex(){

    }
    /**
     * croise les noeuds des deux graphes et renvoie une liste/graphe
     * dont les éléments sont en commun (appareissent dans les deux graphes)
     * @param {*} graph d'entrée
     */
    cross(graph){
        let res = new Graph()
        for (let i = 0; i < graph.vertecies; i++) {
            for (let j = 0; j < this.vertecies; j++) {
                if(this.vertecies[j]==graph.vertecies[i])
                    res.add(this.vertecies[i])
            }
        }
        return res
    }

    /**
     * renvoie si le graphe est vide
     */
    get isEmpty(){
        // a coder
    }

    // renvoie la liste des sommets du graphe
    get vertecies(){
        // a implémenter
    }


}


/**
 * superset for algorithm (dijkstra, quicksort, etc...)
 */
class S7Algos{
    /**
     * 
     * 
     * 
     * @see https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
     * @param {*} graph 
     * @param {*} source 
     */
    dijkstra(graph, source){
        let Q = new Graph()
        let info = []
        // parcours des vertexes du graphe
        for (let oneVertex = 0; oneVertex < graph.vertecies; oneVertex++) {
            info.push(
                {
                    dist: 100e100,
                    prev: undefined
                }
            )
            Q.add(oneVertex)
        }
        let u=Q.vertecies[0]
        while (!Q.isEmpty()){
            for(let v=0;v<Q.vertecies;v++){
                if (Q.vertecies[v]<u)
                    u=Q.vertecies[v]                
            }
            Q.removeVertex(u)
            for (let neighbor = 0; neighbor in u.cross(Q); neighbor++) {
                const alt = info[neighbor].dist + graph.edges(u, v)
                if(alt<info[neighbor].dist){
                    info[neighbor].dist = alt 
                    info[neighbor].prev = u
                }
                
            }
        }
        return info
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
        //@warning setIterval not optimized !!! must be replaced by modern method most usefull in this context !
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