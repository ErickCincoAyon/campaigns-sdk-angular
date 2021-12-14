import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CampaignsSdkAngularComponent } from './campaigns-sdk-angular.component';
import { CampaignsSdkAngularService } from './campaigns-sdk-angular.service';
import { ComponentsModule } from './components/components.module';

const CustomConfig = {
  endpoint: 'endpoint_value' || undefined,
  api_key: 'apiKey_value' || undefined,
  theme: 'theme_value' || undefined,
  font_family: 'string' || undefined,
  font_color: 'string' || undefined,
  font_color_light: 'string' || undefined,
  color_main: 'string' || undefined,
  token: 'token_value' || undefined
};

@NgModule({
  declarations: [
    CampaignsSdkAngularComponent,
  ],
  imports: [
    ComponentsModule,
    HttpClientModule,
  ],
  exports: [
    CampaignsSdkAngularComponent,
  ],
  providers: [
    CampaignsSdkAngularService,
  ]
})

export class CampaignsSdkAngularModule {
  static forRoot( config: typeof CustomConfig ): ModuleWithProviders<CampaignsSdkAngularModule> {
    return {
      ngModule: CampaignsSdkAngularModule,
      providers: [CampaignsSdkAngularService, {provide: 'config', useValue: config}]
    };
  }
}
