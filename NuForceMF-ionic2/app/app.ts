import {Component, Renderer,ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {SchedulePage} from './pages/schedule/schedule';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public renderer: Renderer
  ) {

    renderer.listenGlobal('document','mfpjsloaded',()=>{
      console.log("MFP API Init Complete");
      this.MFPInitComplete();
    })
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  MFPInitComplete(){
        console.log("MFP Init function called");
        this.initializeApp();
        // set our app's pages
        this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Schedule', component: SchedulePage }
        ];
  }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
