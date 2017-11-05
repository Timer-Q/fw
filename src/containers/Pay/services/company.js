import config from '@/config'
import axios from 'axios'

export default {
    multipleOrgTreeQuery(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/likeQueryOrgTree`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    listCompanyOpenAccountInfoByPage(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/listCompanyOpenAccountInfoByPage`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    updateStatus(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/updateStatus`
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
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/export`
            axios.get(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    listTwoLevelChannelInfo(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/channelInfo/listTwoLevelChannelInfo`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    queryCompanyChannel(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyChannel/queryCompanyChannel`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    updateCompanyChannel(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyChannel/updateCompanyChannel`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    queryCompanyOpenAccountInfoById(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/queryCompanyOpenAccountInfoById`
            axios.get(url, {params: data})
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    updateCompanyOpenAccountInfo(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/updateCompanyOpenAccountInfo`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    likeQueryOrgTree(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/likeQueryOrgTree`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    uploadFile(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/uploadFile`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    addCompanyOpenAccountInfo(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/addCompanyOpenAccountInfo`
            axios.post(url, data)
                .then(function (data) {
                    resolve(data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
    queryOrganizationById(data) {
        return new Promise(function (resolve, reject) {
            const url = `${config.server.http}${config.server.host}/pay-admin-web/companyOpenAccountInfo/queryOrganizationById`
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
