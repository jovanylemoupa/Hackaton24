import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAllContainComponent } from './home-all-contain.component';

describe('HomeAllContainComponent', () => {
  let component: HomeAllContainComponent;
  let fixture: ComponentFixture<HomeAllContainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAllContainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAllContainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
