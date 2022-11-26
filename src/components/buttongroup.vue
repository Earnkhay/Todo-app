<template>
    <div class="container mb-2 btngroup">
        <div class="row justify-content-center">
            <div class="btn-group col-md-4">
                <router-link :to="{name: 'alltodo'}" class="btn btn-primary allbtn shadow" active-class="text-dark fw-bold sh">All</router-link>
                <router-link :to="{name: 'active'}" class="btn btn-danger activebtn shadow" active-class="text-dark fw-bold sh">Active</router-link>
                <router-link :to="{name: 'completed'}" class="btn btn-success completedbtn shadow" active-class="text-dark fw-bold sh">Completed</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"

@Options({
  components: {
  }
})

export default class buttongroup extends Vue {}
</script>

<style scoped>
    .allbtn:hover, .activebtn:hover, .completedbtn:hover{
        background-color: transparent !important;
        color: black;
        font-weight: bolder;
        font-size: 17px;
        text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    .sh{
        text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    @media (min-width: 322px) and (max-width:767px) {
        .btngroup{
            width: 70%;
        }
    }
</style>