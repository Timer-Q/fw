import config from '@/config'
import axios from 'axios'

export default {
    page(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/outer/error/page`
            axios.get(url, {params: data})
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    deal(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/outer/error/deal`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    info(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/outer/error/info`
            axios.get(url, {params: data})
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    detail(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/outer/error/detail`
            axios.get(url, {params: data})
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    export(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/outer/error/export`
            axios.get(url, {params: data})
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    listOneLevelChannelInfo(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/channelInfo/listOneLevelChannelInfo`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    listTwoLevelChannelInfoByParentSn(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/channelInfo/listTwoLevelChannelInfoByParentSn`
            axios.get(url, {params: data})
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}
