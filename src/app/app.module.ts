import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { CareersComponent } from './careers/careers.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { LaCostCalculatorComponent } from './la-cost-calculator/la-cost-calculator.component';

import { CommercialComponent } from './services/commercial/commercial.component';
import { ArchitecturalComponent } from './services/architectural/architectural.component';
import { StructuralComponent } from './services/structural/structural.component';
import { BuildingPlanComponent } from './services/building-plan/building-plan.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

registerLocaleData(en);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'lacostcalculator', component: LaCostCalculatorComponent },
  { path: 'services/commercial', component: CommercialComponent },
  { path: 'services/architectural', component: ArchitecturalComponent },
  { path: 'services/structural', component: StructuralComponent },
  { path: 'services/building-plan', component: BuildingPlanComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutusComponent,
    ServicesComponent,
    ProjectsComponent,
    CareersComponent,
    BlogComponent,
    ContactComponent,
    LaCostCalculatorComponent,
    CommercialComponent,
    ArchitecturalComponent,
    StructuralComponent,
    BuildingPlanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzIconModule,
    NzSelectModule,
    NzCardModule,
    NzAvatarModule,
    NzGridModule,
    NzTypographyModule,
    // ✅ Updated routing configuration with scroll-to-top behavior
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top', // ✅ Scroll to top on navigation
      anchorScrolling: 'enabled',       // Optional: allows #anchor links to work
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
