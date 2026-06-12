<template>
    <nav :key="navbarRefreshKey" class="flex justify-between p-4 bg-neutral-800">
        <NuxtLink to="/">
            Home
        </NuxtLink>
        <ul class="inline-flex gap-4">
            <li>
                <NuxtLink to="/about">
                    About
                </NuxtLink>
            </li>
            <div v-if="!user" class="inline-flex gap-4">
                <li>
                    <NuxtLink to="/register">
                        Register
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/login">
                        Login
                    </NuxtLink>
                </li>
            </div>
            <div v-else class="inline-flex gap-4">
                {{ user.username }}
            </div>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import type { JwtUserInfo } from '../../shared/types/jwt-user-info';

const navbarRefreshKey = useState<number>("navbarRefreshKey", () => 0);
const user = ref<JwtUserInfo | null>(null);

onMounted(async () => {
    await verifyAuthentication();
});

async function verifyAuthentication() {
    const token = useCookie("jwt_token");
    console.log(token);
    if (!token.value) {
        return;
    }
    const result = await $fetch('/api/auth/verifyToken', {
        method: 'POST',
        body: { token: token.value }
    });
    if (!result.success) {
        return;
    }
    user.value = result.user.user;
}

watch(navbarRefreshKey, async () => {
    await verifyAuthentication();
})

</script>