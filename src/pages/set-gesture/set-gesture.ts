import { Component ,ViewEncapsulation} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController,Events } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { NativeServiveProvider } from '../../providers/native-servive/native-servive';
import { Md5 } from 'ts-md5/dist/md5';
import { ERR } from 'ngx-gesture-password';

/**
 * Generated class for the SetGesturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'SetGesturePage'
})
@Component({
  selector: 'page-set-gesture',
  templateUrl: 'set-gesture.html',
  encapsulation: ViewEncapsulation.None
})
export class SetGesturePage {
  public phone:any;                              //手机号码
  public pwd: any;                               //手势密码
  public type: any;                              //判断是第一次绘制还是第二次绘制
  public options: any;                           //手势的样式

  public gesture_btn:any;                        //首页进入就隐藏掉返回按钮
  public gesture:boolean;                        //判断手势有没有设置
  public draw:number;                            //绘制的手势的判断显示对应的title提示
  public gesture_height:any;                     //高度
  public gesture_code:number;                    //次数
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api:ApiServiceProvider,
     public nativeservice: NativeServiveProvider,
     public modalCtrl:ModalController,
     public alertCtrl:AlertController,
     public events:Events,
     ) {
  }

  //返回
  return(){
     if(this.navParams.get('ZC_type')=='注册'){
         let modal=this.modalCtrl.create('RegisterSuccessPage');
        modal.present();
     }
     this.viewCtrl.dismiss();
  }

  
  //进入页面
  ionViewWillEnter(){
      this.phone=JSON.parse(localStorage.getItem('personal')).accountName;
      this.gesture_code=5;
      this.onChangeOptions();
      this.gesture_height='300px';
      this.is_gesture();

    //  alert('手势页面')
    //  alert(JSON.stringify(localStorage.getItem('personal')));
    //  alert(JSON.stringify(localStorage.getItem('handlock_passwd')));
  }

  //手势是否有设置保存本地缓存
  is_gesture(){
      console.log(this.pwd);
      if(localStorage.getItem('handlock_passwd')){
          this.pwd=localStorage.getItem('handlock_passwd');
          this.gesture=true;
          this.type='check';
          this.draw=3;
          this.gesture_btn=false;
      }else{
          this.pwd='';
          this.gesture=false;
          this.type='recorder';
          this.draw=0;
          this.gesture_btn=true;
      }
  }


  //设置手势样式
   onChangeOptions() {
       this.options = {
            bgColor: '#EE792E',                        //背景颜色
            focusColor: '#ffffff',                     //当前选中的圆的颜色
            fgColor: '#ffffff',                        //未选中的圆的颜色
            innerRadius:30,                            //圆点的内半径
            outerRadius:55,                            //圆点的外半径，focus 的时候显示
            touchRadius:70,                            //判定touch事件的圆半径
            num: 3,                                    //圆点的数量
            render:true,                               //自动渲染
            passwords: Array(9).fill(0).map((i, index) => String.fromCharCode(index + 65))
        };
   }


   //设置手势的判断
    onChecked(data: any) {
        console.log('onChecked', data);
        switch (data.err) {
            case ERR.NOT_ENOUGH_POINTS:
               this.nativeservice.showToast('请连接至少4个点')
                break;
            case ERR.PASSWORD_MISMATCH:
                this.draw=4;
                this.gesture_code--;
                if(this.gesture_code==0){
                    this.presentAlert('消息提醒','您的输入手势密码次数已经达到5次，请用帐号密码进行登录。')
                }
                break;
            default:
                if(this.navParams.get('core')!='待机广告失效'){
                    this.events.publish('user:Ad'); 
                }
                console.log('广告已经订阅2');
                 this.api.login(JSON.parse(localStorage.getItem('personal')).accountName,Md5.hashStr(JSON.parse(localStorage.getItem('personal')).password)).map(data => data.json()).subscribe(data => {
                     if(data.code=='000000'){
                         localStorage.setItem('state','true');
                         this.viewCtrl.dismiss();
                     }else{
                        //  alert('没有服务器');
                     }
                })
                break;
        }
    }


     //未设置手势的判断
    onBeforeRepeat(data: any) {
        console.log(data);
        console.log('onBeforeRepeat', data);
        switch (data.err) {
            case ERR.NOT_ENOUGH_POINTS:
             this.nativeservice.showToast('请连接至少4个点')
                break;
            default:
                this.draw=1;                 //请再次绘制相同图案
                break;
        }
    }

     //未设置手势的判断
    onAfterRepeat(data: any) {
        console.log('onAfterRepeat', data);
        switch (data.err) {
            case ERR.NOT_ENOUGH_POINTS:
             this.nativeservice.showToast('请连接至少4个点')
                break;
            case ERR.PASSWORD_MISMATCH:
                this.draw=2;            //两次绘制的图形不一样,请重新绘制!
                break;
            default:
                localStorage.setItem('handlock_passwd',this.pwd);       //保存手势密码
                if(this.navParams.get('ZC_type')=='注册'){
                   let modal=this.modalCtrl.create('RegisterSuccessPage');
                   modal.present();
                   this.viewCtrl.dismiss();
                }else{
                    this.viewCtrl.dismiss('注册成功');
                }
                break;
        }
    }

    //个人首页从手势跳转登录
    to_login(){
        // localStorage.removeItem('personal');
        let modal=this.modalCtrl.create('LoginPage',{ type :'登录状态失效' });
        modal.present();
        this.viewCtrl.dismiss();
        // this.events.publish('user:tzc');
    }

    //弹窗
    presentAlert(title,subTitle) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            enableBackdropDismiss:false,
            buttons: [{
                text: '确定',
                role: 'cancel',
                handler: () => {
                    this.viewCtrl.dismiss();
                    let modal=this.modalCtrl.create('LoginPage',{ type :'登录状态失效' });
                    modal.present();
                    localStorage.clear();
                }
            }]
        });
        alert.present();
    }

    presentAlert1(title) {
        let alert = this.alertCtrl.create({
            title: title,
            buttons: ['确定']
        });
        alert.present();
    }

}
