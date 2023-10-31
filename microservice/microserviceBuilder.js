class MicroserviceBuilder {
    // Abstract class
    constructor(){
        if (this.constructor == MicroserviceBuilder) {
            throw new Error("Abstract classes can't be instantiated.");
          }  
    }

    reset(){
        throw new Error("Method must be implemented.");
    }

    configRules(){
        throw new Error("Method must be implemented.");
    }

    configSchedules(){
        throw new Error("Method must be implemented.");
    }

    configRoutes(){
        throw new Error("Method must be implemented.");
    }

}

module.exports = MicroserviceBuilder