const MicroserviceBuilder = require("./microserviceBuilder")
const Schedule = require("./scheduleConcreteBuilder")
const Route = require("./route")

class ScheduleBuilder extends MicroserviceBuilder { 
    
    constructor() {this.reset()}
    
    reset() {
        this.schedule = Schedule()
    }

    configRules(rule='Rule') {
        this.schedule.addRules(rule) 
    }

    configSchedules(schedule='Schedules') {
        this.schedule.addSchedules(schedule)
    }

    configRoutes(route='routes') {
        this.schedule.addRoutes(route)
    }

    get getMicroservice() {
        schedule = this.schedule
        this.reset()
        return schedule 
    }
}

module.exports = ScheduleBuilder