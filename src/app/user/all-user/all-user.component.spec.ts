import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AllUserComponent } from './all-user.component';

describe('AllUserComponent', () => {
  let component: AllUserComponent;
  let fixture: ComponentFixture<AllUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUserComponent],
      providers: [FormBuilder, { provide: Router, useValue: {} }],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
