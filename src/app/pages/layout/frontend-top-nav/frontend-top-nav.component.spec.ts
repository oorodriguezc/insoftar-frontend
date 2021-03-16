import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendTopNavComponent } from './frontend-top-nav.component';

describe('FrontendTopNavComponent', () => {
  let component: FrontendTopNavComponent;
  let fixture: ComponentFixture<FrontendTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontendTopNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontendTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
