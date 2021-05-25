<template>
  <div class="scroll-container">
  
    <vue-recyclist
      class="list"
      :list="list"
      :items="movieList"
      :size="size"
      :loadmore="loadmore"
      :tombstone="tombstone"
      :spinner="true"
      :nomore="eod"
    >
      <template slot="tombstone">
        <div class="h-100 w-screen pb-4" >
          <div class="">
            <div class="movie-item bg-clip-padding bg-gray-100 border-1 border-gray-200 border-solid grid grid-cols-2 gap-4">
              <div class="img h-50 w-full bg-gray-300 mb-2">
              </div>
              <div class="pt-4 pb-4">
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="item" scope="props">
        <div :id="props.data.id" class="w-screen pb-4">
          <div class="">
            <div class="movie-item bg-clip-padding bg-gray-100 border-1 border-gray-200 border-solid grid grid-cols-2 gap-4">
              <div class="img w-full">
                <img
                  class="object-contain h-20 w-full"
                  :src="props.data.image"
                />
              </div>
              <div class="pt-4 pb-4">
                <div class="font-bold text-xl">{{ props.data.title }} ({{ props.data.year }})</div>
                <div class="">Rating {{ props.data.imDbRating }}</div>
                <div class="italic">{{ props.data.crew }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div slot="spinner">Loading Data</div>
      <div slot="nomore">End of records</div>
    </vue-recyclist>
  </div>
</template>

<script>
// import axios from "axios";
import Data from "./data";
import VueRecyclist from "vue-recyclist";
export default {
  name: "Home",
  data() {
    return {
      list: [],
      size: 20,
      page: 1,
      eod: false,
      movieList: [],
      tombstone: true,
    };
  },
  components: {
    "vue-recyclist": VueRecyclist,
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
    },
    loadmore() {
      setTimeout(() => {
        if (this.eod == false) {
          this.list = this.movieList.slice(0, this.size * this.page);
          if (this.size * this.page > this.movieList.length) {
            this.eod = true;
          } else if (this.size * (this.page + 1) > this.movieList.length) {
            this.tombstone = false;
            this.eod = true;
          }

          this.page++;
        }
        console.log(this.list.length);
      }, 1000);
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>
