class RouteMemento {
    constructor(routeId, name, description, distance, stations) {
        this.routeId = routeId
        this.name = name
        this.description = description
        this.distance = distance
        this.stations = [...stations]
    }

    getState() {
        return `Ruta: ${this.routeId}, Nombre: ${this.name}, Longitud: ${this.distance}, Descripción: ${this.description}, Estaciones: ${this.stations}`
    }
}

module.exports = RouteMemento

