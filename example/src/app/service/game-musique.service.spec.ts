import { TestBed } from '@angular/core/testing';

import { GameMusiqueService } from './game-musique.service';

describe('GameMusiqueService', () => {
  let service: GameMusiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMusiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate menuMusicRandom', () => {
    service.menuMusicRandom()
  });

  it('should generate gameMusicRandom', () => {
    service.gameMusicRandom()
  });
});
