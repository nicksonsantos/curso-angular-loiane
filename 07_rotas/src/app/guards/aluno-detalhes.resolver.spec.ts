import { TestBed } from '@angular/core/testing';

import { AlunoDetalhesResolver } from './aluno-detalhes.resolver';

describe('AlunoDetalhesResolver', () => {
  let resolver: AlunoDetalhesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AlunoDetalhesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
