<script setup lang="ts">
import NavigationBar from '~/components/NavigationBar.vue';
</script>

<template>
<div>
    <NavigationBar />
    <div class="p-4">
        <slot />
    </div>
</div>
</template>