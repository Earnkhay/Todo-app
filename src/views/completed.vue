<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="d-flex mt-5 justify-content-center" v-if="spinnerShow">
                <spinner/>
        </div>

        <div v-else class="card row m-2 col-md-7 todocard" v-for="(todo, id) in todos" :key="id" :class="[todo.done ? 'success' : 'bg-light' ]">
            <div class="card-body d-flex justify-content-between">
                <div class="form-check pt-0 ps-4">
                        <input class="form-check-input" type="checkbox" value="" v-model="todo.done" @click.prevent="toggleDone(todo.id)" id="flexCheckDefault">
                </div>
                <div class="fw-bold text-wrap text-break" :class="[todo.done ?  'text-decoration-line-through' : 'text-dark']">{{ todo.name }}</div>
                <div class="flexbtn">
                    <button class="bg-danger border-danger mx-1 delbtn" @click.prevent="deleteTodo(todo.id)"><i class="fa-solid fa-trash text-light" ></i></button>
                </div>
            </div>
      </div>
     </div>
    </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import { db } from "@/firebase.js"
import spinner from '@/components/spinner.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, updateDoc, where, deleteDoc, query, orderBy } from "firebase/firestore";

@Options({
    components: {
        spinner,
        todo
    }
})

export default class taskdone extends Vue {
    spinnerShow = false
    newTodo = ""
    todos = []
    done = false
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/todos`)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"), where("done", "==", true));

    mounted(){ 
        this.spinnerShow = true
        setTimeout(() => {  
            this.spinnerShow = false
        }, 1000) 
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                const fbTodos = []
                querySnapshot.forEach((doc) => {
                        const todo = {
                            id: doc.id,
                            name: doc.data().name,
                            done: doc.data().done
                        }
                        fbTodos.push(todo)
                })
                    this.todos = fbTodos
                })
            }
        })
    }

    toggleDone(id){
        const todoToUpdate = this.todos.find((todo) => todo.id === id)
        updateDoc(doc(db, `users/${this.id}/todos`, id), {
            done: !todoToUpdate.done
        })
    }

    deleteTodo(id){
        deleteDoc(doc(db, `users/${this.id}/todos`, id));
    }
}
</script>

<style scoped>
   .success{
        background-color: rgb(164, 243, 164);
    }

@media (min-width: 295px) and (max-width: 575px) {
    .todocard{
        width: 90%;
    }
}

@media screen and (max-width: 294px) {
    .todocard{
        padding: 1px !important;
        width: 95%
    }

}
</style>