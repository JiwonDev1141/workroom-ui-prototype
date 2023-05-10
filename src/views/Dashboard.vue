<template>
	<div class="py-4 container-fluid">
		<div class="row mb-4">
			<div class="col-lg-12 position-relative z-index-2">
				<div class="row">
					<!-- <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Today\'s Money', value: '$53k' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> than last week"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div> -->
					<!-- <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Today\'s Users', value: '2,300' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div> -->
					<!-- <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'New Clients', value: '3,462' }"
              detail="<span class='text-danger text-sm font-weight-bolder'>-2%</span> than yesterday"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div> -->
					<!-- <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Sales', value: '$103,430' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+5%</span> Just updated"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div> -->
				</div>

				<KakaoMap />

				<div class="row mt-4">
					<div class="col-lg-12 col-md-6 mt-4">
						<chart-holder-card
							title="해녀 기기 사용현황"
							subtitle="(<span class='font-weight-bolder'>+15%</span>) increase in today sales."
							update="updated 4 min ago"
							color="success"
						>
							<reports-bar-chart
								id="device-using"
								:chart="{
									labels: [
										'제주시',
										'조천읍',
										'구좌읍',
										'성산읍',
										'표선면',
										'남원읍',
										'서귀포시',
										'중문',
										'안덕면',
										'대정읍',
										'한경면',
										'한림읍',
										'애월읍',
										'추자도',
										'우도',
										'기타',

									],
									datasets: {
										label: 'Mobile apps',
										data: [2, 16, 0, 7, 0, 12, 12, 11, 0, 6, 0, 50, 11, 0, 0, 3],
									},
								}"
							/>
						</chart-holder-card>
					</div>

					<div class="col-lg-12 col-md-6 mt-4">
						<chart-holder-card
							title="해녀 기기 미사용 현황"
							subtitle="Last Campaign Performance"
							update="campaign sent 2 days ago"
						>
							<reports-bar-chart
								id="device-unsing"
								:chart="{

									labels: [
										'제주시',
										'조천읍',
										'구좌읍',
										'성산읍',
										'표선면',
										'남원읍',
										'서귀포시',
										'중문',
										'안덕면',
										'대정읍',
										'한경면',
										'한림읍',
										'애월읍',
										'추자도',
										'우도',
										'기타'

										,],
									datasets: {
										label: 'Using',
										data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
									},
								}"
							/>
						</chart-holder-card>
					</div>
					<div class="col-lg-6 col-md-6 mt-4">
						<chart-holder-card
							title="전체 기기 현황"
							subtitle="Last Campaign Performance"
							update="campaign sent 2 days ago"
							color="dark"
						>
							<reports-bar-chart
								:chart="{
									labels: ['사용중', '미사용중'],
									datasets: {
										label: 'Using',
										data: [130, 24],
									},
								}"
							/>
						</chart-holder-card>
					</div>

					<div class="col-lg-6 mt-4">
						<chart-holder-card title="월단위 사용량" subtitle="Last Campaign Performance" update="just updated" color="dark">
							<reports-line-chart
								id="tasks-chart2"
								:chart="{
									labels: [
										'1월',
										'2월',
										'3월',
										'4월',
										'5월',
										'6월',
										'7월',
										'8월',
										'9월',
										'10월',
										'11월',
										'12월',

									],
									datasets: {
										label: 'Mobile apps',
										data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 210, 160, 500],
									},
								}"
							/>
						</chart-holder-card>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="row">
      <div class="col-lg-12 col-md-6 mb-md-0 mb-4">
        <project-card
          title="Projects"
          description="<i class='fa fa-check text-info' aria-hidden='true'></i> <span class='font-weight-bold ms-1'>30 done</span> this month"
          :headers="['Companies', 'Members', 'Budget', 'Progress']"
          :projects="[
            {
              logo: logoXD,
              title: 'Material XD Material XD Version',
              members: [team1, team2, team3, team4],
              budget: '$14,000',
              progress: { percentage: 60, color: 'info' },
            },
            {
              logo: logoAtlassian,
              title: 'Add Progress Track',
              members: [team2, team4],
              budget: '$3,000',
              progress: { percentage: 10, color: 'info' },
            },
            {
              logo: logoSlack,
              title: 'Fix Platform Errors',
              members: [team3, team1],
              budget: 'Not set',
              progress: { percentage: 100, color: 'success' },
            },
            {
              logo: logoSpotify,
              title: 'Launch our Mobile App',
              members: [team4, team3, team4, team1],
              budget: '$20,500',
              progress: { percentage: 100, color: 'success' },
            },
            {
              logo: logoJira,
              title: 'Add the New Pricing Page',
              members: [team4],
              budget: '$500',
              progress: { percentage: 25, color: 'info' },
            },
            {
              logo: logoJira,
              title: 'Redesign New Online Shop',
              members: [team1, team4],
              budget: '$2,000',
              progress: { percentage: 40, color: 'info' },
            },
          ]"
        />
      </div>
      <-- <div class="col-lg-4 col-md-6">
        <timeline-list
          class="h-100"
          title="Orders overview"
          description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
        <span class='font-weight-bold'>24%</span> this month"
        >
          <timeline-item
            :icon="{
              component: 'notifications',
              class: 'text-success',
            }"
            title="$2400 Design changes"
            date-time="22 DEC 7:20 PM"
          />
          <TimelineItem
            :icon="{
              component: 'code',
              class: 'text-danger',
            }"
            title="New order #1832412"
            date-time="21 DEC 11 PM"
          />
          <TimelineItem
            :icon="{
              component: 'shopping_cart',
              class: 'text-info',
            }"
            title="Server payments for April"
            date-time="21 DEC 9:34 PM"
          />
          <TimelineItem
            :icon="{
              component: 'credit_card',
              class: 'text-warning',
            }"
            title="New card added for order #4395133"
            date-time="20 DEC 2:20 AM"
          />
          <TimelineItem
            :icon="{
              component: 'vpn_key',
              class: 'text-primary',
            }"
            title="Unlock packages for development"
            date-time="18 DEC 4:54 AM"
            class="pb-1"
          />
        </timeline-list>
      </div> 
    </div> -->
	</div>
</template>
<script>
import ChartHolderCard from "./components/ChartHolderCard.vue";
import KakaoMap from "./components/KakaoMap.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "@/examples/Charts/ReportsLineChart.vue";
// import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
// import ProjectCard from "./components/ProjectCard.vue";
// import TimelineList from "@/examples/Cards/TimelineList.vue";
// import TimelineItem from "@/examples/Cards/TimelineItem.vue";
import logoXD from "@/assets/img/small-logos/logo-xd.svg";
import logoAtlassian from "@/assets/img/small-logos/logo-atlassian.svg";
import logoSlack from "@/assets/img/small-logos/logo-slack.svg";
import logoSpotify from "@/assets/img/small-logos/logo-spotify.svg";
import logoJira from "@/assets/img/small-logos/logo-jira.svg";
import logoInvision from "@/assets/img/small-logos/logo-invision.svg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
export default {
  name: "DashboardDefault",
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    KakaoMap
  },
  data() {
    return {
      logoXD,
      team1,
      team2,
      team3,
      team4,
      logoAtlassian,
      logoSlack,
      logoSpotify,
      logoJira,
      logoInvision,
    };
  },
};
</script>
