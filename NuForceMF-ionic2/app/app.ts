import {Component, Renderer,ViewChild} from '@angular/core';
import {Events,ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {SchedulePage} from './pages/schedule/schedule';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {AccountPage} from './pages/account/account';
import {AboutPage} from './pages/about/about';

import {UserData} from './providers/user-data/user-data';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  appPages: PageObj[] = [
    {title: 'Home', component: HomePage, index: 1, icon: 'home'},
    { title: 'Schedule', component: SchedulePage, icon: 'calendar' },
    { title: 'Speakers', component: HomePage, index: 2, icon: 'contacts' },
    { title: 'Map', component: HomePage, index: 3, icon: 'map' },
    { title: 'About', component: AboutPage, index: 4, icon: 'information-circle' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: HomePage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  
  rootPage: any = HomePage;
  private AuthHandler:any;
  //pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public renderer: Renderer,
    public events: Events,
    public userData: UserData
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
        /*this.pages = [
          { title: 'Login', component: LoginPage },
          { title: 'Home', component: HomePage },
          { title: 'Schedule', component: SchedulePage }
        ];*/
        // decide which menu items should be hidden by current login status stored in local storage
        this.AuthInit();
  }
  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      console.log("user:login event fired");
      this.enableMenu(true);
      //this.nav.push(HomePage);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    console.log("enableMenu called"+loggedIn);
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
  AuthInit(){
    /*this.AuthHandler = WL.Client.createSecurityCheckChallengeHandler("UserLogin");
    this.AuthHandler.handleChallenge =((success)=>{
      console.log("Inside handle challenge");
      this.displayLogin();
    },(failure)=>{
      console.log("");
    })*/
    this.userData.storage.clear();
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
          console.log("User has logged in"+hasLoggedIn);
          this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
    //this.userData.storage = null;
        
  }
  displayLogin(){
      console.log("display login called");
  }
}

ionicBootstrap(MyApp,[UserData]);
