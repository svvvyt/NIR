import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'loading-block',
  template: `
    <div class="ring">
      {{ text }}
      <span></span>
    </div>
  `,
  styleUrls: ['./loading-block.component.css'],
})
export class LoadingBlockComponent {
  @Input() text?: string;
}
