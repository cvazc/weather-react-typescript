import axios from "axios"
import { SearchType } from "../types"

export default function useWeather() {
    const fetchWeather = async (search: SearchType) => {
        const appId = '2aabc7e3bd6ef9d82f174f9d0a53d1c6'
        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const {data} = await axios(geoURL)

        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather,
    }
}