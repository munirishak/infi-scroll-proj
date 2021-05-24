<template>
  <div id="app">
    <vue-recyclist
      class="list"
      :list="list"
      :items="movieList"
      :size="size"
      :loadmore="loadmore"
      :tombstone="tombstone"
      :nomore ="eod"
    >
      <template slot="tombstone">
        <div class="item tombstone">
          <div class="bubble">
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </template>
      <template slot="item" scope="props">
        <div :id="props.data.id" class="item">
          <div class="bubble">
            <div>{{ props.data.title }}</div>
            <div>{{ props.data.imDbRating }}</div>
            <div>{{ props.data.id }}</div>
          </div>
        </div>
      </template>
      <!--<div slot="spinner">Loading Data</div>-->
      <div slot="nomore">End of records</div>
    </vue-recyclist>
  </div>
</template>

<script>
// import axios from "axios";
import Data from "./data";
import VueRecyclist from "vue-recyclist";
export default {
  name: "Example",
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
  watch: {
    
  },
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
          if (this.size * this.page > this.movieList.length){
            this.eod = true;
          }else if (this.size * (this.page+1) > this.movieList.length){
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
