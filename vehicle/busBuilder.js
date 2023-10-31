const VehicleBuilder = require("./vehicleBuilder")
const Bus = require("./busConcreteBuilder")

class BusBuilder extends VehicleBuilder {
    constructor() {
        super()
        this.reset()
    }
    reset() {
        this.bus = Bus()
    }

    setCapacity(capacity=20) {
        this.bus.capacity = capacity
    }

    setFuel(fuel = 20){
        this.bus.fuel = fuel
    }

    setPlate(plate=""){
        this.bus.plate = plate
    }
    setModel(model=""){
        this.bus.model = model
    }
    setMaintenances(maintenances){
        this.bus.maintenances = JSON.parse(JSON.stringify(maintenances))
    }

    setBusType(busType) {
        this.busType = busType
    }

    get getVehicle(){
        bus = this.bus
        this.reset()
        return bus
    }
}

module.exports = BusBuilder
