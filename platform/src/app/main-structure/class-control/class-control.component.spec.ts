import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassControlComponent } from './class-control.component';

describe('ClassControlComponent', () => {
  let component: ClassControlComponent;
  let fixture: ComponentFixture<ClassControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
