import axios from "axios";
const AVAILABILITY_BASE_API_URL = "https://api.voyages2000.com.tn/hotels/availability"
class AvailabilityService {
    async getHoltelsAvailability(cityId, checkIn, checkOut, pax) {
        return axios.get(AVAILABILITY_BASE_API_URL,{
            params:{
                cityId : cityId,
                checkIn : checkIn,
                checkOut : checkOut,
                pax : pax,
            }
        })
    }
}
export default new AvailabilityService()