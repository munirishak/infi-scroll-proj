<template>
  <div class="scroll-basic-container" id="scrollContainer">
    <div
      id="contentContainer"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="list shadow bg-clip-padding bg-white rounded-lg overflow-hidden"
      >
        <div
          class="movie-item grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"
        >
          <div class="img h-full img-max-height overflow-hidden relative">
            <img class="object-fit" :src="item.image" />
            <div
              class="absolute top-0 left-0 p-3 bg-clip-padding bg-yellow-500 font-extrabold rounded-br-lg text-white"
            >
              {{ item.imDbRating }}
            </div>
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
  </div>
</template>

<script>
// import axios from "axios";
import Data from "./data";
import Stats from "./stats.min";
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
  created() {
    this.addStatsPanel();
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
      this.list = this.movieList.slice(0, this.size * this.page);
    },
    scroll() {
      let scrollContainer = document.getElementById("scrollContainer");
      let contentContainer = document.getElementById("contentContainer");
      scrollContainer.onscroll = () => {
        if (
          scrollContainer.scrollTop + scrollContainer.offsetHeight >=
          contentContainer.offsetHeight * 0.7
        ) {
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
        console.log(this.list.length);
      }
    },
    addStatsPanel() {
      if (window.requestIdleCallback) {
        let self = this;
        let stats = new Stats();
        let domPanel = new Stats.Panel("D", "#0ff", "#002");
        stats.addPanel(domPanel);
        stats.showPanel(3);
        document.body.appendChild(stats.dom);
        setTimeout(function timeoutFunc() {
          // Only update DOM node graph when we have time to spare to call
          // numDomNodes(), which is a fairly expensive function.
          requestIdleCallback(() => {
            domPanel.update(self.numDomNodes(document.body), 1500);
            setTimeout(timeoutFunc, 100);
          });
        }, 100);
      }
    },
    numDomNodes(node) {
      if (!node.children || node.children.length == 0) return 0;
      let childrenCount = Array.from(node.children).map(this.numDomNodes);
      return (
        node.children.length +
        childrenCount.reduce(function (p, c) {
          return p + c;
        }, 0)
      );
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
