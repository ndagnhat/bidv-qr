<script setup>
import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';

const wrapper = ref(null);
let QRFrame = null;
let QRCode = null;

onMounted(() => {
    QRFrame = new fabric.Canvas("canvas");
    QRFrame.setWidth(wrapper.value.clientWidth);
    QRFrame.setHeight(wrapper.value.clientWidth);
    QRCode = new fabric.Image(document.getElementById("qrcode"), {});
    QRFrame.add(QRCode);
    QRFrame.renderAll();
})

function setQRCodeURL(url) {
    const left = QRCode.left
    const top = QRCode.top
    const width = QRCode.width * QRCode.scaleX;
    const height = QRCode.height * QRCode.scaleX;
    QRCode.setSrc(url, function(img) {
        QRCode = img;
        QRCode.left = left;
        QRCode.top = top;
        QRCode.scaleX = width / QRCode.width;
        QRCode.scaleY = height / QRCode.height;
        QRFrame.renderAll();
    });
}

function onChangeQRFrame(url) {
    const frameWidth = wrapper.value.clientWidth;
    const frameHeight = wrapper.value.clientH;
    console.log(frameWidth);
    QRFrame.setWidth(frameWidth);
    QRFrame.setHeight(frameWidth);
    if (url == 'no-frame') {
        QRFrame.setBackgroundImage(null);
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
    <div ref="wrapper" class="wrapper">
        <canvas id="canvas"></canvas>
    </div>
    <input type="file" accept="image/*" @change="onFileChange" title="abc">
    <button type="button" @click="onQRFrameSizeChange">Click Me!</button>
    <button type="button" @click="onQRFrameSizeChange1">Click Me!</button>
    <img id="qrcode" src="../img/qrdefault.png" alt="default qrcode"/>
</template>

<style>
.wrapper {
    border: solid 1px var(--vp-c-gutter);
}
</style>
