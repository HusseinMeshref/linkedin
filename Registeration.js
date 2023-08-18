let passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let users = JSON.parse(localStorage.getItem("users")) || []; 

// validity
function emailValidity(email = $("form input[type='email']")){
  let val = email.val();
  if(emailRegEx.test(val) && !JSON.stringify(users).includes(val) ){
    email.removeClass("is-invalid");
    email.addClass("is-valid")
    return true;
  }
  else{
    email.removeClass("is-valid");
    email.addClass("is-invalid");
    console.log("invalid email from validation")
    return false;
    
  }
}
function passValidity(pass = $("form input[type='password']")){
  let val = pass.val();
  if(passRegEx.test(val)){
    pass.removeClass("is-invalid");
    pass.addClass("is-valid")
    return true;
  }
  else{
    pass.removeClass("is-valid")
    pass.addClass("is-invalid")
    return false;
  }
}
function UsernameValidity(val = $("form input[type='text']").val()){
  if(val === ""){
    return false;

  }else{
    return true;
  } 
}


// jquery
$( document ).ready(function(){
    let email = $("form input[type='email']");
    let pass = $("form input[type='password']");
    let username = $("form input[type='text']");
    // form
    email.on("blur", e=>emailValidity());
    pass.on("blur", e=>passValidity());
    username.on("blur",function(e){
      $(this).val() === "" ? $(this).addClass("is-invalid"):$(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
    })
    // form ended
    function addUser(){
      let user = {};
      user.name = username.val()
      user.id = Date.now();
      user.email = email.val();
      user.password = pass.val();
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

    }
    // bootstrap form validation
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!emailValidity()||
              !passValidity()||
              !UsernameValidity()) {
            event.preventDefault()
            event.stopPropagation()
            console.log("valid form")
            addUser();
          }
          else{form.classList.add('was-validated')
          console.log("invalid email from form validation");}
        }, false)
      })
    })();

});



