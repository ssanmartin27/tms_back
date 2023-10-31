const schedule = require("../models/schedule");

class scheduleMemento {
    constructor(scheduleId, route, departureTimes) {
        this.scheduleId = scheduleId
        this.route = route
        this.departureTimes = [...departureTimes]
    }

    getState(){
        return `Horario: ${this.scheduleId}, Ruta: ${this.route.getState()}, Tiempos de Salida: ${this.departureTimes}`

    }
}

module.exports = scheduleMemento