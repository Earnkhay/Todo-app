<template>
  <div id="app">
    <div class="container text-center p-5 welcome">
        <div class="row justify-content-center align-items-center p-5 welcomerow">
            <div class="col-md-12 mt-5">
                <div class="mb-4 mt-5">
                  <h1 class="p-2">Welcome to your simple todo app</h1>
                  <h2 class="p-2">Kindly {{ pageType == "signUp" ? "Sign up" : "Login" }} to kick start your journey</h2>
                </div>

                <p v-if="errorText" :class="[alertType == 'Success' ? 'text-success' : 'text-danger']" class="fw-bold fs-5"> {{ message }} </p>

                <div class="d-grid gap-2 col-12 mx-auto">
                  <button class="btn btn-lg btn-primary mb-3 googleBtn fw-bold" @click.prevent="signUpWithGoogle" type="button">
                    <div class="text-center" v-if="spinnerShow">
                      <div class="spinner-border spinner-border-sm" role="status">
                          <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    
                    <div v-else>
                      {{pageType == "signUp" ? "Sign Up with Google" : "Sign In with Google"}}
                    </div>
                  </button>
               </div>

            <p id="account" class="text-center fw-bold"> {{pageType == "signUp" ? "Already have an account?" : "Don't have an account?"}} 
              <a href="" id="link" @click.prevent="setLoginPage"> {{ pageType == "signUp" ? "Log in here" : "Sign up here" }}</a></p>
          </div>
        </div>
    </div>
  </div>
  </template>
  
<script>
import { Options, Vue } from 'vue-class-component';
import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
  @Options({
    components: {
    },
  })
  export default class signup extends Vue {
    pageType ="signUp"
    spinnerShow = false
    errorText = false
    message = ""
    alertType = ""

    setLoginPage(){     
        if(this.pageType == "signUp"){
            this.pageType = "login"
        }else if(this.pageType == "login"){
            this.pageType = "signUp"
        }
    }

    signUpWithGoogle(){
      const provider = new GoogleAuthProvider();
      signInWithPopup(getAuth(), provider)
          .then(() => {
              this.errorText = true
              this.message = "Success! Welcome..."
              this.spinnerShow = true
              this.alertType = 'Success'
              setTimeout(() => {  
                      this.errorText = false  
                      this.spinnerShow = false
                      this.$router.push('/todo/all')    
              },3000) 
          })
          .catch((err) => {
            this.errorText = true
            this.spinnerShow = true
            this.alertType = 'danger'
            switch (err.code) {
                case "auth/email-already-in-use":
                    this.message = "Email is already in use";
                    break;
                case "auth/cancelled-popup-request":
                    this.message = "You cancelled the popup request";
                    break;
                case "auth/operation-not-allowed":
                    this.message = "Operation not allowed";
                    break;
                default:
                    this.message = "Email or password was incorrect";
                    break;
            }
            setTimeout(() => {         
                      this.errorText = false  
                      this.spinnerShow = false
            },3000)
          })
    }
  }
</script>

<style scoped>
#app{
    background-image: url(../assets/signup.jpg);
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    overflow: hidden;
}
.welcome{
  min-height: 100vh;
}

h1{
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.googleBtn:hover{
    background-color: transparent !important;
    color: black !important;
}

#account a{
    text-decoration: none;
    color: blue;
}
#account a:hover{
    text-decoration: none;
    color: green;
}
 @media (min-width: 414px) and (max-width: 456px) {
  .googleBtn{
    padding: 5px;
  }

  h1{
    font-size: 23px;
  }
  h2{
    font-size: 20px;
  }
 }
 @media (min-width: 350px) and (max-width: 413px) {
  .welcome{
      padding: 0 !important;
    }
  .googleBtn{
    padding: 5px;
    font-size: 15px;
  }
 
  h1{
    font-size: 20px;
  }
  h2{
    font-size: 18px;
  }
 }
 @media screen and (max-width: 349px) {
    .welcome{
      padding: 0 !important;
    }

    /* .welcomerow{
      padding: 0;
    } */
    .googleBtn{
      padding: 4px 0;
      font-size: 12px;
    }
  
    h1{
      font-size: 16px;
    }
    h2{
      font-size: 14px;
    }
 }
</style>
  