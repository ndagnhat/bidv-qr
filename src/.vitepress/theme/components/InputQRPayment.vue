<script setup>
</script>

<template>
    <h1>Input Payment Infor</h1>
    <div class="vp-form">
        <div class="vp-field-group">
            <label for="selBank" class="vp-field-label">Choose a bank</label>
            <select id="selBank" name="banks" class="vp-field">
                <option value="BIDV">BIDV</option>
                <option value="TCB">Techcombank</option>
                <option value="VCB">Vietcombank</option>
                <option value="TPB">TPBank</option>
            </select>
        </div>

        <div class="vp-field-group">
            <label for="txtAccountNumber" class="vp-field-label">Account number</label>
            <input id="txtAccountNumber" type="text" placeholder="Enter account number" class="vp-field">
        </div>
        <div class="vp-field-group">
            <label for="txtAccountName" class="vp-field-label">Account Name</label>
            <input id="txtAccountName" type="text" placeholder="Enter account name" class="vp-field">
        </div>
        <div class="vp-field-group">
            <label for="txtAmount" class="vp-field-label">Amount</label>
            <input id="txtAmount" type="text" placeholder="Enter amount" class="vp-field">
        </div>
        <div class="vp-field-group">
            <label for="txtDescription" class="vp-field-label">Description</label>
            <input id="txtDescription" type="text" placeholder="Enter amount" class="vp-field">
        </div>
        <div class="vp-field-group">
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
            <label for="vehicle3">Hiển thị thông tin tài khoản</label><br>
        </div>
        <button class="VPButton medium brand">Create QR Code</button>
    </div>
</template>

<style scoped>
.vp-form {
    margin: 16px 0;
}

.vp-field-group {
    margin-bottom: 8px;
}

.vp-field {
    border: 1px solid var(--vp-c-border);
    border-radius: 8px;
    padding: 6px 12px;
    margin: 8px 0;
    width: 100%;
    transition: box-shadow .25s ease;
    letter-spacing: .2px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 400;
}

.vp-field:focus {
    box-shadow: 0 0 4pt var(--vp-c-brand);
}

.vp-field-label {
    letter-spacing: .2px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 400;
}
</style>