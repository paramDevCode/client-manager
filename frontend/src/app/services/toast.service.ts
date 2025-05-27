import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
   private message = signal<string | null>(null);
  private type = signal<'success' | 'error'>('success');
  private visible = signal(false);

  readonly toastMessage = computed(() => this.message());
  readonly toastType = computed(() => this.type());
  readonly isVisible = computed(() => this.visible());

  show(msg: string, type: 'success' | 'error' = 'success', duration = 3000) {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.visible.set(false);
  }
}
