import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  public data: any = [];
  public campaigns: any = [];
  public page: number = 1;
  public totalPages: any;


  @ViewChild('historyModal', {static: false}) public historyModal: any;
  @ViewChild('historyList', {static: false}) public historyList: any;

  constructor(
    private readonly _campaignService: CampaignService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.data = [];
    this.campaigns = [];
    this.page = 1;
    this.totalPages = null;
  }

  getData() {
    this.data = this._campaignService.getData();
    console.log( this.data );
    this.page = this.data.page;
    this.totalPages = this.data.totalPages;
    this.campaigns = this.data.docs;
  }

  closeHistory() {

    this.historyModal.nativeElement.classList.add('hide-list');
    setTimeout(() => { 
      this._campaignService.toggleCampaignsHistory( false );
    }, 150 );

  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    
    this.closeHistory();

  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    
    this.closeHistory();
    
  }

  changePage( event: string | number ) {
    if ( event === 'next' ) {

      if( this.page + 1 > this.totalPages ) {
        alert('Te encuentras en la ultima Pagina !');
        return;
      }
      this.getNewItems( this.page + 1 );
    
    } else if ( event === 'back' ) {

      if( this.page - 1 < 1 ) {
        alert('Te encuentras en la primer Pagina !');
        return;
      }
      this.getNewItems( this.page - 1 );
    
    } else if ( event === this.totalPages ) {

      this.getNewItems( this.totalPages );
      
    }
  }

  getNewItems( page: number = 1, limit: number = 10, order: number = -1 ) {
    this._campaignService.getCampagins( page, limit, order ).subscribe(( response: any ) => {
      if ( response.error ) return;
      this.page = response.data.page;
      this.totalPages = response.data.totalPages;
      this.campaigns = response.data.docs;
    }, ( err ) => console.log( err ));
  }

  ngAfterViewChecked() {
    this.scrollToBottom( this.historyList.nativeElement );  
  } 

  scrollToBottom( element: any ) {
    try {
      element.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) { }
    
  }

}
