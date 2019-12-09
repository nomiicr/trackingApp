import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMailComponent } from './web-mail.component';

describe('WebMailComponent', () => {
  let component: WebMailComponent;
  let fixture: ComponentFixture<WebMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
