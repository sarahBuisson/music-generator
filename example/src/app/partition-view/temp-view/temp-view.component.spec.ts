import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempViewComponent } from './temp-view.component';

describe('TempViewComponent', () => {
  let component: TempViewComponent;
  let fixture: ComponentFixture<TempViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
