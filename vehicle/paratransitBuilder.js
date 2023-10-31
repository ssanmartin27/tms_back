const VehicleBuilder = require("./vehicleBuilder")
const Paratransit = require("./paratransitConcreteBuilder")

class ParatransitBuilder extends VehicleBuilder {
    constructor() {
        super()
        this.reset()
    }
    reset() {
        this.paratransit = new Paratransit()
    }

    setCapacity(capacity=20) {
        this.paratransit.capacity = capacity
    }

    setFuel(fuel = 20){
        this.paratransit.fuel = fuel
    }

    setPlate(plate=""){
        this.paratransit.plate = plate
    }
    setModel(model=""){
        this.paratransit.model = model
    }
    setMaintenances(maintenances){
        this.paratransit.maintenances = JSON.parse(JSON.stringify(maintenances))
    }

    setServiceArea(serviceArea) {
        this.serviceArea = serviceArea
    }

    get getVehicle(){
        paratransit = this.paratransit
        this.reset()
        return paratransit
    }
}

module.exports = ParatransitBuilder
