<script setup>
import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';

const qrview = ref(null);
let QRFrame = null;
let QRCode = null;

onMounted(() => {
    QRFrame = new fabric.Canvas("canvas");
    QRFrame.setWidth(qrview.value.clientWidth);
    QRFrame.setHeight(qrview.value.clientWidth);
    QRCode = new fabric.Image(document.getElementById("qrcode"), {});
    QRFrame.add(QRCode);
    QRFrame.renderAll();
})

function setQRCodeURL(url) {
    const left = QRCode.left
    const top = QRCode.top
    const width = QRCode.width * QRCode.scaleX;
    const height = QRCode.height * QRCode.scaleX;
    QRCode.setSrc(url, function (img) {
        QRCode = img;
        QRCode.left = left;
        QRCode.top = top;
        QRCode.scaleX = width / QRCode.width;
        QRCode.scaleY = height / QRCode.height;
        QRFrame.renderAll();
    }, {
      crossOrigin: 'anonymous'
    });
}

function saveImage() {
    const link = document.createElement('a')
    link.href = QRFrame.toDataURL('png')
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

function onChangeQRFrame(url) {
    const frameWidth = qrview.value.clientWidth;
    const frameHeight = qrview.value.clientH;
    console.log(frameWidth);
    QRFrame.setWidth(frameWidth);
    QRFrame.setHeight(frameWidth);
    if (url == 'no-frame') {
        QRFrame.setBackgroundImage(null);
        QRFrame.setBackgroundColor(null);
        QRCode.top = 0;
        QRCode.left = 0;
        QRCode.scaleX = frameWidth / QRCode.width;
        QRCode.scaleY = frameWidth / QRCode.height;
        QRFrame.renderAll();
    }
    QRFrame.renderAll();
    // imgInstance.setSrc('https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/800px-Flag_of_England.svg.png', function(img) {
    //     img.left = 0;
    //     fabricCanvas.renderAll();
    // });
    //onQRFrameSizeChange();
}

function onQRFrameSizeChange() {
    setQRCodeURL('https://img.vietqr.io/image/970418-12345646546546-xyzWuLb.jpg');
    // if (QRFrame.getWidth() !== wrapper.value.clientWidth) {
    //     var frameHeight = QRFrame.getHeight() *  wrapper.value.clientWidth / QRFrame.getWidth();
    //     var frameWidth = wrapper.value.clientWidth;
    //     QRFrame.setWidth(frameWidth);
    //     QRFrame.setHeight(frameHeight);
    // }
}
function onQRFrameSizeChange1() {
    onChangeQRFrame('no-frame');
    // if (QRFrame.getWidth() !== wrapper.value.clientWidth) {
    //     var frameHeight = QRFrame.getHeight() *  wrapper.value.clientWidth / QRFrame.getWidth();
    //     var frameWidth = wrapper.value.clientWidth;
    //     QRFrame.setWidth(frameWidth);
    //     QRFrame.setHeight(frameHeight);
    // }
}

function onFileChange(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
            var data = f.target.result;
            fabric.Image.fromURL(data, function (img) {
                // add background image
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    scaleX: canvas.width / img.width,
                    scaleY: canvas.height / img.height
                });
            });
        };
        reader.readAsDataURL(file);
    }
}

function addQRCodeToCanvas() {
    fabric.Image.fromURL("https://img.vietqr.io/image/970415-113366668888-compact.png", function (img) {
        canvas.add(img);
    });
}

function setFrame(frame) {
    fabric.Image.fromURL("https://img.vietqr.io/image/970415-113366668888-compact.png", function (img) {
        canvas.add(img);
    });
}

</script>

<template>
    <div class="qr-editor">
        <div ref="qrview" class="qrview">
            <div style="margin: 0; padding: 0;"><canvas id="canvas"></canvas></div>
        </div>
        <hr />
        <div ref="qrtool" class="qrtool">
            <h6>Select frame</h6>
            <div class="frame-container">
                <img src="/noframe.png" alt="No Frame" class="thumbnail active" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <input type="file" accept="image/*" @change="onFileChange" title="abc" class="thumbnail">
            </div>

<input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
<label for="vehicle3"> I have a boat</label><br>

            <h6>Thông tin hiểnn thị</h6>
            <div class="frame-container">
                <img src="/noframe.png" alt="No Frame" class="thumbnail active" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <img src="/noframe.png" alt="No Frame" class="thumbnail" />
                <input type="file" accept="image/*" @change="onFileChange" title="abc" class="thumbnail">
            </div>
            <div class="download-container">
                <button class="VPButton medium brand" @click="saveImage">Save QR Code</button>
            </div>
        </div>
        <button type="button" @click="onQRFrameSizeChange">Click Me!</button>
        <button type="button" @click="onQRFrameSizeChange1">Click Me!</button>
        <img id="qrcode" src="/qr-icon.png" alt="default qrcode" />
    </div>
</template>

<style scoped>

.frame-container {
    display: flex;
}

input.thumbnail {
    border: 4px solid var(--vp-c-border);
    border-radius: 6px;
    padding: 0;
    margin: 5px;
    height: 40px;
    display: inline;
}

img.thumbnail {
    border: 4px solid var(--vp-c-border);
    border-radius: 6px;
    padding: 0;
    margin: 5px;
    height: 40px;
    display: inline;
}

.thumbnail:hover {
    box-shadow: 0 0 2px 1px var(--vp-c-brand);
}

.thumbnail.active {
    box-shadow: 0 0 2px 2px var(--vp-c-brand);
}

.download-container {
    display: flex;
}


.qr-editor {}

.wrapper {
    overflow: auto;
}
</style>
