class Payment {
    constructor(rules = [], schedules = [], routes = []) {
        this.rules = rules
        this.schedules = schedules
        this.routes = routes
    }

    addRule(rule) {
        this.rules.push(rule)
    }

    addSchedule(schedule) {
        this.schedules.push(schedule)
    }

    addRoute(route) {
        this.routes.push(route)
    }

    listParts() {
        print (`Microservicio (Payment) con reglas: ${this.rules}, horarios: ${this.schedules}, rutas: ${this.routes}`)
    }

    toString() {
        return `Microservicio (Payment) con reglas: ${this.rules}, horarios: ${this.schedules}, rutas: ${this.routes}`
    }
}

module.exports = Payment