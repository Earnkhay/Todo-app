<template>
    <div class="text-center">
        <div class="spinner-border" :class="spinnerSize" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Options, Vue} from "vue-class-component"
    @Options({
        props: {
            spinnerSize: String,
        }
    })

    export default class spinner extends Vue {
        
    }
</script>