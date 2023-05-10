<template>
	<aside
		id="sidenav-main"
		class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3"
		:class="`${
			isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'
		} ${sidebarType}`"
	>
		<div class="sidenav-header">
			<i
				id="iconSidenav"
				class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
				aria-hidden="true"
			></i>
			<a class="m-0 navbar-brand" href="/">
				<!-- <img
					:src="
						sidebarType === 'bg-white' ||
							(sidebarType === 'bg-transparent' && !isDarkMode)
							? logoDark
							: logo
					"
					class="navbar-brand-img h-100"
					alt="main_logo"
				/> -->
				<img
					src="
						/favicon/png/metah_favicon_32x32.png
					"
					class="navbar-brand-img h-100"
					alt="main_logo"
				/>
				<span
					class="ms-2 font-weight-bold text-white"
				>메타 헬스케어</span>
			</a>
		</div>
		<hr class="horizontal light mt-0 mb-2" />
		<sidenav-list />
	</aside>
</template>
<script>
import { mapState } from "vuex";
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.png";
import logoDark from "@/assets/img/logo-ct-dark.png";

export default {
  name: "Index",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      logoDark,
    };
  },
  computed: {
    ...mapState(["isRTL", "sidebarType", "isDarkMode"]),
  },
};
</script>
