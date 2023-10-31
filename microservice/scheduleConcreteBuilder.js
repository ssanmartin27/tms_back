const ScheduleHistory = require("../memento/scheduleHistory")
const ScheduleMemento = require("../memento/scheduleMemento")
const Route = require("./route")

class Schedule {
    constructor(){
        this.scheduleId = ""
        this.rules = []
        this.route = []
        this.departureTimes = []
        this.history = ScheduleHistory()
    }

    addRules(rule) {
        this.rules.push(rule)
    }

    addRoutes(route) {
        this.route.push(route)
    }

    addSchedules(schedule) {
        this.departureTimes.push(schedule)
    }

    setId(scheduleId) {
        this.scheduleId = scheduleId
    }

    save(){
        memento = ScheduleMemento(this.scheduleId, this.route[-1], this.departureTimes) 
        this.history.addMemento(memento) 
    }

    restore(memento) {
        this.scheduleId = memento.scheduleId
        this.route = memento.route
        this.departureTimes = [...memento.departureTimes]
    }
}

module.exports = Schedule