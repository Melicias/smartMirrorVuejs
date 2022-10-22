<template>
  <div class="container" style="display: block">
  
      <header class="module-header" style="display: none">undefined</header>
      <div class="module-content">
        <div class="qrcode">
          <div class="qrcode__image">
            <div title="hello">
              <div v-html="data"></div>
            <div class="qrcode__text">Connect to my Wifi</div>
            </div>
          </div>
        </div>
   
    </div>
  </div>
</template>

<script>
import {generateWifiQRCode}  from '../../node_modules/wifi-qr-code-generator';

export default {
  components: {},
  name: "WifiCode",
  import: [generateWifiQRCode],
  data() {
    return {
    data:null
    };
  },
  created() {
    this.data=generateWifiQRCode({
        ssid: process.env.VUE_APP_SSID,
        password: process.env.VUE_APP_SSID_PASSWORD,
        encryption: process.env.VUE_APP_SSID_ENCRYPTION,
        hiddenSSID: false,
        outputFormat: { type: 'svg' }
    })
    this.data.then((data) =>{
        this.data=data
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 ::v-deep svg{
    width: 150px;
    height: 150px;
 }

 ::v-deep svg path {
  fill: transparent !important;
  stroke: white;
}

.qrcode__text {
  font-size: 20px;
  font-weight: normal;
  color: #aaa;
  line-height: 1.5;
  max-width: 400px;
  text-align: left;
 
}
.qrcode {
  line-height: 0;
}
</style>
