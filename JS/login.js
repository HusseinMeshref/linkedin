$(document).ready(function(){
  // redirect to home page if alredy signed in
  if(localStorage.getItem("currentUser")){
    window.location.replace("./Home.html");
  }
  let passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let users = JSON.parse(localStorage.getItem("users")) || []; 
  let email = $("form input[type='email']");
  let pass = $("form input[type='password']");
  // validation of inputs
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
    // on blur => input validation
    $("input[type='email']").on("blur", function(e){
      validate($(this), emailRegEx);
    })
    $("input[type='password']").on("blur", function(e){
      validate($(this), passRegEx);
    })
    // login validation
    function validLogin(){
      let vLgn = false;
      users.forEach(function(e,index){
        if(e.email === email.val() && e.password === pass.val()){
          vLgn = true;
          localStorage.setItem("currentUser", JSON.stringify(users[index]));
          return;
        }
      })
      return vLgn;
    }
    // reset inputs
    function inReset(){
      $("input").val("");
      $(".alert").removeClass("d-none");
    }

    // Example starter JavaScript for disabling form submissions if there are invalid fields
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity() || !validLogin()) {
            console.log("invalid")
            event.preventDefault();
            event.stopPropagation();
          }
          if(!validLogin()){
            event.preventDefault();
            event.stopPropagation();
            inReset();
            console.log("wrong data")
          }else{
            event.preventDefault();
            window.location.replace("./Home.html");
          }
          
          form.classList.add('was-validated');
          
        }, false)
      })
})