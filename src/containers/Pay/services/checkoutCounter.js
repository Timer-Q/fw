import config from '@/config'
import axios from 'axios'

export default {
    cashier(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/cashier`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    listUserBank(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/quickBank/listUserBank`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    listBankCard(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/quickBank/listBankCard`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    sendSms(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/quickBank/sendSms`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    sendSmsByRecord(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/quickBank/sendSmsByRecord`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    confirm(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/quickBank/confirm`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    queryByAccountSn(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/accountInfo/queryByAccountSn`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    generateCode(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/scan/generateCode`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    confirmByRecord(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/quickBank/confirmByRecord`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    cyberBank(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/quickBank/cyberBank`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    accountPay(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-visit-web/visit/accountPay/pay`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}
