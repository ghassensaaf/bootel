<template>
  <div class="home">
    <searchEngine />
  </div>
</template>

<script>
// @ is an alias to /src
import searchEngine from "../components/searchEngine.vue";
export default {
  name: "HomeView",
  components: {
    searchEngine,
  },
  data() {
    return {
      dates: ["2019-09-10", "2019-09-20"],
    };
  },
  computed: {
    startDate() {
      return this.dates[0];
    },
    endDate() {
      return this.dates[1];
    },
  },
};
</script>
