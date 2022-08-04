export class Validators {
    static required(value = '') {
        return value && value.trim()
    }

    static minLength(length) {
        return value => {
            return value.length >= length
        }
    }
}