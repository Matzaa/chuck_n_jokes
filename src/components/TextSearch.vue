<template>
    <b-form @submit="submitText">
        <b-input-group>
            <b-form-input placeholder="text search query"> </b-form-input>

            <b-button type="submit">search</b-button>
        </b-input-group>
    </b-form>
</template>

<script>
export default {
    name: "TextSearch",

    methods: {
        submitText: function(event) {
            event.preventDefault();
            console.log("please search this", event.target[0].value);
            this.$emit("searchText", event.target[0].value);
            event.target[0].value = "";
        },
    },
};
</script>

<style></style>
