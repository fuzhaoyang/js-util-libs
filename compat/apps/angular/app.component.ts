import { Component } from '@angular/core';
import { runSmoke } from './smoke';

@Component({
  selector: 'app-root',
  template: '<pre id="status">{{ status }}</pre>',
})
export class AppComponent {
  status = 'running';

  async ngOnInit() {
    const results = await runSmoke();
    (window as any).__SMOKE_RESULTS__ = results;
    this.status = JSON.stringify(results);
  }
}
