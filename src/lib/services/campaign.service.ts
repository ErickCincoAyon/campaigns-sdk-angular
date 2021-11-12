import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, Inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryComponent } from '../components/history/history.component';

const CustomConfig = {
  endpoint: 'endpoint_value',
  api_key: 'apiKey_value',
  theme: 'theme_value',
  token: 'token_value'
};


@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  public api_key_valid = '4K1V4L4AP1K3Y_U4U4U4F13RR0';

  public endpoint: string = '';
  public api_key: string = '';
  public theme: string = '';
  public token: string = '';

  public components: any = [];
  public data: any = [];

  constructor(
    private readonly _http: HttpClient,
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
    @Inject('config') private config: typeof CustomConfig
    ) {
    console.log( this.config );
    this.endpoint = this.config.endpoint;
    this.api_key = this.config.api_key;
    this.theme = this.config.theme;
    this.token = this.config.token;
  }

  getCampagins( page: number = 1, limit: number = 10, order: number = -1 ): Observable<any> {
    console.log(  );
    return this._http.get(`${ this.endpoint }?page=${ page }&limit=${ limit }&order=${ order }`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ this.token }`
      }
    });
  }

  toggleCampaignsHistory( show: boolean = true, data: any = null, container: any = null ): void {
    // Obtenemos la informacion para mostrar en el componente 
    this.data = data;

    if( show ) {
        this.addComponent( container, HistoryComponent );
    } else {
        this.removeComponent( HistoryComponent );
    }
  }

  getData() {
    return this.data;
  }

  addComponent( container: any, componentClass: Type<any> ): void {
    if ( this.components.length > 0 ) return;
    // Crear componente dinamicamente
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = container.createComponent(componentFactory);

    // Meter el componente en un array para comprobar existencia
    this.components.push(component);
  }

  removeComponent( componentClass: Type<any>): void {
    // Encontrar el componente
    const component = this.components.find((component: any) => component.instance instanceof componentClass);
    const componentIndex = this.components.indexOf(component);

    if (componentIndex !== -1) {
      // Remover el componente del arreglo, destruirlo y setear la data pasada en empty
      component.destroy();
      this.components.splice(componentIndex, 1);
      this.data = [];
    }
  }
}
