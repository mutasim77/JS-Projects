import { Component } from '../core/component'

export class NavigationComponent extends Component {
    constructor(id) {
        super(id)

        this.tabs = []
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs
    }
}

function tabClickHandler(event) {
    event.preventDefault()
    if (event.target.classList.contains('tab')) {
        Array.from(this.$el.querySelectorAll('.tab')).forEach(tab => {
            tab.classList.remove('active')
        })
        event.target.classList.add('active')

        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name)
        this.tabs.forEach(t => t.component.hide())
        activeTab.component.show()
    }
}