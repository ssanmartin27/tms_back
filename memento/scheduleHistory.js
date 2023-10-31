class scheduleHistory {
    constructor(){
        this.history = []
    }

    addMemento(memento) {
        this.history.push(memento)
    }

    undo() {
        if (this.history)
            return this.history.pop()
        else
            return null
    }

}

module.exports = scheduleHistory