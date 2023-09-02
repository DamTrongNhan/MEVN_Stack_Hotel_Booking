<template>
    Day la trang quan ly settings
</template>

<script>
import { useMenu } from '../../store/use-menu';
export default {
    setup() {
        useMenu().onSelectedKeys(["admin-settings"]);
    }
}
</script>

<style  scoped></style>