<script setup>
const props = defineProps(['qrdata', 'bankName', 'accountNo', 'accountName']);

import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';

const qrview = ref(null);
const selFrame = ref("noframe");

var canvas = null;
var canvasQRCode = null;
var canvasBankTitle = null;
var canvasAccountNoTitle = null;
var canvasAccountNameTitle = null;


onMounted(() => {
    let qrviewWidth = qrview.value.clientWidth;
    canvas = new fabric.Canvas("canvas", { backgroundColor: "#ffffff", width: 1000, height: 1000 });
    canvas.setZoom(qrviewWidth / 1000);
    canvas.setWidth(qrviewWidth);
    canvas.setHeight(qrviewWidth);

    fabric.Image.fromURL(props.qrdata, function (img) {
        canvasQRCode = img;
        canvasBankTitle = new fabric.Text(props.bankName);
        canvasAccountNoTitle = new fabric.Text(props.accountNo);
        canvasAccountNameTitle = new fabric.Text(props.accountName);
        canvas.add(canvasQRCode);
        canvas.add(canvasBankTitle);
        canvas.add(canvasAccountNoTitle);
        canvas.add(canvasAccountNameTitle);
        canvas.renderAll();
    }, {
        crossOrigin: 'anonymous'
    });
});

function selectFrame1() {
    setFrame(null, 1000, 1200);
    styleQRCode({top: 100, left: 100, width: 800, height: 800});
    styleBankTitle({top: 950, left: 100});
    styleAccountNoTitle({top: 1070, left: 100});
    styleAccountNameTitle({top: 1120, left: 100});
    canvas.renderAll();
}

function setFrame(frame, canvasWidth, canvasHeight) {   
    if(frame == null) {
        canvas.setBackgroundImage(null);
        canvas.setBackgroundColor("#ffffff");
    } else {
        canvas.setBackgroundImage(frame);
    }

    let canvasZoom = qrview.value.clientWidth / canvasWidth;
    let canvasZoomWidth = canvasWidth * canvasZoom;
    let canvasZoomHeight = canvasHeight * canvasZoom;

    canvas.setZoom(canvasZoom);
    canvas.setWidth(canvasZoomWidth);
    canvas.setHeight(canvasZoomHeight);
}

function styleQRCode(style) {
    if(style.top != null) {
        canvasQRCode.top = style.top;
    }
    if(style.left != null) {
        canvasQRCode.left = style.left;
    }
    if(style.width != null) {
        canvasQRCode.scaleX = style.width / canvasQRCode.width;
    }
    if(style.height != null) {
        canvasQRCode.scaleY = style.height / canvasQRCode.height;
    }
}

function styleBankTitle(style) {
    if(style.top != null) {
        canvasBankTitle.top = style.top;
    }
    if(style.left != null) {
        canvasBankTitle.left = style.left;
    }
}

function styleAccountNoTitle(style) {
    if(style.top != null) {
        canvasAccountNoTitle.top = style.top;
    }
    if(style.left != null) {
        canvasAccountNoTitle.left = style.left;
    }
}

function styleAccountNameTitle(style) {
    if(style.top != null) {
        canvasAccountNameTitle.top = style.top;
    }
    if(style.left != null) {
        canvasAccountNameTitle.left = style.left;
    }
}

function downloadAsFile() {
    const link = document.createElement('a')
    link.href = canvas.toDataURL({ format: 'pgn', multiplier: (1 / canvas.getZoom()) })
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

</script>

<template>
    <div class="container">
        <div class="w3-container qrtool">
            <h6>Select a frame</h6>
            <button class="w3-btn w3-round-xxlarge w3-brand" @click="selectFrame1">TestFrame</button>
            <button class="w3-btn w3-round-xxlarge w3-brand" @click="downloadAsFile">Download</button>
        </div>
        <div class="qrview w3-round-xlarge">
            <div ref="qrview">
                <div style="margin: 0; padding: 0;"><canvas id="canvas"></canvas></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 3fr 7fr;
    padding: 10px 16px;
    gap: 16px;
}

.qrview {
    overflow: auto;
    padding: 24px;
    background-color: var(--vp-sidebar-bg-color);
}

.qrtool {
    margin: 24px;
}
</style>