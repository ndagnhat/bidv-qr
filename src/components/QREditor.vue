<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { fabric } from 'fabric';
import listCanvasJson from '../qrstyles/styles.js'
import { withBase } from 'vitepress'

const props = defineProps(['qrdata', 'bankIcon', 'bankName', 'accountNo', 'accountName']);

let canvas = null;
const frameSelected = ref(null);

const visibleBankIcon = ref(null);
const visibleBankTitle = ref(null);
const visibleAccountNoTitle = ref(null);
const visibleAccountNameTitle = ref(null);

const selFormatType = ref("png");

onMounted(() => {
    canvas = new fabric.Canvas("canvas");
    loadCanvasFrame(0);
});

function loadCanvasFromJson(json) {
    let width = json.canvasWidth;
    let height = json.canvasHeight;
    if (width == null || height == null) {
        if (json.backgroundImage != null) {
            width = json.backgroundImage.width;
            height = json.backgroundImage.height;
        }
    }
    if (width == null || height == null) {
        width = 1000;
        height = 1200;
    }

    let displayWidth = document.getElementById('qrview').offsetWidth;
    let displayHeight = displayWidth / width * height;

    canvas.setZoom(displayWidth / width);
    canvas.setWidth(displayWidth);
    canvas.setHeight(displayHeight);
    canvas.loadFromJSON(json);
    canvas.renderAll();
}

function updateCanvasOjbect(objId, objProp, objValue) {
    let json = canvas.toDatalessJSON(["id", "canvasWidth", "canvasHeight", "selectable"]);
    let reload = false;
    for (var i = 0; i < json.objects.length; i++) {
        if (json.objects[i].id === objId) {
            if (json.objects[i][objProp] != objValue) {
                json.objects[i][objProp] = objValue;
                reload = true;
            }
            break;
        }
    }
    if (reload) {
        loadCanvasFromJson(json);
    }
}

function loadCanvasFrame(id) {
    let json = listCanvasJson.find((s) => s.id == id);
    for (var i = 0; i < json.objects.length; i++) {
        if (json.objects[i].id === "qrcode") {
            json.objects[i].src = props.qrdata ?? "";
        }
        if (json.objects[i].id === "bankIcon") {
            json.objects[i].src = props.bankIcon ?? "";
        }
        if (json.objects[i].id === "bankName") {
            json.objects[i].text = props.bankName ?? "";
        }
        if (json.objects[i].id === "accountNo") {
            json.objects[i].text = props.accountNo ?? "";
        }
        if (json.objects[i].id === "accountName") {
            json.objects[i].text = props.accountName ?? "";
        }
    }

    for (var i = 0; i < json.objects.length; i++) {
        if (json.objects[i].id === "bankIcon") {
            if (json.objects[i].visible == null) {
                json.objects[i].visible = true;
            }
            if (visibleBankIcon.value != json.objects[i].visible) {
                visibleBankIcon.value = json.objects[i].visible;
            }
            break;
        }
        if (i == json.objects.length - 1) {
            if (visibleBankIcon.value != null) {
                visibleBankIcon.value = null;
            }
        }
    }
    for (var i = 0; i < json.objects.length; i++) {
        if (json.objects[i].id === "bankName") {
            if (json.objects[i].visible == null) {
                json.objects[i].visible = true;
            }
            if (visibleBankTitle.value != json.objects[i].visible) {
                visibleBankTitle.value = json.objects[i].visible;
            }
            break;
        }
        if (i == json.objects.length - 1) {
            if (visibleBankTitle.value != null) {
                visibleBankTitle.value = null;
            }
        }
    }
    for (var i = 0; i < json.objects.length; i++) {
        if (json.objects[i].id === "accountNo") {
            if (json.objects[i].visible == null) {
                json.objects[i].visible = true;
            }
            if (visibleAccountNoTitle.value != json.objects[i].visible) {
                visibleAccountNoTitle.value = json.objects[i].visible;
            }
            break;
        }
        if (i == json.objects.length - 1) {
            if (visibleAccountNoTitle.value != null) {
                visibleAccountNoTitle.value = null;
            }
        }
    }
    for (var i = 0; i < json.objects.length; i++) {
        if (json.objects[i].id === "accountName") {
            if (json.objects[i].visible == null) {
                json.objects[i].visible = true;
            }
            if (visibleAccountNameTitle.value != json.objects[i].visible) {
                visibleAccountNameTitle.value = json.objects[i].visible;
            }
            break;
        }
        if (i == json.objects.length - 1) {
            if (visibleAccountNameTitle.value != null) {
                visibleAccountNameTitle.value = null;
            }
        }
    }
    loadCanvasFromJson(json);
    frameSelected.value = id;
}

watch(visibleBankTitle, (isVisible) => {
    updateCanvasOjbect("bankName", "visible", isVisible);
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
    if (selFormatType.value == 'json') {
        const link = document.createElement('a')
        link.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(canvas.toDatalessJSON(["id", "canvasWidth", "canvasHeight", "selectable"])));
        link.download = 'style.json';
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    } else {
        const link = document.createElement('a')
        link.href = canvas.toDataURL({ format: selFormatType.value, multiplier: (1 / canvas.getZoom()) })
        link.download = 'qrcode.' + selFormatType.value;
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

async function shareImage() {
    const response = await fetch(canvas.toDataURL({ format: 'png', multiplier: (1 / canvas.getZoom()) }));
    const blob = await response.blob();
    const filesArray = [
        new File(
            [blob],
            'meme.jpg',
            {
                type: "image/jpeg",
                lastModified: new Date().getTime()
            }
        )
    ];
    const shareData = {
        files: filesArray,
    };
    navigator.share(shareData);
}

</script>

<template>
    <div class="container">
        <div class="qrtool">
            <h3>Chọn 1 mẫu</h3>
            <div class="row">
                <template v-for="data in listCanvasJson">
                    <img v-if="data.backgroundImage != null" :src="data.backgroundImage.src"
                        :class="{ 'active': data.id == frameSelected }" alt="Frame 1" class="thumbnail"
                        @click="loadCanvasFrame(data.id)">
                    <div v-else :style="{ 'background-color': data.background }"
                        :class="{ 'active': data.id == frameSelected }" class="thumbnail" style="width: 40px;"
                        @click="loadCanvasFrame(data.id)" />
                </template>
                <div class="add-frame-button"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
                        viewBox="0 0 24 24">
                        <path
                            d="M18.9,10.9h-6v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6h-6c-0.6,0-1,0.4-1,1s0.4,1,1,1h6v6c0,0.6,0.4,1,1,1s1-0.4,1-1v-6h6c0.6,0,1-0.4,1-1S19.5,10.9,18.9,10.9z" />
                    </svg></div>
                <input type="file" accept="image/*" @change="onFileChange" title="abc" class="w3-hide">
            </div>
            <div
                v-if="visibleBankIcon != null || isibleBankTitle != null || visibleAccountNoTitle != null || visibleAccountNameTitle != null">
                <h3>Ẩn/hiện thông tin tài khoản</h3>
                <div v-if="visibleBankIcon != null">
                    <input id="ckbBankVisible" class="w3-check" type="checkbox" v-model="visibleBankIcon">
                    <label class="accept-label" for="ckbBankVisible">Bank icon</label>
                </div>
                <div v-if="visibleBankTitle != null">
                    <input id="ckbBankVisible" class="w3-check" type="checkbox" v-model="visibleBankTitle">
                    <label class="accept-label" for="ckbBankVisible">Bank title</label>
                </div>
                <div v-if="visibleAccountNoTitle != null">
                    <input id="ckbBankVisible" class="w3-check" type="checkbox" v-model="visibleAccountNoTitle">
                    <label class="accept-label" for="ckbBankVisible">Account No title</label>
                </div>
                <div v-if="visibleAccountNameTitle != null">
                    <input id="ckbBankVisible" class="w3-check" type="checkbox" v-model="visibleAccountNameTitle">
                    <label class="accept-label" for="ckbBankVisible">Account Name title</label>
                </div>
            </div>
            <div>
                <h3>Định dạng file tải xuống</h3>
                <select name="filte-type" v-model="selFormatType" class="w3-input w3-border w3-hover-border w3-round-large">
                    <option value="png"> PNG </option>
                    <option value="jpg"> JPG </option>
                    <option value="svg"> SVG </option>
                    <option value="json"> JSON </option>
                </select>
            </div>
            <div style="margin-top: 32px;">
                <button class="w3-btn w3-large w3-round-xxlarge w3-brand" @click="downloadAsFile">Download</button>
                <button class="w3-btn w3-large w3-round-xxlarge w3-brand" @click="shareImage" style="margin-left: 15px;">Share</button>
            </div>
        </div>
        <div class="qrview w3-round-xlarge">
            <div id="qrview">
                <div style="margin: 0; padding: 0;"><canvas id="canvas"></canvas></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    padding: 10px 16px;
}

.qrtool {
    grid-column: 1;
    grid-row: 2;
}

.qrview {
    grid-column: 1;
    grid-row: 1;
    overflow: auto;
    padding: 24px;
    background-color: var(--vp-sidebar-bg-color);
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: 3fr 7fr;
        gap: 16px;
    }

    .qrtool {
        grid-column: 1;
        grid-row: 1;
    }

    .qrview {
        grid-column: 2;
        grid-row: 1;
    }
}


.canvas-container {
    border: 1px dotted #ccc;
    display: inline-block;
    vertical-align: top;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}



.row::after {
    content: "";
    clear: both;
    display: block;
}

.add-frame-button {
    fill: var(--vp-c-text-1);
    border-radius: 6px;
    padding: 0;
    margin: 5px;
    height: 40px;
    width: 40px;
    float: left;
}

.add-frame-button:hover {
    box-shadow: 0 0 2px 1px var(--vp-c-brand);
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