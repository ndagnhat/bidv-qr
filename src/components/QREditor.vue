<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { fabric } from 'fabric';
import listStyleDatas from '../qrstyles/styles.js'

const props = defineProps(['qrdata', 'bankName', 'accountNo', 'accountName']);
const style = reactive({
    id: 0,
    frame: {
        background: null,
        width: 1000,
        height: 1000,
    },
    qrcode: {
        visble: false,
        editable: false,
        top: 0,
        left: 0,
        width: 1000,
        height: 1000
    },
    bank: {},
    accountNo: {},
    accountName: {}
});

const listStyles = ref({});
const qrview = ref(null);
const styleIndex = ref(true);

let fonts = ['Chinese Quotes', 'Inter var', 'Inter', 'Segoe UI'];
let canvas = null;
let canvasQRCode = null;
let canvasBankTitle = null;
let canvasAccountNoTitle = null;
let canvasAccountNameTitle = null;

onMounted(() => {
    listStyles.value = listStyleDatas;
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
        canvasQRCode.visible = false;
        canvasBankTitle.visible = false;
        canvasAccountNoTitle.visible = false;
        canvasAccountNameTitle.visible = false;
        canvas.add(canvasQRCode);
        canvas.add(canvasBankTitle);
        canvas.add(canvasAccountNoTitle);
        canvas.add(canvasAccountNameTitle);
        canvas.renderAll();
        setStyle(1);
    }, {
        crossOrigin: 'anonymous'
    });
});

function setStyle(styleid) {
    const styleData = listStyleDatas.find((s) => s.id == styleid);
    console.log(1);
    console.log(style);
    style.qrcode.visble.value = !style.qrcode.visble.value;
    styleIndex.value = !styleIndex.value;
    //style.value = styleData;

    // let style = listStyles.value[index];
    // styleCanvas.value = style.frame;
    // styleQRCode.value = style.qrcode;
    // styleBankTitle.value = style.bankTitle;
    // styleAccountNoTitle.value = style.accountNoTitle;
    // styleAccountNameTitle.value = style.accountNameTitle;
    // styleIndex.value = index;
}

watch(style, (newStyle) => {
    // canvas style
    let s = newStyle;
    if (s.frame.background == null) {
        canvas.setBackgroundImage(null);
        canvas.setBackgroundColor("null");
        if (s.frame.width != null && s.frame.height != null) {
            let canvasZoom = qrview.value.clientWidth / canvasWidth;
            let canvasZoomWidth = s.frame.height * canvasZoom;
            let canvasZoomHeight = s.frame.height * canvasZoom;
            canvas.setZoom(canvasZoom);
            canvas.setWidth(canvasZoomWidth);
            canvas.setHeight(canvasZoomHeight);
        }
    } else {
        let canvasWidth = s.frame.width;
        let canvasHeight = s.frame.height;
        if (s.frame.background.startsWith("http") || s.frame.background.startsWith("data")) {
            fabric.Image.fromURL(s.frame.background, function (img) {
                if (canvasWidth == null || canvasHeight == null) {
                    canvasWidth = img.width;
                    canvasHeight = img.height;
                }
                canvas.setBackgroundImage(img);
                let canvasZoom = qrview.value.clientWidth / canvasWidth;
                let canvasZoomWidth = canvasWidth * canvasZoom;
                let canvasZoomHeight = canvasHeight * canvasZoom;
                canvas.setZoom(canvasZoom);
                canvas.setWidth(canvasZoomWidth);
                canvas.setHeight(canvasZoomHeight);
                canvas.renderAll();
            }, {
                crossOrigin: 'anonymous'
            });
        } else {
            canvas.setBackgroundImage(null);
            canvas.setBackgroundColor(s.frame.background);
            if (canvasWidth == null || canvasHeight == null) {
                canvasWidth = 1000;
                canvasHeight = 1200;
            }
            let canvasZoom = qrview.value.clientWidth / canvasWidth;
            let canvasZoomWidth = canvasWidth * canvasZoom;
            let canvasZoomHeight = canvasHeight * canvasZoom;
            canvas.setZoom(canvasZoom);
            canvas.setWidth(canvasZoomWidth);
            canvas.setHeight(canvasZoomHeight);
        }
    }

    // qrcode style
    if (canvasQRCode != null) {
        if (s.qrcode.visible != null) {
            canvasQRCode.visible = s.qrcode.visible;
        }
        if (s.qrcode.top != null) {
            canvasQRCode.top = s.qrcode.top;
            canvasQRCode.setCoords();
        }
        if (s.qrcode.left != null) {
            canvasQRCode.left = s.qrcode.left;
            canvasQRCode.setCoords();
        }
        if (s.qrcode.width != null) {
            canvasQRCode.scaleX = s.qrcode.width / canvasQRCode.width;
        }
        if (s.qrcode.height != null) {
            canvasQRCode.scaleY = s.qrcode.height / canvasQRCode.height;
        }
        canvasQRCode.visible = true;
    }

    // bank title style
    if (canvasBankTitle != null) {
        if (s.bank.visible != null) {
            canvasBankTitle.visible = s.bank.visible;
        }
        if (s.bank.top != null) {
            canvasBankTitle.top = s.bank.top;
            canvasBankTitle.setCoords();
        }
        if (s.bank.left != null) {
            canvasBankTitle.left = s.bank.left;
            canvasBankTitle.setCoords();
        }
        if (s.bank.color != null) {
            canvasBankTitle.fill = s.bank.color;
        }
        if (s.bank.fontSize != null) {
            canvasBankTitle.fontSize = s.bank.fontSize;
        }
        if (s.bank.fontFamily != null) {
            canvasBankTitle.fontFamily = s.bank.fontFamily;
        }
        if (s.bank.visible != null) {
            canvasBankTitle.visible = s.bank.visible;
        }
    }

    // account no title style
    if (canvasAccountNoTitle != null) {
        if (s.accountNo.visible != null) {
            canvasAccountNoTitle.visible = s.accountNo.visible;
        }
        if (s.accountNo.top != null) {
            canvasAccountNoTitle.top = s.accountNo.top;
            canvasAccountNoTitle.setCoords();
        }
        if (s.accountNo.left != null) {
            canvasAccountNoTitle.left = s.accountNo.left;
            canvasAccountNoTitle.setCoords();
        }
        if (s.accountNo.color != null) {
            canvasAccountNoTitle.fill = s.accountNo.color;
        }
        if (s.accountNo.fontSize != null) {
            canvasAccountNoTitle.fontSize = s.accountNo.fontSize;
        }
        if (s.accountNo.fontFamily != null) {
            canvasAccountNoTitle.fontFamily = s.accountNo.fontFamily;
        }
        if (s.accountNo.visible != null) {
            canvasAccountNoTitle.visible = s.accountNo.visible;
        }
    }

    // account name title style
    if (canvasAccountNameTitle != null) {
        if (s.accountName.visible != null) {
            canvasAccountNameTitle.visible = s.accountName.visible;
        }
        if (s.accountName.top != null) {
            canvasAccountNameTitle.top = s.accountName.top;
            canvasAccountNameTitle.setCoords();
        }
        if (s.accountName.left != null) {
            canvasAccountNameTitle.left = s.accountName.left;
            canvasAccountNameTitle.setCoords();
        }
        if (s.accountName.color != null) {
            canvasAccountNameTitle.fill = s.accountName.color;
        }
        if (s.accountName.fontSize != null) {
            canvasAccountNameTitle.fontSize = s.accountName.fontSize;
        }
        if (s.accountName.fontFamily != null) {
            canvasAccountNameTitle.fontFamily = s.accountName.fontFamily;
        }
    }
    canvas.renderAll();
});

function onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;
            // styleCanvas.value = { background: data };
            // styleIndex.value = -1;
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
                <template v-for="s in listStyleDatas">
                    <img v-if="s.frame.background.startsWith('http') || s.frame.background.startsWith('data')" :src="s.frame.background"
                        :class="{ 'active': s.id == style.id }" alt="Frame 1" class="thumbnail" @click="setStyle(s.id)">
                    <div v-else :style="{ 'background-color': s.frame.background }"
                        :class="{ 'active': s.id == style.id }" class="thumbnail" style="width: 40px;"
                        @click="setStyle(s.id)" />
                </template>
                <input type="file" accept="image/*" @change="onFileChange" title="abc" class="thumbnail">
            </div>
            <h6>Bank name title</h6>
            <input id="ckbBankVisible" class="w3-check" type="checkbox" v-model="style.qrcode.visble">
            <label class="accept-label" for="ckbBankVisible"> {{ style.qrcode.visble }}</label>
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