const Component = require("./component")

class Leaf extends Component {
    constructor(vehicle) {
        super()
        this.vehicle = vehicle
    }

    listComponents() {
        this.vehicle.listComponents()
    }

    update(value){
        this.vehicle = value
    }

    operation() {
        print(" ")
    }
}

module.exports = Leaf
