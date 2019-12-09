import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleientDetailComponent } from './cleient-detail.component';

describe('CleientDetailComponent', () => {
  let component: CleientDetailComponent;
  let fixture: ComponentFixture<CleientDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
