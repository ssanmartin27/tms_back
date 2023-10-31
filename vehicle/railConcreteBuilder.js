class Rail {
    constructor(){
        this.capacity= 0
        this.fuel = 0
        this.plate = ""
        this.model = ""
        this.maintenances = []
        this.carriages = 1

    }

    listComponents() {
        print(`Los componentes del tren: Capacidad: ${this.capacity}, Fuel: ${this.fuel}, Plate: ${this.plate}, Model: ${this.model}, Maintenances: ${this.maintenances}, Carriages: ${this.carriages}`)
    }
}

module.exports = Rail