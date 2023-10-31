class MicroserviceDirector {
    constructor() {
        this._builder = null
    }

    get builder() {
        return this._builder
    }

    set builder(builder) {
        this._builder = builder
    }

    makeMicroservice(rule="rule", schedules="schedules", routes="routes") {
        this._builder.configRules(rule)
        this._builder.configSchedules(schedules)
        this._builder.configRoutes(routes)

    }

}