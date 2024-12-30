import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecommendationsComponent } from './game-recommendations.component';

describe('GameRecommendationsComponent', () => {
  let component: GameRecommendationsComponent;
  let fixture: ComponentFixture<GameRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
