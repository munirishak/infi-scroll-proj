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
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 tombstone">
          <div
            class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
          >
            <div
              class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
            >
              <div class="img h-50 w-full bg-gray-300 mb-2"></div>
              <div class="p-4 h-full">
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>
          <div
            class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
          >
            <div
              class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
            >
              <div class="img h-50 w-full bg-gray-300 mb-2"></div>
              <div class="p-4 h-full">
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>
          <div
            class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
          >
            <div
              class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
            >
              <div class="img h-50 w-full bg-gray-300 mb-2"></div>
              <div class="p-4 h-full">
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>
          <div
            class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
          >
            <div
              class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
            >
              <div class="img h-50 w-full bg-gray-300 mb-2"></div>
              <div class="p-4 h-full">
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>
          <div
            class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
          >
            <div
              class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
            >
              <div class="img h-50 w-full bg-gray-300 mb-2"></div>
              <div class="p-4 h-full">
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>
          <div
            class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
          >
            <div
              class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
            >
              <div class="img h-50 w-full bg-gray-300 mb-2"></div>
              <div class="p-4 h-full">
                <div class="h-5 bg-gray-300 mb-2"></div>
                <div class="h-5 bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="item" scope="props">
        <div v-if="props.data.mv != undefined" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
          <div
            v-for="item in props.data.mv"
            :key="item.id"
            class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
          >
            <div
              class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
            >
              <div class="img h-full img-max-height overflow-hidden relative">
                <img class="object-fit" :src="item.image" />
                <div class="absolute top-0 left-0 p-3 bg-clip-padding bg-yellow-500 font-extrabold rounded-br-lg text-white">{{ item.imDbRating }}</div>
              </div>
              <div class="p-4 h-full">
                <div class="font-bold text-xl">
                  {{ item.title }} ({{ item.year }})
                </div>
                <div class="italic overflow-ellipsis">{{ item.crew }}</div>
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
      tombstoneDummy: ["","","","","",""]
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

      for(var i=0;i<Data.items.length;i= i+6){
        var data = {
          mv: []
        };

        for(var r=i;r<i+6;r++){
          data.mv.push(Data.items[r]);
        }
        this.movieList.push(data);
      }
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
      }, 1000);
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>
