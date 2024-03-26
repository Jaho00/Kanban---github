<template>
	<view class="container-fluid row" style="margin: 0;">
		 <dv-full-screen-container>
			<view class="">
				<u-toast ref="uToast" />
			</view>
			<view class="intro row justify-content-md-center">
				<view class="loginContent col-3 align-self-center">
					<view class="input-group">
					  <view class="input-group-prepend">
						<text class="labelText usernameText" id="basic-addon1">用户名</text>
					  </view>
					  <input type="text" class="form-control username" placeholder="请输入用户名" v-model="userName" aria-label="Username" aria-describedby="basic-addon1" @input="$u.debounce(searchZH, 500)">
					</view>
					<view class="input-group mt-1">
					  <view class="input-group-prepend">
						<text class="labelText passworldText" id="basic-addon1">密码</text>
					  </view>
					  <input type="password" class="form-control username" placeholder="请输入密码"  confirm-type="search" @confirm="dologin" v-model="password" aria-label="Username" aria-describedby="basic-addon1">
					</view>
					<view class="mt-1" style="color: #ffaa00;">
						<uni-combox :candidates="zhSelectList" emptyTips="" placeholder="选择用户" v-model="zhmc"></uni-combox>
					</view>
					<view class="buttomGroup row justify-content-around mt-1 switchBtn">
						<view class="col-6 row align-items-center">
							记住密码
							<u-switch v-model="remember"  :style="{marginLeft:'5px',fontSize: '.2rem'}"></u-switch>
						</view>
						<view class="col-6 row align-items-center">
							自动登录
							<u-switch v-model="autoLogin" :style="{marginLeft:'5px',fontSize: '.2rem'}"></u-switch>
						</view>
					</view>
					<view class="buttomGroup row justify-content-around mt-1">
						<button type="button" class="btn btn-primary" style="font-size: .2rem;border-radius: 5px;padding:5px 20px;" @click="dologin">登录</button>
						<button type="button" class="btn btn-secondary" style="font-size: .2rem;border-radius: 5px;padding:5px 20px;" @click="reset">重置</button>
					</view>
					<view class="row justify-content-end setMACButton">
						<!-- <text style="font-size: .2rem;color:#FFFFFF" @click="showGW">绑定工位</text> -->
						<text style="font-size: .2rem;color:#FFFFFF">{{ sb }}</text>
					</view>
				</view>
			</view>
		</dv-full-screen-container>
	</view>
</template>

<script>
	var _self = null;
	export default {
		data() {
			return {
				userName:"",
				password:"",
				remember: false,
				autoLogin: false,
				mac:'',
				isGWshow: false,
				LineList:[],
				GWList:[],
				selectedGWCode:[],
				selectedGWName:[],
				GWDNMC:''  ,//工位电脑名称
				nowLine: '', //当前选中产线，如果一样，就不请求了
				sb:"",
				zhList:[{
					ZHID: "",
					ZHMC: ""
				}], //租户列表
				zhSelectList:[], //待选租户字符串列表
				j_dept:"", //选中的租户
				zhmc:"", //选中的租户名称
			}	
		},
		methods: {
				onLoad() {
					_self = this;
					 const res = uni.getSystemInfoSync();
					  this.sb = '宽度:' + res.windowWidth + '高度:' + res.windowHeight;
					try {
						const res = uni.getStorageSync('UserCode');
						if (res) {
							console.log(res);
							this.remember = true;
							this.userName = res.j_username;
							this.password = res.j_password;
							this.j_dept = res.ZHID;
							this.zhmc = res.ZHMC;
							if(res.auto === "auto"){
								this.autoLogin = true;
								this.dologin();
							}
						}
					} catch (e) {
						// error
					}
					try{
						// 获取设备信息
							plus.device.getInfo({
								success:function(e){
									if(e.uuid.indexOf(',') == -1){
										this.mac = e.uuid;
									}else{
										this.mac = e.uuid.split(",")[0];
									}
									console.log(this.mac);
									this.$refs.uToast.show({
										title: this.mac,
										type: 'error',
										duration: '2300'
									});
									uni.setStorageSync('MAC', this.mac);
								},
								fail:function(e){
									console.log('getDeviceInfo failed: '+JSON.stringify(e));
								}
							});	
					}catch(e){
						//TODO handle the exception
						this.mac = this.cans();
						console.log(this.mac)
						uni.setStorageSync('MAC', this.mac);
					}
					
				},
				cans(){
					function bin2hex(str) {
						var result = "";
						for (var i = 0; i < str.length; i++ ) {
							result += int16_to_hex(str.charCodeAt(i));
						}
						return result;
					}
					
					function int16_to_hex(i) {
						var result = i.toString(16);
						var j = 0;
						while (j+result.length < 4){
							result = "0" + result;
							j++;
						}
						return result;
					}
				    var canvas = document.createElement('canvas');
				    var ctx = canvas.getContext('2d');
				    var txt = 'http://security.tencent.com/';
				    ctx.textBaseline = "top";
				    ctx.font = "14px 'Arial'";
				    ctx.textBaseline = "tencent";
				    ctx.fillStyle = "#f60";
				    ctx.fillRect(125,1,62,20);
				    ctx.fillStyle = "#069";
				    ctx.fillText(txt, 2, 15);
				    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
				    ctx.fillText(txt, 4, 17);
				    var b64 = canvas.toDataURL().replace("data:image/png;base64,","");
				    var bin = atob(b64);
				    var crc = bin2hex(bin.slice(-16,-12));
				    //var crc = bin.slice(-16,-12);
				    return crc;
				},
				intoFull(el){  
					var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,wscript;  
					if(typeof rfs != "undefined" && rfs) {    
						rfs.call(el);    
						return;    
					}  
					if(typeof window.ActiveXObject != "undefined") {    
						wscript = new ActiveXObject("WScript.Shell");    
						if(wscript) {    
							wscript.SendKeys("{F11}");
						}    
					}  
				}, 
				reset(){
					this.userName = "";
					this.password = "";
				},
				searchZH(){
					this.zhSelectList = [];
					uni.request({
						url: this.basePath + '/APP/sysLogin!getSaasZH.action',
						data: {
							usercode: this.userName
						},
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (result) => {
							if (result.data.IsSuccess) {
								this.zhmc = result.data.Data[0].ZHMC;
								this.j_dept = result.data.Data[0].ZHID;
								result.data.Data.forEach((ele) =>{
									this.zhSelectList.push(ele.ZHMC);
								});
								console.log(this.zhSelectList)
								this.zhList = result.data.Data;
							} else {
								this.zhList = [{
									ZHID: "",
									ZHMC: ""
								}]
								this.zhSelectList = [""];
								this.zhmc = "";
								this.j_dept = "default";
							}
						}
					})
				},
				showGW(){
					const zhid = uni.getStorageSync('UserInfo').ZHID;
					if(!zhid){
						this.$refs.uToast.show({
							title: "请先登录，再重新选择工位",
							type: 'error',
							duration: '2300'
						});
						return;
					}
					// 获取所有产线
					uni.request({
						url: this.basePath + '/APP/jobReport!getProLine.action',
						data: {
							zhid: zhid,
						},
						method: 'POST',
						header:{
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (result) => {
							if(result.data.IsSuccess){
								result.data.Data.forEach((ele,index)=>{
									ele.selected = false;
								});
								this.LineList = result.data.Data;
							}else{
								this.$refs.uToast.show({
									title: result.data.message,
									type: 'error',
									duration: '2300'
								})
							}
						}
					})
					this.isGWshow = true;
				},
				chooseLine(item, index){
					if(this.nowLine == item.FCODE){
						return;
					}
					this.nowLine = item.FCODE;
					this.LineList.forEach((ele,index)=>{
						ele.selected = false;
					})
					this.LineList[index].selected = '已选中';
					//获取选中产线下的所有工位
					uni.request({
						url: this.basePath + '/APP/jobReport!getWsForLinecode.action',
						data: {
							zhid:uni.getStorageSync('UserInfo').ZHID,
							linecode: item.FCODE
						},
						method: 'POST',
						header:{
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (result) => {
							if(result.data.IsSuccess){
								result.data.Data.forEach((ele,index)=>{
									ele.selected = false;
								});
								this.GWList = result.data.Data;
								this.selectedGWCode = [];
								this.selectedGWName = [];
							}else{
								this.$refs.uToast.show({
									title: result.data.message,
									type: 'error',
									duration: '2300'
								})
							}
						}
					})
				},
				chooseGW(item, index){
					if(item.selected == '已选中'){
						 this.selectedGWCode.splice(this.selectedGWCode.findIndex(data => item.FCODE === data), 1);
						 this.selectedGWName.splice(this.selectedGWName.findIndex(data => item.FNAME === data), 1);
						item.selected = false;
					}else{
						this.selectedGWCode.push(item.FCODE);
						this.selectedGWName.push(item.FNAME);
						item.selected = '已选中'
					}
				},
				bindGW(){
					if(this.GWDNMC == ''){
						this.$refs.uToast.show({
							title: '请输入工位电脑名称',
							type: 'error',
							duration: '2300'
						});
						return;
					}else if(this.selectedGWCode.length == 0){
						this.$refs.uToast.show({
							title: '请选择工位',
							type: 'error',
							duration: '2300'
						});
						return;
					}
					uni.request({
						url: this.basePath + '/APP/sysLogin!setStationMAC.action',
						data: {
							zhid: uni.getStorageSync('UserInfo').ZHID,
							usercode: uni.getStorageSync('UserInfo').USERCODE,
							mac: this.mac,
							fip:'',
							scname: this.GWDNMC,
							wscode: this.selectedGWCode.toString(),
							wsname: this.selectedGWName.toString(),
							fnote: ''
						},
						method: 'POST',
						header:{
								'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (result) => {
							if(result.data.IsSuccess){
								this.isGWshow = false;
							}else{
								this.$refs.uToast.show({
									title: result.data.message,
									type: 'error',
									duration: '2300'
								})
							}
						}
					})	
				},
				dologin(){
					if(this.userName == '' || this.password == ''){
						uni.showToast({
						title: '帐号密码不能为空',
						icon:'none',
						duration: 2000
						});
						return;
					}
					this.zhList.forEach((ele)=>{
						if(ele.ZHMC == this.zhmc){
							this.j_dept = ele.ZHID;
						}
					});
					if(this.remember === true){
						uni.setStorageSync('UserCode', {j_username: this.userName, j_password:this.password,auto:"noauto",ZHID: this.j_dept,
						ZHMC: this.zhmc});
					}else{
						try {
						    uni.removeStorageSync('UserCode');
						} catch (e) {
						     console.log(e);
						}
					}
					if(this.autoLogin === true){
						uni.setStorageSync('UserCode', {j_username: this.userName, j_password:this.password,auto:"auto",ZHID: this.j_dept,
						ZHMC: this.zhmc});
					}
					uni.request({
							url: this.basePath + '/APP/sysLogin!login.action',
							data:{j_host:'banyuekeji.f3322.net:8888',j_username:this.userName,j_password:this.password,j_dept: this.j_dept,phone:'1'},
							method: 'GET',
							dataType:'json',
							success:(Rwres)=>{
								if(Rwres.data.IsSuccess){
									try {
									    uni.setStorageSync('UserInfo', Rwres.data.Data);
									} catch (e) {
									    console.log(e);
									}
									// document.body.webkitRequestFullscreen();//全屏
									var body = document.body;
									// this.intoFull(body); //全屏
									uni.redirectTo({
										url:'/pages/index/main/main'
									});
									
								}else{
										uni.showToast({
										title: '请输入正确的帐号密码',
										icon:'none',
										duration: 2000
										});
								}
							},
						});
				},
			}	
		}
</script>

<style>
	.container-fluid {
		position: absolute;
		top: 0rpx;
		bottom: 0rpx;
		width: 100%;
		padding: 0px;
	}
	.intro{
		background-image: url(../../static/img/loginBackground.jpg);
		width: 100%;
		padding: 0px;
		margin: 0;
		background-repeat:no-repeat; 
		background-size:100% 100%;
		height: 100%;
	}
	.username{
		padding: 0;
		margin: 0;
		font-size: .3rem;
		height: calc(.3rem + 2px);
		background-color: inherit;
		border: 1px solid #035FA6;
		color: #ffffff;
	}
	.loginContent{
		width: 320px;
		height: 268px;
		position: absolute;
		top: 50%;
		left: 59%;
		margin-left: -160px;
		margin-top: -134px;
	}
	.labelText{
		color: #fff;
	}
	.setMACButton{
		position: absolute;
		bottom: 0;
		right: -50px;
	}
	.bindGWContent{
		font-size: .3rem;
	}
	.baditem{
		height: 50px;
		margin: 10px 20px;
		/* background-color: #A6A6A6; */
		text-align: center;
		box-shadow: 5px 5px 5px;
	}
	.Bsdactive{
		/* background-color: #09E763; */
	}
	.titleText {
		padding: 0;
		font-size: inherit;
		height: 50px;
		border-radius: 0;
	}
	.usernameText{
		font-size: .3rem;
		padding: 0 10px;
	}
	.passworldText{
		font-size: .3rem;
		padding: 0 22px;
	}
	.switchBtn{
		font-size: .2rem;
		color: #FFFFFF;
	}
	@media screen and (max-width: 1000px)  {
		.loginContent{
			width: 320px;
			height: 216px;
			position: absolute;
			top: 55%;
			left: 62%;
			margin-left: -160px;
			margin-top: -134px;
		}
		.usernameText{
			font-size: .3rem;
			padding: 0 10px;
		}
		.passworldText{
			font-size: .3rem;
			padding: 0 22px;
		}
		.switchBtn{
			font-size: .2rem;
			color: #FFFFFF;
		}
		.setMACButton{
			position: absolute;
			bottom: 0;
			right: -5px;
		}
	}
</style>
