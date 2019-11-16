import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeslistComponent } from './recipeslist.component';

describe('RecipeslistComponent', () => {
  let component: RecipeslistComponent;
  let fixture: ComponentFixture<RecipeslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
