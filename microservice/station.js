class Station {
    
    constructor(stationId, name, capacity, latitude, longitude, state='Abierto'){
        this.stationId = stationId
        this.name = name
        this.capacity = capacity
        this.latitude = latitude
        this.longitude = longitude
        this.state = state
    }
    
    setState(state){
        this.state = state
    }

    setId(stationId){
        this.stationId = stationId
    }
    
    setLatitude(latitude){
        this.latitude = latitude
    }

    setLongitude(longitude){
        this.longitude = longitude
    }

    setName(name){
        this.name = name
    }
    
    setCapacity(capacity){
        this.capacity = capacity
    }
    
    getStation (station) {
        for (const i of station) { 
            print(i)
        }
    }
    
    toString(){
        return `ID: ${this.stationId}, Latitude: ${this.latitude}, Longitude: ${this.longitude}, Name: ${this.name}, Capacity: ${this.capacity}, State: ${this.state}`
    }
}

module.exports = Station