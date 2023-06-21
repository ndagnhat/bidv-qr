<script setup>
import { ref, onMounted } from 'vue';

const selBankId = ref('BIDV');
const txtAccountNo = ref('');
const txtAccountName = ref('');
const txtAmount = ref('');
const txtDescription = ref('');
const ckbAccept = ref(true);

const emit = defineEmits(['createQRData']);

const listBanks = ref([]);

function createQRData() {
    let qrdata = "https://img.vietqr.io/image/" + selBankId.value + "-" + txtAccountNo.value + "-xyzWuLb.png?amount=" + txtAmount.value + "&addInfo=" + txtDescription.value + "&accountName=" + txtAccountName.value;
    let bank = listBanks.value.find(bank => bank.code == selBankId.value);
    let data = {
        type: 'payment',
        qr: qrdata,
        bank: bank.name,
        accountNo: txtAccountNo.value,
        accountName: txtAccountName.value
    }
    emit('createQRData', data);
}

onMounted(() => {
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
</script>

<template>
    <div class="w3-cell-row">
        <div class="w3-container w3-cell w3-right-align w3-cell-middle" style="width:300px">
            <label class="label">Banks:</label>
        </div>
        <div class="w3-container w3-cell">
            <select name="banks" v-model="selBankId" class="w3-input w3-border w3-hover-border w3-round-large">
                <option v-for="bank in listBanks" :value="bank.code">
                    {{ bank.name }}
                </option>
            </select>
        </div>
    </div>

    <div class="w3-cell-row">
        <div class="w3-container w3-cell w3-right-align w3-cell-middle" style="width:300px">
            <label class="label">Account number:</label>
        </div>
        <div class="w3-container w3-cell">
            <input type="text" v-model="txtAccountNo" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
    </div>

    <div class="w3-cell-row">
        <div class="w3-container w3-cell w3-right-align w3-cell-middle" style="width:300px">
            <label class="label">Account Name:</label>
        </div>
        <div class="w3-container w3-cell">
            <input type="text" v-model="txtAccountName" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
    </div>

    <div class="w3-cell-row">
        <div class="w3-container w3-cell w3-right-align w3-cell-middle" style="width:300px">
            <label class="label">Amount:</label>
        </div>
        <div class="w3-container w3-cell">
            <input type="text" v-model="txtAmount" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
    </div>

    <div class="w3-cell-row">
        <div class="w3-container w3-cell w3-right-align w3-cell-middle" style="width:300px">
            <label class="label">Description:</label>
        </div>
        <div class="w3-container w3-cell">
            <input type="text" v-model="txtDescription" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
    </div>

    <div class="w3-cell-row">
        <div class="w3-container w3-cell w3-right-align w3-cell-middle" style="width:300px">
        </div>
        <div class="w3-container w3-cell w3-cell-middle">
            <input id="ckbAccept" class="w3-check" v-model="ckbAccept" type="checkbox">
            <label class="accept-label" for="ckbAccept"> Đồng ý ....</label>
        </div>
    </div>
    <div class="w3-cell-row button-bar">
        <div class="w3-container w3-cell w3-right-align w3-cell-middle" style="width:300px">
        </div>
        <div class="w3-container w3-cell">
            <button class="w3-btn w3-round-xxlarge w3-brand" @click="createQRData">Create QR Code</button>
        </div>
    </div>
</template>

<style scoped>
.w3-input {
    padding: 10px 15px;
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 400;
    margin-top: 8px;
    margin-bottom: 8px;
}

.label {
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 600;
}

.accept-label {
    padding-top: 6px;
    font-size: 16px;
}

.button-bar {
    margin-top: 24px;
}
</style>