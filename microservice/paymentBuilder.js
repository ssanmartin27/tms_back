const MicroserviceBuilder = require("./microserviceBuilder")
const Payment = require("./paymentConcreteBuilder")

class PaymentBuilder extends MicroserviceBuilder { 
    
    constructor() {
        super()
        this.reset()}
    
    reset() {
        this.payment = new Payment([],[],[])
    }

    configRules(rule='Rule') {
        this.payment.addRule(rule) 
    }

    configSchedules(schedule='Schedules') {
        this.payment.addSchedule(schedule)
    }

    configRoutes(route='routes') {
        this.payment.addRoutes(route)
    }

    getMicroservice() {
        payment = this.payment
        this.reset()
        return payment 
    }
}

module.exports = PaymentBuilder
