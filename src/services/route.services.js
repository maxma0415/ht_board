// import axios from "axios";
const repo = "https://edelman-predictive-intelligence-centre.github.io/DFAT-vue-dev/"
let localSpotsRoutes = `${repo}data/spots_routes.json`
//let localSpotsRoutes = '/data/spots_routes.json'
let localMapCoordinates = `${repo}data/countries.json`
// let localMapCoordinates = '/data/countries.json'
//const localSpotsRoutes = "https://raw.githubusercontent.com/edelman-predictive-intelligence-centre/STT/master/STT%20Database/output/spots_routes.json?token=ALXIEDGYLBLOZCVHKZOCITS6MZPM4"
//"https://raw.githubusercontent.com/edelman-predictive-intelligence-centre/STT/master/STT%20Database/output/spots_routes.json?token=ALXIEDC32MWYNHYQNPU3ZSK6K6VXE"
//const localMapCoordinates = 'https://raw.githubusercontent.com/edelman-predictive-intelligence-centre/DFAT/master/data/countries.json?token=ALXIEDG5OT2B36R5ODIK5XS6MZO6G'
const routeServices = {

    async fetchRequestResults(url) {
        let response = await fetch(url)
        let responseJson = await response.json()
        return responseJson
    },

    /**
     * Use Promise.all to call multiple requests and fetch results
     */
    async fetchMultipleRequestResults(urls) {
        // let requests = urls.map(url => {getResponse(url)})
        let responses = await Promise.all(
            urls.map(url => this.fetchRequestResults(url))
        )
        return responses
    },

    async getLocalSpotsRoutes() {
        let data = await this.fetchRequestResults(localSpotsRoutes);
        return data;
    },

    async getLocalMapCoordinates() {
        let data = await this.fetchRequestResults(localMapCoordinates);
        return data;
    },

    async getRoutesAndCoordinates() {
        let urls = [
            localSpotsRoutes,
            localMapCoordinates
        ]
        let data = await this.fetchMultipleRequestResults(urls);
        return data
    }

}

export default routeServices
    // localSpotsRoutes
;