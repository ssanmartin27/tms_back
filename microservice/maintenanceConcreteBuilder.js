class Maintenance {
    constructor() {
        this.rules = []
        this.schedules = []
        this.routes = []
    }

    addRule(rule) {
        this.rules.push(rule)
    }

    addSchedule(schedule) {
        this.schedules.push(schedule)
    }

    addRoutes(route) {
        this.routes.push(route)
    }

    listParts() {
        print (`Microservicio con reglas: ${this.rules}, horarios: ${this.schedules}, rutas: ${this.routes}`)
    }

    toString() {
        return `Microservicio con reglas: ${this.rules}, horarios: ${this.schedules}, rutas: ${this.routes}`
    }
}

module.exports = Maintenance