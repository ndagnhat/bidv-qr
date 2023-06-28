---
layout: page
---
<script setup>
import { ref, onMounted } from 'vue';
import SelectQRType from './components/SelectQRType.vue'
import InputQRDataPayment from './components/InputQRDataPayment.vue'
import QREditor from './components/QREditor.vue'

const step = ref(1);
const qrData = ref({});

function selectedQrType(type) {
    qrData.value.type = type;
    step.value = 2;
}

function createQRData(data) {
    qrData.value = data;
    step.value = 3;
}

</script>

# Generate QR Code
Generate qr code description

---------------------------------------------------------------------
<h2>Select a type <a v-if="step != 1" class="w3-right w3-medium vp-link" href="#" @click="step = 1">Edit</a></h2>
<div v-if="step == 1">
    <SelectQRType @selectedQrType="selectedQrType"/>
</div>

---------------------------------------------------------------------
<h2 :class="{'w3-disabled': step < 2}">Input data <a v-if="step > 2" href="#" class="w3-right w3-medium vp-link" @click="step = 2">Edit</a></h2>
<div v-if="step == 2">
    <InputQRDataPayment v-if="qrData.type=='payment'" @createQRData="createQRData"/>
</div>

---------------------------------------------------------------------
<h2 :class="{'w3-disabled': step < 3}">Customize and Download</h2>
<div v-if="step == 3">
    <QREditor v-if="qrData.type =='payment'" :qrdata="qrData.qr" :bankIcon="qrData.bankIcon" :bankName="qrData.bankName" :accountNo="qrData.accountNo" :accountName="qrData.accountName" />
</div>

---------------------------------------------------------------------