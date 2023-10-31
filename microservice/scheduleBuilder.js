const MicroserviceBuilder = require("./microserviceBuilder")
const Schedule = require("./scheduleConcreteBuilder")
const Route = require("./route")

class ScheduleBuilder extends MicroserviceBuilder { 
    
    constructor() {
        super()
        this.reset()}
    
    reset() {
        this.schedule = new Schedule()
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
