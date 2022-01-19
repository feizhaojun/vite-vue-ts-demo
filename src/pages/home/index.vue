<template>
  <div class="btns">
    <div @click="cainiao">连接菜鸟打印组件</div>
    <div @click="pinduoduo">连接拼多多打印组件</div>
    <div @click="doudian">连接抖店打印组件</div>
    <div @click="getCmpts">获取已连接打印组件1</div>
    <div @click="getCmpts2">获取已连接打印组件2</div>
    <div @click="getPrinters">获取打印机1</div>
    <div @click="getPrinters2">获取打印机2</div>
    <div @click="print">打印测试</div>
    <div @click="task">task</div>
    <div @click="getMessage">Message</div>
  </div>
  <div class="message">
    print Message:
    <textarea v-model="message"></textarea>
  </div>
</template>
<script lang="ts" setup>
import printer from 'print-brigde';
import { ref } from 'vue';

const message = ref(`{
  "cmpt": "",
  "printer": "",
  "callback": () => { console.log(res); },
  "documents": [{
    "documentID": "0123456789",
    "contents": [{
      "data": {
        "nick": "张三"
      },
      "templateURL": "http://cloudprint.cainiao.com/template/standard/278250/1"
    }]
  }]
}`);

const cainiao = () => {
  printer.connect('cainiao', res => console.log(res));
}

const pinduoduo = () => {
  printer.connect('pinduoduo', res => console.log(res));
}

const doudian = () => {
  printer.connect('doudian', res => console.log(res));
}

const getCmpts = () => {
  printer.getCmpts((res: any): void => {
    console.log(res);  // res 是回参
  });
}
const getCmpts2 = () => {
  printer.getCmpts({
    callback: (res: any): void => {
      console.log(res);
    }
  });
}

const getPrinters = () => {
  printer.getPrinters((res: any): void => {
    console.log(res);
  });
}

const getPrinters2 = () => {
  printer.getPrinters({
    cmpt: 'doudian',
    callback(res: any): void {
      console.log(res);
    }
  });
}

const print = () => {
  printer.print(JSON.parse(message.value));
}

const task = () => {
  printer.task();
}

const getMessage = () => {
  console.log(message);
}

</script>

<style>
.message {
  padding: 10px;
  text-align: left;
}
textarea{
  width: 100%;
  min-height: 400px; 
}
.btns {
  display: flex;
  flex-wrap: wrap;
}
.btns div {
  cursor: pointer;
  background: #999;
  color: #fff;
  line-height: 30px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  margin: 10px;
}
</style>