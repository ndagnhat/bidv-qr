<script setup>
import { ref, onMounted, watch } from 'vue';
import { fabric } from 'fabric';
import styleQRCodeDatas from '../qrstyles/styles.js'

const props = defineProps(['qrdata', 'bankName', 'accountNo', 'accountName']);

const listStyles = ref({});
const qrview = ref(null);
const styleIndex = ref(null);
const styleCanvas = ref({});
const styleQRCode = ref({});
const styleBankTitle = ref({});
const styleAccountNoTitle = ref({});
const styleAccountNameTitle = ref({});

let fonts = ['Chinese Quotes', 'Inter var', 'Inter', 'Segoe UI'];
let canvas = null;
let canvasQRCode = null;
let canvasBankTitle = null;
let canvasAccountNoTitle = null;
let canvasAccountNameTitle = null;

onMounted(() => {
    listStyles.value = styleQRCodeDatas;
    let qrviewWidth = qrview.value.clientWidth;
    canvas = new fabric.Canvas("canvas", { backgroundColor: "#ffffff", width: 1000, height: 1000 });
    canvas.setZoom(qrviewWidth / 1000);
    canvas.setWidth(qrviewWidth);
    canvas.setHeight(qrviewWidth);
    canvasBankTitle = new fabric.Text(props.bankName);
    canvasAccountNoTitle = new fabric.Text(props.accountNo);
    canvasAccountNameTitle = new fabric.Text(props.accountName);
    canvas.add(canvasBankTitle);
    canvas.add(canvasAccountNoTitle);
    canvas.add(canvasAccountNameTitle);
    fabric.Image.fromURL(props.qrdata, function (img) {
        canvasQRCode = img;
        canvas.add(canvasQRCode);
        canvas.renderAll();
        setStyle(0);
    }, {
        crossOrigin: 'anonymous'
    });
});

function setStyle(index) {
    let style = listStyles.value[index];
    styleCanvas.value = style.frame;
    styleQRCode.value = style.qrcode;
    styleBankTitle.value = style.bankTitle;
    styleAccountNoTitle.value = style.accountNoTitle;
    styleAccountNameTitle.value = style.accountNameTitle;
    styleIndex.value = index;
}

watch(styleCanvas, (style) => {
    let canvasWidth = style.width;
    let canvasHeight = style.height;
    if (style.background != null) {
        if (style.background.startsWith("http") || style.background.startsWith("data")) {
            fabric.Image.fromURL(style.background, function (img) {
                if (style.width == null || style.height == null) {
                    canvasWidth = img.width;
                    canvasHeight = img.height;
                }
                canvas.setBackgroundImage(img);
                setFrameSize(canvasWidth, canvasHeight);
            }, {
                crossOrigin: 'anonymous'
            });
        } else {
            canvas.setBackgroundImage(null);
            canvas.setBackgroundColor(style.background);
            if (style.width == null || style.height == null) {
                canvasWidth = 1000;
                canvasHeight = 1200;
            }
            setFrameSize(canvasWidth, canvasHeight);
        }
    }
});

function setFrameSize(canvasWidth, canvasHeight) {
    let canvasZoom = qrview.value.clientWidth / canvasWidth;
    let canvasZoomWidth = canvasWidth * canvasZoom;
    let canvasZoomHeight = canvasHeight * canvasZoom;
    canvas.setZoom(canvasZoom);
    canvas.setWidth(canvasZoomWidth);
    canvas.setHeight(canvasZoomHeight);
    canvas.renderAll();
}

watch(styleQRCode, (style) => {
    if (canvasQRCode != null) {
        if (style.top != null) {
            canvasQRCode.top = style.top;
        }
        if (style.left != null) {
            canvasQRCode.left = style.left;
        }
        if (style.width != null) {
            canvasQRCode.scaleX = style.width / canvasQRCode.width;
        }
        if (style.height != null) {
            canvasQRCode.scaleY = style.height / canvasQRCode.height;
        }
        canvasQRCode.visible = true;
    }
    canvasQRCode.setCoords();
    canvas.renderAll();
});

watch(styleBankTitle, (style) => {
    if (style.top != null) {
        canvasBankTitle.top = style.top;
    }
    if (style.left != null) {
        canvasBankTitle.left = style.left;
    }
    if (style.color != null) {
        canvasBankTitle.fill = style.color;
    }
    if (style.fontSize != null) {
        canvasBankTitle.fontSize = style.fontSize;
    }
    if (style.fontFamily != null) {
        canvasBankTitle.fontFamily = style.fontFamily;
    }
    if (style.visible != null) {
        canvasBankTitle.visible = style.visible;
    }
    canvasBankTitle.setCoords();
    canvas.renderAll();
});

watch(styleAccountNoTitle, (style) => {
    if (style.top != null) {
        canvasAccountNoTitle.top = style.top;
    }
    if (style.left != null) {
        canvasAccountNoTitle.left = style.left;
    }
    if (style.color != null) {
        canvasAccountNoTitle.fill = style.color;
    }
    if (style.fontSize != null) {
        canvasAccountNoTitle.fontSize = style.fontSize;
    }
    if (style.fontFamily != null) {
        canvasAccountNoTitle.fontFamily = style.fontFamily;
    }
    if (style.visible != null) {
        canvasAccountNoTitle.visible = style.visible;
    }
    canvasAccountNoTitle.setCoords();
    canvas.renderAll();
});

watch(styleAccountNameTitle, (style) => {
    if (style.top != null) {
        canvasAccountNameTitle.top = style.top;
    }
    if (style.left != null) {
        canvasAccountNameTitle.left = style.left;
    }
    if (style.color != null) {
        canvasAccountNameTitle.fill = style.color;
    }
    if (style.fontSize != null) {
        canvasAccountNameTitle.fontSize = style.fontSize;
    }
    if (style.fontFamily != null) {
        canvasAccountNameTitle.fontFamily = style.fontFamily;
    }
    canvasAccountNameTitle.setCoords();
    canvas.renderAll();
});

function onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;
            styleCanvas.value = {background: data};
            styleIndex.value = -1;
        };
        reader.readAsDataURL(file);
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
        <div class="qrtool">
            <h6>Select a frame</h6>
                <div class="row">
                    <template v-for="(style, index) in styleQRCodeDatas">
                        <img v-if="style.frame.background.startsWith('http')" :src="style.frame.background" :class="{ 'active': styleIndex == index}" alt="Frame 1" class="thumbnail" @click="setStyle(index)">
                        <div v-else :style="{ 'background-color': style.frame.background }" :class="{ 'active': styleIndex == index}" class="thumbnail" style="width: 40px;" @click="setStyle(index)"/>
                    </template>
                    <input type="file" accept="image/*" @change="onFileChange" title="abc" class="thumbnail">
                </div>
            <h6>Bank name title</h6>
            <input id="ckbAccept" class="w3-check" type="checkbox">
            <label class="accept-label" for="ckbAccept"> Visible</label>
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

.row::after {
    content: "";
    clear: both;
    display: block;
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
</style>