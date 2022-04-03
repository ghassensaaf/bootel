<template>
    <div></div>
</template>
<script>
import AvailabilityService from "../service/AvailabilityService.js";
export default {
  name: 'AvailabilityView',
  data() {
    return {
      searchQuery: {
        cityId: this.$route.query.cityId,
        checkin: this.$route.query.checkin,
        checkout: this.$route.query.checkout,
        pax: this.$route.query.pax,
      },
      hotels: [],
    };
  },
  computed: {},
  created() {
    console.log(process.env.API_KEY);
    this.initialize();
  },
  methods: {
    initialize() {
      this.hotels = this.getHotels();
    },
    getHotels() {
      AvailabilityService.getHoltelsAvailability(
        this.searchQuery.cityId,
        this.searchQuery.checkin,
        this.searchQuery.checkout,
        this.searchQuery.pax
      ).then((response) => {
        this.hotels = response.data;
      });
    },
  },
};
</script>
