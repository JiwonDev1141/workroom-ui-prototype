<!--
=========================================================
* Vue Material Dashboard 2 - v3.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-material-dashboard-2
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<template>
	<!-- <sidenav v-if="showSidenav" :custom_class="color" :class="[isRTL ? 'fixed-end' : 'fixed-start']" /> -->
	<main class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden">
		<!-- nav -->
		<!-- <navbar
			v-if="showNavbar"
			:class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
			:color="isAbsolute ? 'text-white opacity-8' : ''"
			:min-nav="navbarMinimize"
		/> -->
		<router-view />
		<!-- <app-footer v-show="showFooter" />
		<configurator :toggle="toggleConfigurator" :class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']" /> -->
	</main>
</template>
<script>
import { mapMutations, mapState } from "vuex";
// import Sidenav from "./examples/Sidenav";
import router from "./router";
// import Configurator from "@/examples/Configurator.vue";
// import Navbar from "@/examples/Navbars/Navbar.vue";
// import AppFooter from "@/examples/Footer.vue";

export default {
  name: "App",
  components: {
    // Sidenav,
    // Configurator,
    // Navbar,
    // AppFooter,
  },
  computed: {
    ...mapState([
      "isRTL",
      "color",
      "isAbsolute",
      "isNavFixed",
      "navbarFixed",
      "absolute",
      "showSidenav",
      "showNavbar",
      "showFooter",
      "showConfig",
      "hideConfigButton",
    ]),
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";

    const sidenav = document.getElementsByClassName("g-sidenav-show")[0];

    // alert(process.env.VUE_APP_API_URL);

    if (window.innerWidth > 1200) {
      sidenav.classList.add("g-sidenav-pinned");
    }
  },
  mounted() {
    this.redirectPage()
  },
  setup() {
    const redirectPage = () => {
      if (localStorage.getItem("accessToken")) {
        router.push("dashboard");
      } else {
        router.push("onboarding");
      }
    };

    return {
      redirectPage
    }
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },


};
</script>
