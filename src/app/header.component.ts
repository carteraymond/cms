import { Component, OnInit,} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  imports: [RouterModule],
})
export class HeaderComponent implements OnInit {
  collapsed = true;


  constructor() { }

  ngOnInit(): void {
  }

}