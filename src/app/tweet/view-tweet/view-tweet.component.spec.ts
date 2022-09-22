import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewTweetComponent } from './view-tweet.component';

describe('ViewTweetComponent', () => {
  let component: ViewTweetComponent;
  let fixture: ComponentFixture<ViewTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTweetComponent],
      providers: [FormBuilder, { provide: Router, useValue: {} }],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
