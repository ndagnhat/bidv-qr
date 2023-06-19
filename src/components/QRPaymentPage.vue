<script setup>

import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';
import { withBase } from 'vitepress'

const qrview = ref(null);
var QRFrame = null;
var QRCode = null;
var QRBank = null;
var QRNumber = null;
var QRName = null;

const listBanks = ref([]);
const bankId = ref('970418');
const accountNo = ref('');
const accountName = ref('');
const amount = ref('');
const description = ref('');
const displayInfor = ref(true)

onMounted(() => {
    QRFrame = new fabric.Canvas("canvas", {
        backgroundColor: "#ffffff",
        width: 1000,
        height: 1000
    });
    let qrviewWidth = qrview.value.clientWidth;
    QRFrame.setZoom(qrviewWidth / 1000);
    QRFrame.setWidth(qrviewWidth);
    QRFrame.setHeight(qrviewWidth);
    fabric.Image.fromURL(withBase("/qrdefault.png"), function (img) {
        QRCode = img;
        QRCode.left = 200;
        QRCode.top = 100;
        QRCode.scaleX = 600 / QRCode.width;
        QRCode.scaleY = 600 / QRCode.height;
        QRFrame.add(QRCode);
        QRFrame.renderAll();
    });
     QRBank = new fabric.Text('', {
        top: 730,
        fill: '#006B68'
    });
    QRBank.left = 500 - (QRBank.getScaledWidth() /2);
     QRNumber = new fabric.Text('', {
        top: 780,
        fill: '#006B68'
    });
    QRNumber.left = 500 - (QRNumber.getScaledWidth() /2);
    QRName = new fabric.Text('', {
        top: 820,
        fill: '#006B68'
    });
    QRName.left = 500 - (QRName.getScaledWidth() /2);
    QRFrame.add(QRBank);
    QRFrame.add(QRNumber);
    QRFrame.add(QRName);
    QRFrame.renderAll();


    fetch('https://api.vietqr.io/v2/banks')
        .then(response => response.json())
        .then(data => {
            if (data.code == '00') {
                listBanks.value = data.data;
            }
            console.log('Error fetching data:', data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function createQRCode() {
    let qrlink = "https://img.vietqr.io/image/" + bankId.value + "-" + accountNo.value + "-xyzWuLb.png?amount=" + amount.value + "&addInfo=" + description.value + "&accountName=" + accountName.value;
    const left = QRCode.left
    const top = QRCode.top
    const width = QRCode.width * QRCode.scaleX;
    const height = QRCode.height * QRCode.scaleY;
    QRCode.setSrc(qrlink, function (img) {
        QRCode = img;
        QRCode.left = left;
        QRCode.top = top;
        QRCode.scaleX = width / QRCode.width;
        QRCode.scaleY = height / QRCode.height;
        QRFrame.renderAll();
    }, {
        crossOrigin: 'anonymous'
    });

    if(displayInfor.value) {
        QRBank.text = "abc";
        QRBank.left = 500 - (QRBank.getScaledWidth() /2);
        QRFrame.renderAll();
    }
}

function selectNoFrame() {
    QRFrame.setBackgroundImage(null);
    QRFrame.setBackgroundColor("#ffffff");

    const qrviewWidth = qrview.value.clientWidth;
    QRFrame.setZoom(qrviewWidth / 1000);
    QRFrame.setWidth(qrviewWidth);
    QRFrame.setHeight(qrviewWidth);

    if (QRCode != null) {
        const frameWidth = QRFrame.getWidth() / QRFrame.getZoom();
        QRCode.left = frameWidth / 6;
        QRCode.top = frameWidth / 8;
        QRCode.scaleX = (frameWidth / 3 * 2) / QRCode.width;
        QRCode.scaleY = (frameWidth / 3 * 2) / QRCode.height;
    }
    QRFrame.renderAll();
}

</script>

<template>
    <div class="row">
        <div class="container qrinput">
            <h1>Input Payment Infor</h1>
            <div class="vp-field-group">
                <label for="selBank" class="vp-field-label">Choose a bank</label>
                <select id="selBank" v-model="bankId" name="bankId" class="vp-field">
                    <option v-for="bank in listBanks" :value="bank.bin" :key="bank.bin">
                        {{ bank.name }}
                    </option>
                </select>
            </div>
            <div class="vp-field-group">
                <label for="txtAccountNumber" class="vp-field-label">Account no</label>
                <input id="txtAccountNumber" type="text" v-model="accountNo" placeholder="Enter account number"
                    class="vp-field">
            </div>
            <div class="vp-field-group">
                <label for="txtAccountName" class="vp-field-label">Account Name</label>
                <input id="txtAccountName" type="text" v-model="accountName" placeholder="Enter account name"
                    class="vp-field">
            </div>
            <div class="vp-field-group">
                <label for="txtAmount" class="vp-field-label">Amount</label>
                <input id="txtAmount" type="text" v-model="amount" placeholder="Enter amount" class="vp-field">
            </div>
            <div class="vp-field-group">
                <label for="txtDescription" class="vp-field-label">Description</label>
                <input id="txtDescription" type="text" v-model="description" placeholder="Enter amount" class="vp-field">
            </div>
            <div class="vp-field-group">
                <input type="checkbox" id="vehicle3" v-model="displayInfor" name="vehicle3" value="Boat">
                <label for="vehicle3">Hiển thị thông tin tài khoản</label>
            </div>
            <div class="vp-field-button">
                <button class="vp-button medium brand" @click="createQRCode">Create QR Code</button>
            </div>
        </div>
        <div class="qroutput">
            <div ref="qrview" class="qrview">
                <div style="margin: 0; padding: 0;"><canvas id="canvas" style="width:600px;height:600px;"></canvas></div>
            </div>
            <hr />
            <div class="container">
                <h6>Select a frame</h6>
                <div class="row">
                    <div class="thumbnail" style="background-color: white; width: 40px;" @click="selectNoFrame" />
                    <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                    <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                    <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                    <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                    <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                    <input type="file" accept="image/*" @change="onFileChange" title="abc" class="thumbnail">
                </div>
                <div class="vp-field-button">
                    <button class="vp-button medium brand" @click="saveImage">Save QR Code</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.row::after {
    content: "";
    clear: both;
    display: block;
}

.qrinput {
    width: 100%;
    float: left;
    box-sizing: border-box;
}

.qroutput {
    width: 100%;
    float: left;
    box-sizing: border-box;
    background-color: var(--vp-sidebar-bg-color);
}

@media (min-width: 960px) {
    .qrinput {
        width: 450px;
        padding-right: 32px;
    }

    .qroutput {
        width: calc(100% - 482px);
        margin: 10px 32px 32px 0;
        border-radius: 12px;
    }
}

.vp-field-button {
    margin: 20px 0;
}

.thumbnail {
    border: 4px solid var(--vp-c-border);
    border-radius: 6px;
    padding: 0;
    margin: 5px;
    height: 40px;
    float: left;
}

.thumbnail:hover {
    box-shadow: 0 0 2px 1px var(--vp-c-brand);
}

.thumbnail.active {
    box-shadow: 0 0 2px 2px var(--vp-c-brand);
}

.qrview {
    margin: 32px;
    padding: 0;
}

@media (min-width: 960px) {
    .qrview {
        margin: 24px;
        padding: 0;
    }
}
</style>