import { PostService } from "src/app/services/post.service";
import { Component, OnInit } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  constructor(private service: PostService,private router: Router) {}

  ngOnInit() {
     
    setInterval(() => {
      if (localStorage.getItem('token') !== null) {
        // lấy token  
        let getToken = localStorage.getItem("token");
        let token = getToken;
        // lấy refresh token
        let getRefToken = localStorage.getItem("refresh_token");
        let formRef = new FormData();
        formRef.append("refresh_token", getRefToken);
        // decode token lấy timestamp
        let decoded = jwt_decode(token);
        let currentDate = Date.now();
        let tokenDate = decoded.exp * 1000;
     /*nếu tokendate trừ cho currentdate nhỏ hơn 600000 thì thực hiện refresh*/
        if (tokenDate - currentDate < 3500000) {
          if(localStorage.getItem('refresh_token')){
            this.service.refreshToken(formRef).subscribe(res => {
              localStorage.setItem("token", res.json().token);
              console.log("refreshed", res.json());
            },error=>{
              if(error.status === 401){
                this.router.navigate(['/login']);
              }
            });
          }else{
            localStorage.clear();
            this.router.navigate(['/login'])
          }
        }
        console.log(
          "2 thoi gian tru cho nhau (sau): ",
          tokenDate - currentDate
        );
      } 
    }, 2000);
  }
}
