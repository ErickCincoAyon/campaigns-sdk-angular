import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CampaignsSdkAngularComponent } from './campaigns-sdk-angular.component';
import { ComponentsModule } from './components/components.module';
import { CampaignService } from './services/campaign.service';

const CustomConfig = {
  endpoint: 'endpoint_value' || undefined,
  api_key: 'apiKey_value' || undefined,
  theme: 'theme_value' || undefined,
  token: 'token_value' || undefined
};

@NgModule({
  declarations: [
    CampaignsSdkAngularComponent
  ],
  imports: [
    ComponentsModule,
    HttpClientModule,
  ],
  exports: [
    CampaignsSdkAngularComponent,
  ],
  providers: [
    CampaignService,
  ]
})

export class CampaignsSdkAngularModule {
  static forRoot( config: typeof CustomConfig ): ModuleWithProviders<CampaignsSdkAngularModule> {
    return {
      ngModule: CampaignsSdkAngularModule,
      providers: [CampaignService, {provide: 'config', useValue: config}]
    };
  }
}
