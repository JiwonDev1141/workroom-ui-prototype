<template>
	<div>
		<div id="map"></div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
        }
    },
    mounted() {
        if (!window.kakao || !window.kakao.maps) {
            const script = document.createElement("script");
    
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
    
            
            /* global kakao */
            script.addEventListener('load', () => {
                console.log("loaded", kakao)
                kakao.maps.load(this.initMap);
            })
            document.head.appendChild(script);
        }
        else {
            this.initMap();
        }
    },
    methods: {
        initMap() {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(33.451393, 126.570738, 1),
                level: 9,
            }
            this.map = new kakao.maps.Map(container, options);
        }
    },
}
</script>

<style scoped>
#map {
    width: 100%;
    height: 60vh;
}

</style>