import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiLayout } from '@shell/ui-layout';

@Component({
  selector: 'lib-feature-main',
  imports: [RouterOutlet, UiLayout],
  templateUrl: './feature-main.html',
})
export class FeatureMain {}
