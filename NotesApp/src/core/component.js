export class Component {
    constructor(id) {
        this.$el = document.getElementById(id)
        this.init()
    }

    init() { }

    onShow() { }

    onHide() { }

    hide() {
        this.$el.classList.add('hide')
        this.onHide()
    }

    show() {
        this.$el.classList.remove('hide')
        this.onShow()
    }
}