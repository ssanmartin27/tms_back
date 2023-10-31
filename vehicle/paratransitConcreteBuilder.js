class Paratransit {
    constructor(){
        this.capacity= 0
        this.fuel = 0
        this.plate = ""
        this.model = ""
        this.maintenances = []
        this.serviceArea = ""

    }

    listComponents() {
        print(`Los componentes del Paratránsito: Capacidad: ${this.capacity}, Fuel: ${this.fuel}, Plate: ${this.plate}, Model: ${this.model}, Maintenances: ${this.maintenances}, Service Area: ${this.serviceArea}`)
    }
}

module.exports = Paratransit