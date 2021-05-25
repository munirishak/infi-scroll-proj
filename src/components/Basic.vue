<template>
  <div class="scroll-basic-container" id="scrollContainer">
    <div id="contentContainer" class="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div
        v-for="item in list"
        :key="item.id"
        class="list bg-gray-100"
      >
        <div
          class="movie-item h-full bg-clip-padding border-1 border-gray-200 border-solid grid grid-cols-2 md:grid-cols-1 gap-4"
        >
          <div class="img w-full">
            <img class="object-contain h-20 w-full" :src="item.image" />
          </div>
          <div class="p-4">
            <div class="font-bold text-xl">
              {{ item.title }} ({{ item.year }})
            </div>
            <div class="">Rating {{ item.imDbRating }}</div>
            <div class="italic">{{ item.crew }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import Data from "./data";
export default {
  name: "Basic",
  data() {
    return {
      list: [],
      size: 30,
      page: 1,
      eod: false,
      movieList: [],
    };
  },
  watch: {},
  methods: {
    getMovies() {
      // not using api since its got limit 100 api call per day

      // const options = {
      //   method: "GET",
      //   url: "https://imdb-api.com/en/API/Top250Movies/k_he7m856b"
      // };

      // let _this = this;

      // axios
      //   .request(options)
      //   .then(function (response) {
      //     _this.movieList = response.data.items;
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });

      this.movieList = Data.items;
      this.list = this.movieList.slice(0, this.size * this.page);
    },
    scroll() {
      let scrollContainer = document.getElementById("scrollContainer");
      let contentContainer = document.getElementById("contentContainer");
      scrollContainer.onscroll = () => {
        if ((scrollContainer.scrollTop+scrollContainer.offsetHeight) >= contentContainer.offsetHeight - 100) {
          this.loadmore();
        }
      };
    },
    loadmore() {
      if (this.eod == false) {
        this.page++;
        this.list = this.movieList.slice(0, this.size * this.page);
        if (this.size * this.page > this.movieList.length) {
          this.eod = true;
        }
        console.log(this.list.length)
      }
    },
  },
  beforeMount() {
    this.getMovies();
  },
  mounted() {
    this.scroll();
  },
};
</script>
