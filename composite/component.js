class Component {
    constructor() {
        throw new Error("Abstract classes can't be instantiated.");
    }

    listComponents() {
        throw new Error("Method must be implemented.");
    }

    operation() {
        throw new Error("Method must be implemented.");
    }
}

module.exports = Component