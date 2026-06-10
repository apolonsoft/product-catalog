<template>
    <div class="text-3xl font-black text-shadow-2xs" :class="properties.colorClass">
        <slot />
    </div>
</template>

<script lang="ts" setup>
interface PageTitleProperties {
    colorClass?: string
}

const properties = withDefaults(defineProps<PageTitleProperties>(), {
    colorClass: 'text-gray-100'
})
</script>