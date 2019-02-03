export class DateHelper {

    constructor() {
        throw new Error("Não é permitido instanciação dessa classe")
    }

    static textToDate(str) {
        if (!/\d{4}-\d{2}-\d{2}/.test(str))
            throw new Error("O formato de data passado deve ser aaaa-mm-dd")

        return new Date(...str.split('-').map((value, index) => value - index % 2));
    }

    static formatDate(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }
}