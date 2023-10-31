class VehicleDirector {
    constructor() {
        this.builder = null
    }

    get builder() {
        return this.builder
    }

    set builder(builder) {
        this.builder = builder
    }

    makeVehicle(){
        this.builder.setCapacity()
        this.builder.setFuel()
        this.builder.setModel()
        this.builder.setPlate()
        this.builder.setMaintenances()
    }
}