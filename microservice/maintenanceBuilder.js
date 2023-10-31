const MicroserviceBuilder = require("./microserviceBuilder")
const Maintenance = require("./maintenanceConcreteBuilder")

class MaintenanceBuilder extends MicroserviceBuilder { 
    
    constructor() {this.reset()}
    
    reset() {
        this.maintenance = Maintenance()
    }

    configRules(rule='Rule') {
        this.maintenance.addRule(rule) 
    }

    configSchedules(schedule='Schedules') {
        this.maintenance.addSchedule(schedule)
    }

    configRoutes(route='routes') {
        this.maintenance.addRoutes(route)
    }

    getMicroservice() {
        maintenance = this.maintenance
        this.reset()
        return maintenance 
    }
}

module.exports = MaintenanceBuilder