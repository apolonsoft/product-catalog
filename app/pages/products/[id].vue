<template>
    <div>
        <h6>
        {{ id }}
        </h6>
    </div>
</template>
<script lang="ts" setup>
    const id = useRoute().params.id
</script>