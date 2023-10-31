const VehicleBuilder = require("./vehicleBuilder")
const Rail = require("./railConcreteBuilder")

class RailBuilder extends VehicleBuilder {
    constructor() {
        this.reset()
    }
    reset() {
        this.rail = Rail()
    }

    setCapacity(capacity=20) {
        this.rail.capacity = capacity
    }

    setFuel(fuel = 20){
        this.rail.fuel = fuel
    }

    setPlate(plate=""){
        this.rail.plate = plate
    }
    setModel(model=""){
        this.rail.model = model
    }
    setMaintenances(maintenances){
        this.rail.maintenances = JSON.parse(JSON.stringify(maintenances))
    }

    setCarriages(carriages) {
        this.carriages = carriages
    }

    get getVehicle(){
        rail = this.rail
        this.reset()
        return rail
    }
}

module.exports = RailBuilder
