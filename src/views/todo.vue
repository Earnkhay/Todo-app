<template>
    <nav class="nav-item d-flex justify-content-end p-2 logout align-items-center">
          <!-- <i class="fa-solid fa-magnifying-glass fw-bold fs-5 p-1 me-3"></i> -->
          <div class="w-25">
            <input class="form-control" v-model="searchName" @input="searchTodos" type="search" placeholder="Search todos....." aria-label="Search">
          </div>
          <a class="nav-link btn btn-danger p-1 link-light fw-bold shadow mx-2" @click="logOutAction" v-if="isLoggedIn"> Logout</a>
    </nav>

    <div class="text-center mt-2 mb-4 container">
        <h1 class="p-3 fw-bold text-success sh">Todos</h1>
        <h5 class="mb-1 fs-4 fw-bold">Good {{ greet() }} <span class="text-success">{{ name }}</span>. Welcome to your todo app.</h5>
        <h5 class="fs-4 fw-bold">kindly add new todo below.</h5>
    </div>

    <div class="d-flex justify-content-center mb-3">
        <div>
            <input class="form-control" v-model="newTodo" type="text" @keyup.prevent.enter="addTodo" placeholder="Enter New todo" aria-label="default input example">
        </div>
        <div>
            <button type="button" class="btn btn-primary" @click.prevent="addTodo">Add</button>
        </div>
    </div>

    <div class="container mb-2 btngroup">
        <div class="row justify-content-center">
            <div class="btn-group col-md-4">
                <button @click="viewAll" class="btn btn-primary allbtn shadow" active-class="text-dark fw-bold sh">All</button>
                <button @click="viewActive" class="btn btn-danger activebtn shadow">Active</button>
                <button @click="viewCompleted" class="btn btn-success completedbtn shadow">Completed</button>
            </div>
        </div>
    </div>
      
    <div class="container">
      <div class="row justify-content-center">
        <div class=" d-flex justify-content-center " v-if="spinnerShow">
                <spinner class="mt-5"/>
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
import spinner from '@/components/spinner.vue'
import { db } from "@/firebase.js"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { collection, onSnapshot, addDoc, query, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore";

@Options({
  components: {
      spinner
  }
})

export default class todo extends Vue {
  navText1 = "Dashboard"
  name = ""
  newTodo = ""
  todos = []
  done = false
  searchName = ""
  searchActive = false
  spinnerShow = false
  errName = false
  months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  d = new Date()
  month = this.months[this.d.getMonth()]
  day = this.weekday[this.d.getDay()]
  auth = getAuth()
  user = this.auth.currentUser
  id = this.user.uid
  todosCollectionRef = collection(db, `users/${this.id}/todos`)
  todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"));
  isLoggedIn = false 
  hour = this.d.getHours()

   greet(){
        if (this.hour >= 0 && this.hour <= 11) {
            return "morning"            
        } else if(this.hour >= 12 && this.hour <= 17) {
            return "afternoon"
        }else{
            return "evening"
        }
    } 
    
   
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
            this.name = this.user.displayName
            this.isLoggedIn = true;
        }
      })
  }

  addTodo(){
      if(this.newTodo) {
          addDoc(this.todosCollectionRef, { 
              name: this.newTodo,
              done: this.done,
              date: Date.now(),
              day: this.day,
              month: this.month
          })
       this.newTodo = "" 
      }
  }

  viewAll(){
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
  viewActive(){
    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
            if(doc.data().done == false){
                const todo = {
                    id: doc.id,
                    name: doc.data().name,
                    done: doc.data().done
                }
                fbTodos.push(todo)
            }
        })
            this.todos = fbTodos
    })
  }
  viewCompleted(){
    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
        const fbTodos = []
        querySnapshot.forEach((doc) => {
            if(doc.data().done == true){
                const todo = {
                    id: doc.id,
                    name: doc.data().name,
                    done: doc.data().done
                }
                fbTodos.push(todo)
            }
        })
            this.todos = fbTodos
    })
  }

  searchTodos(){
        onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
            const fbTodos = [];
            querySnapshot.forEach((doc) => {
                if(doc.data().name.toLowerCase().includes(this.searchName)){
                    const todo = {
                        id: doc.id,
                        name: doc.data().name,
                        done: doc.data().done
                    }
                    fbTodos.push(todo)
                    this.todos = fbTodos
                    this.searchActive = true 
                }      
            }) 
        }) 
    }

    toggleDone(id){
        const todoToUpdate = this.todos.find((todo) => todo.id === id)
        updateDoc(doc(db, `users/${this.id}/todos`, id), {
            done: !todoToUpdate.done
        })
        this.currentTask = todoToUpdate
    }

    deleteTodo(id){
        deleteDoc(doc(db, `users/${this.id}/todos`, id));
        this.todos = []
    }

   logOutAction(){
      signOut(this.auth).then(() => {
        this.$router.push("/")
      })
    }

  
}
</script>

<style scoped>
.logout{
  cursor: pointer;
}
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
.logout a:hover{
    background-color: transparent !important;
    color: black !important;
    font-size: 15px;
}

.success{
        background-color: rgb(164, 243, 164);
    }

.sh{
   text-shadow: 1px 2px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 294px) {

  h5{
      font-size: 1.1rem !important;
  }
}
</style>