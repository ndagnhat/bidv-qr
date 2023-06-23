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
    <div class="container">
        <div class="left-item">
            <label class="label">Banks:</label>
        </div>
        <div class="right-item">
            <select name="banks" v-model="selBankId" class="w3-input w3-border w3-hover-border w3-round-large">
                <option v-for="bank in listBanks" :value="bank.code">
                    {{ bank.name }}
                </option>
            </select>
        </div>
        <div class="left-item">
            <label class="label">Account number:</label>
        </div>
        <div class="right-item">
            <input type="text" v-model="txtAccountNo" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
        <div class="left-item">
            <label class="label">Account Name:</label>
        </div>
        <div class="right-item">
            <input type="text" v-model="txtAccountName" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
        <div class="left-item">
            <label class="label">Amount:</label>
        </div>
        <div class="right-item">
            <input type="text" v-model="txtAmount" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
        <div class="left-item">
            <label class="label">Description:</label>
        </div>
        <div class="right-item">
            <input type="text" v-model="txtDescription" class="w3-input w3-border w3-hover-border w3-round-large" />
        </div>
        <div class="left-item"></div>
        <div class="right-item">
            <input id="ckbAccept" v-model="ckbAccept" type="checkbox">
            <label for="ckbAccept"> Đồng ý ....</label>
        </div>
        <div class="left-item"></div>
        <div class="right-item">
            <button class="w3-btn w3-large w3-round-xxlarge w3-brand" @click="createQRData">Create QR Code</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: auto;
    align-items: center;
}

.left-item {
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 600;
}


.right-item {
    padding-bottom: 16px;
    padding-top: 5px;
}


@media (min-width: 520px) {
    .container {
        padding: 10px 16px;
    }
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: 3fr 7fr;
        gap: 16px;
    }

    .left-item {
        justify-self: end;
    }

    .right-item {
        padding: 0;
    }
}

.w3-input {
    padding: 10px 15px;
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 400;
}
</style>