---
layout: page
---
<script setup>
import { ref, onMounted } from 'vue';
import SelectQRType from './components/SelectQRType.vue'
import InputQRDataPayment from './components/InputQRDataPayment.vue'

const step = ref(1);
const qrType = ref('');

function selectedQrType(type) {
    step.value = 2;
    qrType.value = type;
    console.log(type);
}

</script>

# Generate QR Code
Generate qr code description

---------------------------------------------------------------------
<h2>Select a type <a v-if="step > 1" class="w3-right w3-large vp-link" href="#" @click="step = 1;">Edit</a></h2>
<div :class="{'w3-hide': step != 1}">
<SelectQRType @selectedQrType="selectedQrType"/>
</div>

---------------------------------------------------------------------
<h2 :class="{'w3-disabled': step < 2}">Input data <a v-if="step > 2" href="#" class="w3-right w3-large vp-link" @click="step = 2">Edit</a></h2>
<div :class="{'w3-hide': step != 2}">
<InputQRDataPayment v-if="qrType=='payment'"/>
</div>

---------------------------------------------------------------------
<h2 :class="{'w3-disabled': step < 3}">Customize and Download</h2>
<div :class="{'w3-hide': step != 3}">
adsf
</div>

---------------------------------------------------------------------