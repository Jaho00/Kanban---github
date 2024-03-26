<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
	@import url("./static/css/bootstrap4.5/bootstrap.min.css");
	// @import url("./static/css/toastr.min.css");
	@import "uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */ 

uni-swiper .uni-swiper-dots-horizontal{
	position: relative;
	left: 95%!important;
	top: 0px;
	text-align: center;
	white-space: nowrap;
	-webkit-transform: translate(-50%);
	transform: translate(-50%);
}

	.over_text{
		overflow: hidden!important;
		text-overflow:ellipsis;
		white-space: nowrap;
		display: block!important;
	}
	// 以下样式用于修改dataV默认样式
	.main-container .border{
		border: 0px!important;
	}
	.label-column{
		font-size: .18rem!important;
	}
	.dv-capsule-chart .unit-label{
		font-size: .18rem!important;
	}
	.dv-capsule-chart .unit-text{
		font-size: .15rem!important;
	}
</style>
