<template>
	<view class="container-fluid full">
		<view class="row" style="height: 100%;width: 100%;margin: 0;">
			<view class="col-12 row justify-content-center setText" style="margin-top: 10%;">
				热烈欢迎
			</view>
			<view class="col-12 row justify-content-center setText" style="margin: 0;">
				{{ titleObj.FTITLE }}莅临
			</view>
			<view class="col-12 row justify-content-center setText" style="margin: 0;">
				我司指导工作
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleObj: {},
			}
		},
		onLoad(option) {
			try {
				//从路径中获取看板标题等信息
				const item = JSON.parse(decodeURIComponent(option.ele));
				this.titleObj = item;
			} catch (e) {
				//TODO handle the exception
				//如果没有title信息，则不显示
			
			}
		},
		methods: {

		}
	}
</script>

<style>
	.full {
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0px;
		margin: 0;
		background-color: red;
	}
	.setText{
		color: yellow;
		font-size: 90px;
		line-height: 90px;
	}
</style>
