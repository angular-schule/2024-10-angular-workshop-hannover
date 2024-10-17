import { Component, Input, EventEmitter, Output, signal, input, output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'rxw-chat-window',
  templateUrl: './chat-window.component.html',
  styles: [],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ChatWindowComponent {

  name = input<string>();
  send = output<string>();
  leave = output();

  form = new FormGroup({
    message: new FormControl('', { nonNullable: true })
  });

  online = signal(true);

  sendMessage() {
    this.send.emit(this.form.controls.message.value);
    this.form.reset({ message: '' });
  }

  leaveChat() {
    this.online.set(false);
    this.leave.emit();
  }

}
