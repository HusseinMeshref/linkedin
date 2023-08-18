$(document).ready(function(){
    if(!localStorage.getItem("currentUser")){
        window.location.replace("./login.html")
    }
    let username = JSON.parse(localStorage.getItem("currentUser")).name;
    let job = "Full Stack PHP developer";
    // follow content
    function follow(user){
        let element = `<div class="d-flex justify-content-start align-items-start mb-3">
        <div class="rounded-circle" style="width:45px;height:45px; overflow:hidden;">
          <img src="./images/people/${user.id}.jpg" class="rounded-circle" style="width:100%" alt="asd">
          </div>
        <div class="headTxt ms-3">
          <h6 class="Fname fw-bolder">${user.name}</h6>
          <p class="Fjob">${user.job}</p>
          <a href="#" class="btn btn-outline-primary follow">Follow</a>
        </div>
      </div>`;
      return element;
    }
    // posts content
    function posts(user){
        let element = `
        <div class="head d-flex justify-content-start align-items-start">
          <div class="rounded-circle" style="width:45px;height:45px; overflow:hidden;">
          <img src="./images/people/${user.id}.jpg" class="rounded-circle" style="width:100%" alt="asd">
          </div>  
          <div class="headTxt ms-3">
            <h6 class="Fname fw-bolder">${user.name}</h6>
            <p class="Fjob text-secondary" style="font-size:12px" >${user.job}</p>
          </div>
        </div>
        <div class="body">
          <div class="bTxt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis modi eius deleniti, dignissimos consectetur laudantium! Quibusdam esse laudantium iste dolorem ipsa quam est voluptate architecto magnam! Dolorem consectetur sint eius.</div>
          <img class="bimg" style="width: 100%;" src="./images/postpic.avif" alt="">
        </div>
        <div class="pfooter border-top m-3 mb-0">
          <ul class="d-flex justify-content-around m-0">
            <li>
              <a href="#">
                <i class="fa-solid fa-thumbs-up"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-regular fa-comment"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-solid fa-repeat"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-solid fa-paper-plane"></i>
              </a>
            </li>
          </ul>
        </div>`
        return element;
    }
    
    $(".username").text(username);
    $(".prof").text(job);
    let people;
    fetch("https://retoolapi.dev/hVqKPK/data")
    .then(x=> x.text())
    .then(y=> people = JSON.parse(y))
    .then(function(){
        for(let x = 0; x<5; x++){
            $(".sugg").append(follow(people[x]));
        }
        for(let x = 5; x<15; x++){
            $(".post").append(posts(people[x]));
            console.log("ffff");
        }
        $(".headTxt .btn").on("click",function(){
            console.log("clicked")
            $(this).parent().append("<span class ='text-success'>Followed</span>")
            $(this).remove();
        })
    })
    $(".modal-footer .btn-primary").on("click", function(e){
        localStorage.removeItem("currentUser");
        window.location.reload()
    })





})