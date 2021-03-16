import {Component, OnInit} from '@angular/core';
import {pageInfo} from '../../../core/constants/constants';

@Component({
  selector: 'app-frontend-footer',
  templateUrl: './frontend-footer.component.html',
  styleUrls: ['./frontend-footer.component.css']
})
export class FrontendFooterComponent implements OnInit {

  appVersion = pageInfo.APP_VERSION;
  companyName = pageInfo.COMPANY_NAME;
  companyWebpage = pageInfo.COMPANY_WEBPAGE;
  projectName = pageInfo.PROJECT_NAME;
  logoSrc = pageInfo.LOGO_SRC;
  currentDate = new Date();

  constructor() {
  }

  ngOnInit(): void {
  }

}
