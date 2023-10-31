const routeMemento = require("../memento/routeMemento")
const routeHistory = require("../memento/routeHistory")

class Route {
    constructor() {
        this.routeId = ""
        this.distance = 0
        this.name = ""
        this.description = ""
        this.stations = []
        this.history = routeHistory()
    }

    setRouteId(routeId){
        this.routeId = routeId
    }

    setDistance(distance) {
        this.distance = distance
    }

    setName(name) {
        this.name = name
    }

    setDescription(description) {
        this.description = description
    }

    setStation(station) {
        this.stations.push(station)
    }

    save() {
        memento = RouteMemento(this.routeId, this.name, this.description, this.distance, this.stations)
    }

    getState() {
        return `Ruta: ${this.routeId}, Nombre: ${this.name}, Descripción: ${this.description}, Distancia: ${this.distance}, Estaciones: ${this.stations}`
    }
}

module.exports = Route