<template>
    <div>
        <b-nav>
            <b-nav-item to="/">Home</b-nav-item> |
            <b-nav-item to="/about">About</b-nav-item>
        </b-nav>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "Nav",
};
</script>
