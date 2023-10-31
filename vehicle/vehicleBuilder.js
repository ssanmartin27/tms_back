class VehicleBuilder {
    constructor() {
        if (this.constructor == VehicleBuilder) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    reset() {
        throw new Error("Method must be implemented.");
    }

    setCapacity() {
        throw new Error("Method must be implemented.");
    }

    setFuel(){
        throw new Error("Method must be implemented.");
    }

    setPlate(){
        throw new Error("Method must be implemented.");
    }
    setModel(){
        throw new Error("Method must be implemented.");
    }
    setMaintenances(){
        throw new Error("Method must be implemented.");
    }

}

module.exports = VehicleBuilder