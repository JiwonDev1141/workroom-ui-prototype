<template>
	<div id="sidenav-collapse-main" class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100">
		<ul class="navbar-nav">
			<li class="nav-item">
				<sidenav-collapse url="#" :aria-controls="''" :collapse="false" collapse-ref="dashboard" nav-text="대시보드">
					<template #icon>
						<i class="material-icons-round opacity-10 fs-5">dashboard</i>
					</template>
				</sidenav-collapse>
			</li>
			<li class="nav-item">
				<sidenav-collapse url="#" :aria-controls="''" :collapse="false" collapse-ref="tenant" nav-text="테넌트 관리">
					<template #icon>
						<i class="material-icons-round opacity-10 fs-5">receipt_long</i>
					</template>
				</sidenav-collapse>
			</li>
			<li class="nav-item">
				<sidenav-collapse url="#" :aria-controls="''" :collapse="false" collapse-ref="users" nav-text="유저 관리">
					<template #icon>
						<i class="material-icons-round opacity-10 fs-5">person</i>
					</template>
				</sidenav-collapse>
			</li>
	

			<!-- <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="rtl-page"
          navText="Rtl"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5"
              >format_textdirection_r_to_l</i
            >
          </template>
        </sidenav-collapse>
      </li> -->
		

			<li class="mt-3 nav-item">
				<h6 class="text-xs ps-4 text-uppercase font-weight-bolder text-white" :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'">
					ACCOUNT PAGES
				</h6>
			</li>
			<li class="nav-item">
				<sidenav-collapse url="#" :aria-controls="''" :collapse="false" collapse-ref="profile" nav-text="프로필">
					<template #icon>
						<i class="material-icons-round opacity-10 fs-5">person</i>
					</template>
				</sidenav-collapse>
			</li>
		</ul>
		<div class="sidenav-footer position-absolute w-100 bottom-0">
			<div class="mx-3">
				<!-- <a
          class="btn mt-4 w-100"
          :class="`bg-gradient-${this.$store.state.color}`"
          href="https://www.creative-tim.com/product/vue-material-dashboard-2-pro"
          >Upgrade to pro</a -->
				>
			</div>
		</div>
	</div>
</template>
<script>
import SidenavCollapse from './SidenavCollapse.vue';

export default {
    name: 'SidenavList',
    components: {
        SidenavCollapse,
    },
    props: {
        cardBg: String,
    },
    data() {
        return {
            title: 'Soft UI Dashboard PRO',
            controls: 'dashboardsExamples',
            isActive: 'active',
        };
    },
};
</script>
