import { CommonModule, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
 
  constructor(public toast: ToastService) {}

}
