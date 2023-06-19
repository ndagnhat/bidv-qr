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
const bankCode = ref('BIDV');
const accountNo = ref('');
const accountName = ref('');
const amount = ref('');
const description = ref('');
const displayInfor = ref(true);
const frame = ref("noframe");

onMounted(() => {
    QRFrame = new fabric.Canvas("canvas", { backgroundColor: "#ffffff", width: 1000, height: 1000 });
    let qrviewWidth = qrview.value.clientWidth;
    QRFrame.setZoom(qrviewWidth / 1000);
    QRFrame.setWidth(qrviewWidth);
    QRFrame.setHeight(qrviewWidth);
    QRBank = new fabric.Text('', {  });
    QRNumber = new fabric.Text('', {  });
    QRName = new fabric.Text('', {  });
    fabric.Image.fromURL(withBase("/qrdefault.png"), function (img) {
        QRCode = img;
        QRCode.left = 50;
        QRCode.top = 50;
        QRCode.scaleX = 900 / img.width;
        QRCode.scaleY = 900 / img.height;
        QRFrame.add(QRCode);
        QRFrame.add(QRBank);
        QRFrame.add(QRNumber);
        QRFrame.add(QRName);
        QRFrame.renderAll();
        selectNoFrame();
    });

    // load bank data
    fetch('https://api.vietqr.io/v2/banks')
        .then(response => response.json())
        .then(data => {
            if (data.code == '00') {
                listBanks.value = data.data;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function createQRCode() {
    let qrlink = "https://img.vietqr.io/image/" + bankCode.value + "-" + accountNo.value + "-xyzWuLb.png?amount=" + amount.value + "&addInfo=" + description.value + "&accountName=" + accountName.value;
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

        const bankName = listBanks.value.find(bank => bank.code = bankCode.value).name;
        QRBank.text = bankName;
        QRNumber.text = accountNo.value;
        QRName.text = accountName.value;
        QRFrame.renderAll();
    }, {
        crossOrigin: 'anonymous'
    });
}

function selectNoFrame() {
    frame.value = "noframe";
    QRFrame.setBackgroundImage(null);
    QRFrame.setBackgroundColor("#ffffff");

    const qrviewWidth = qrview.value.clientWidth;
    QRFrame.setZoom(qrviewWidth / 1000);
    QRFrame.setWidth(qrviewWidth);
    QRFrame.setHeight(qrviewWidth);

    QRCode.left = 200;
    QRCode.top = 100;
    QRCode.scaleX = 600 / QRCode.width;
    QRCode.scaleY = 600 / QRCode.height;

    QRBank.top = 750;
    QRBank.left = 100;
    QRNumber.top = 825;
    QRNumber.left = 100;
    QRName.top = 900;
    QRName.left = 100;
    QRFrame.renderAll();
}

function selectFrame1() {
    frame.value = "noframe";
    QRFrame.setBackgroundImage(null);
    QRFrame.setBackgroundColor("#ffffff");

    const qrviewWidth = qrview.value.clientWidth;
    QRFrame.setZoom(qrviewWidth / 1000);
    QRFrame.setWidth(qrviewWidth);
    QRFrame.setHeight(qrviewWidth);

    QRCode.left = 200;
    QRCode.top = 100;
    QRCode.scaleX = 600 / QRCode.width;
    QRCode.scaleY = 600 / QRCode.height;

    QRBank.top = 750;
    QRBank.viewportCenterH();
    QRNumber.top = 825;
    QRNumber.viewportCenterH();
    QRName.top = 900;
    QRName.viewportCenterH();

    QRFrame.renderAll();
}

function downloadAsFile() {
    const link = document.createElement('a')
    link.href = QRFrame.toDataURL('png')
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

</script>

<template>
    <div class="row">
        <div class="container qrinput">
            <h1>Input Payment Infor</h1>
            <div class="vp-field-group">
                <label for="selBank" class="vp-field-label">Choose a bank</label>
                <select id="selBank" v-model="bankCode" name="bankCode" class="vp-field">
                    <option v-for="bank in listBanks" :value="bank.code">
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
                    <div class="thumbnail" style="background-color: white; width: 40px;"
                        :class="{ 'active': frame == 'noframe' }" @click="selectNoFrame" />
                    <img src="/frame1.png" alt="Frame 1" class="thumbnail" :class="{ 'active': frame == 'frame1' }"
                        @click="selectFrame1" />
                    <input type="file" accept="image/*" @change="onFileChange" title="abc" class="thumbnail">
                </div>
                <div class="vp-field-button">
                    <button class="vp-button medium brand" @click="downloadAsFile">Save QR Code</button>
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