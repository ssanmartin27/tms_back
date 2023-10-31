class Bus {
    constructor(){
        this.capacity= 0
        this.fuel = 0
        this.plate = ""
        this.model = ""
        this.maintenances = []
        this.busType = ""

    }

    listComponents() {
        print(`Los componentes del Bus: Capacidad: ${this.capacity}, Fuel: ${this.fuel}, Plate: ${this.plate}, Model: ${this.model}, Maintenances: ${this.maintenances}, Tipo de Bus: ${this.busType}`)
    }
}

module.exports = Bus