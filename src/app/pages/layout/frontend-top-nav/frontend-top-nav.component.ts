import {Component, OnInit} from '@angular/core';
import {pageInfo} from '../../../core/constants/constants';

@Component({
  selector: 'app-frontend-top-nav',
  templateUrl: './frontend-top-nav.component.html',
  styleUrls: ['./frontend-top-nav.component.css']
})
export class FrontendTopNavComponent implements OnInit {

  logoSrc = pageInfo.LOGO_SRC;
  companyName = pageInfo.COMPANY_NAME;

  constructor() {
  }

  ngOnInit(): void {
  }

}
