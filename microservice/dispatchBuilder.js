const MicroserviceBuilder = require("./microserviceBuilder")
const Dispatch = require("./dispatchConcreteBuilder")

class DispatchBuilder extends MicroserviceBuilder { 
    
    constructor() {
        super()
        this.reset()}
    
    reset() {
        this.dispatch = Dispatch([],[],[])
    }

    configRules(rule='Rule') {
        if (!this.dispatch) {
            this.reset() }
        this.dispatch.addRule(rule) 
    }

    configSchedules(schedule='Schedules') {
        if (!this.dispatch) {
            this.reset() }
        this.dispatch.addSchedule(schedule)
    }

    configRoutes(route='routes') {
        if (!this.dispatch)
            this.reset()
        this.dispatch.addRoutes(route)
    }

    getMicroservice() {
        dispatch = this.dispatch
        this.reset()
        return dispatch 
    }
}

module.exports = DispatchBuilder
