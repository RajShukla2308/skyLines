import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { ViewDetailsService } from './view-details/view-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookAir';
  bookOptionSelected:boolean = false
  agree:boolean = false
  dalbe:boolean = false
  msg:any= ""

  constructor(private router:Router,private viweSer:ViewDetailsService){

  }

  agreed(val:any){
    if(val==1){
      this.agree = true
      this.router.navigate(['/book'])
    }
    if(val==2){
      this.agree = true
      this.router.navigate(['/view'])
    }
  }

  setupDb(){
    this.msg = ""
    this.viweSer.setup().subscribe((data)=>this.msg=data.message,(err)=>this.msg=err.message)
  }
}
