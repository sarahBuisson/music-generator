import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitionViewComponent } from './partition-view.component';

describe('PartitionViewComponent', () => {
  let component: PartitionViewComponent;
  let fixture: ComponentFixture<PartitionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartitionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
