import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewAllTweetComponent } from './view-all-tweet.component';

describe('ViewAllTweetComponent', () => {
  let component: ViewAllTweetComponent;
  let fixture: ComponentFixture<ViewAllTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllTweetComponent],
      providers: [FormBuilder, { provide: Router, useValue: {} }],
      imports: [HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
