<template>
    <div class="text-center">
        <div class="spinner-border spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"

@Options({
  components: {
  }
})

export default class spinner extends Vue {}
</script>