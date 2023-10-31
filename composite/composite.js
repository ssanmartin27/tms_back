const Component = require("./component")

class Composite extends Component {
    constructor () {
        this.children = []
    }

    add(component) {
        this.children.push(component)
    }

    remove(component) {
        this.children = this.children.filter(el => el !== component)
    }

    listComponents() {
        for (const child of this.children) {
            child.listComponents()
        }
    }

    operation(){

    }

    update(newData) {
        for (const child of this.children) {
            child.update(newData)
        }
    }

    getChild() {}

}

module.exports = Composite 