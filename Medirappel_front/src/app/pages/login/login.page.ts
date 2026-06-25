import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';

// #region agent log
fetch('http://127.0.0.1:7765/ingest/54608c58-b194-4e91-87ad-991a055ea519',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'bb5ba7'},body:JSON.stringify({sessionId:'bb5ba7',runId:'pre-fix',hypothesisId:'H1',location:'src/app/pages/login/login.page.ts:6',message:'LoginPage module evaluated',data:{standalone:true},timestamp:Date.now()})}).catch(()=>{});
// #endregion

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
],
})
export class LoginPage implements OnInit {

  constructor() {
    // #region agent log
    fetch('http://127.0.0.1:7765/ingest/54608c58-b194-4e91-87ad-991a055ea519',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'bb5ba7'},body:JSON.stringify({sessionId:'bb5ba7',runId:'pre-fix',hypothesisId:'H2',location:'src/app/pages/login/login.page.ts:18',message:'LoginPage constructor reached',data:{component:'LoginPage'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }

  ngOnInit() {
    // #region agent log
    fetch('http://127.0.0.1:7765/ingest/54608c58-b194-4e91-87ad-991a055ea519',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'bb5ba7'},body:JSON.stringify({sessionId:'bb5ba7',runId:'pre-fix',hypothesisId:'H3',location:'src/app/pages/login/login.page.ts:23',message:'LoginPage ngOnInit reached',data:{lifecycle:'ngOnInit'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
  }

}
