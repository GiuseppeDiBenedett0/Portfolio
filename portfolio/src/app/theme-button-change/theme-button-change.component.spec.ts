import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeButtonChangeComponent } from './theme-button-change.component';

describe('ThemeButtonChangeComponent', () => {
  let component: ThemeButtonChangeComponent;
  let fixture: ComponentFixture<ThemeButtonChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeButtonChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemeButtonChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
