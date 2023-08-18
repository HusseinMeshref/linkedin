$(document).ready(function(){
  // redirect to home page if alredy signed in
  if(localStorage.getItem("currentUser")){
    window.location.replace("./Home.html");
  }
  let passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let userRegEx = /^[a-zA-Z\-' ]+$/;
  let users = JSON.parse(localStorage.getItem("users")) || []; 
  let email = $("form input[type='email']");
  let pass = $("form input[type='password']");
  let username = $("form input[type='text']");

  function validate(input, regEx){
    let val = input.val();
    if(regEx.test(val)){
      input.removeClass("is-invalid");
      input.addClass("is-valid")
      return true;
    }
    else{
      input.removeClass("is-valid")
      input.addClass("is-invalid")
      return false;
    }
  }
  // validation all function to use it in form validation
  function allValid(){
    if( validate(username, userRegEx) && validate(email,emailRegEx) && validate(pass, passRegEx) ){
      return true;
    }else{
      return false;
    }
  }
  function newEmail(){
    if(JSON.stringify(users).includes(email.val())){
      $(".emailv").removeClass("nvsble");
      $(".emailv").addClass("vsble");
      return false;
    }else{
      $(".emailv").addClass("nvsble");
      $(".emailv").removeClass("vsble");
      return true;
    }
  }

  // on blur => input validation
  $("input[type='text']").on("blur", function(e){
    validate($(this), userRegEx);
  })
  $("input[type='email']").on("blur", function(e){
    validate($(this), emailRegEx)? newEmail():$(".emailv").addClass("nvsble");;
  })
  $("input[type='password']").on("blur", function(e){
    validate($(this), passRegEx);
  })

  function addUser(){
    let user = {};
    user.name = username.val()
    user.id = Date.now();
    user.email = email.val();
    user.password = pass.val();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

  }
  // Example starter JavaScript for disabling form submissions if there are invalid fields
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity() || !newEmail()) {
          
          event.preventDefault();
          event.stopPropagation();
        }else{
          event.preventDefault();
          addUser();
          window.location.replace("./login.html");
        }
        
        form.classList.add('was-validated');
      }, false)
    })
  

});
