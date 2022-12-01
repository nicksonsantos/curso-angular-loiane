import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() textoTitulo: string = '';
  @Input() textoCorpo: string = '';
  @Input() textoBotaoCancelar: string = 'Cancelar';
  @Input() textoBotaoConfirmar: string = 'Salvar mudanças';

  confirmResult: Subject<boolean> = new Subject;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  confirmAndClose(value: boolean) {
    this.confirmResult.next(true);
    this.bsModalRef.hide();
  }

}
