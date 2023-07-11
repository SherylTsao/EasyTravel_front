<script>
export default {
    props: { // 來自父層
        columns: { // 為表個欄位名稱
            type: Array,
            required: true
        }, data: { // 為表格內容，必需為陣列形式
            type: Array,
            required: true
        },
    }, methods: {
        rentInit(item) {
            this.$emit('rent', item); // 触发complete事件并将索引作为参数传递给父组件
        }
    }
};
</script>

<template>
    <div class="position-relative w-95%">
        <table class="table mb-5 table-striped table-fixed table-hover">
            <thead> <!-- 標題名稱 -->
                <tr class="table-dark"> <!-- 使用迴圈印出"標題名稱" -->
                    <th v-for="item in columns">{{ item.column }}</th>
                    <th><label></label></th>
                </tr>
            </thead>
            <tbody> <!-- 內容 -->
                <tr v-for="vehicles in data" :key="vehicles.id">
                    <td v-for="item in columns">{{ vehicles[item.key] }}</td>
                    <!-- 印出該分頁對應標題的內容(欄) -->
                    <td>
                        <button class="btn btn-primary py-0" @click="rentInit(vehicles)">レンタル</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.table-fixed {
    table-layout: fixed;
    width: 100%;
}
</style>