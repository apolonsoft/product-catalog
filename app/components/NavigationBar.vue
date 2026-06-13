<template>
    <nav class="flex justify-between p-4 bg-neutral-800">
        <NuxtLink to="/">
            Home
        </NuxtLink>
        <TransitionGroup class="inline-flex gap-4" tag="ul" name="fade-nav">
            <li key="about">
                <NuxtLink to="/about">
                    About
                </NuxtLink>
            </li>
            <div v-if="!user" key="guest" class="inline-flex gap-4">
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
            <div v-else key="user" class="inline-flex gap-4">
                <div class="hover:text-neutral-500 cursor-pointer" @click="logout">
                    Logout
                </div>
                <div>
                    {{ user.username }}
                </div>
            </div>
        </TransitionGroup>
    </nav>
</template>

<script lang="ts" setup>
import type { JwtUserInfo } from '../../shared/types/jwt-user-info';

const refreshKey = useState<number>("navbarRefreshKey", () => 0);

const { data: user } = await useAsyncData<JwtUserInfo | null>("navbar-user", verifyAuthentication, {
    default: () => null,
    watch: [refreshKey]
});

async function logout() {
    useCookie("jwt_token").value = undefined;
    refreshKey.value++;
}

async function verifyAuthentication(): Promise<JwtUserInfo | null> {
    const token = useCookie("jwt_token");
    if (!token.value) {
        return null;
    }
    const result = await $fetch('/api/auth/verifyToken', {
        method: 'POST',
        body: { token: token.value }
    });
    if (!result.success) {
        return null;
    }
    return result.user.user as JwtUserInfo;
}
</script>

<style scoped>
.fade-nav-enter-active,
.fade-nav-leave-active {
    transition: all 0.1s ease;
}

.fade-nav-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-nav-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.fade-nav-leave-active {
    position: absolute;
    right:1rem;
}

</style>
