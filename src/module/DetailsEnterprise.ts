export class DetailsEnterpriseModule {
    amount:number;
    area:any;                   //地址
    bidUse:any;                 //借款用途
    business:any;               //行业
    cash:number;                //上年度现金流入
    complaints:any;             //涉诉情况
    credit:any;                 //征信情况

    fxpg:any;               //项目风险评估
    fxjg:any;                   //可能产生的风险结果
    db:any;                     ////如果db这个字段为F，担保相关的字段不返回,S才返回
    dbdesc:any;                 //担保机构介绍
    dbinfo:any;                 //担保情况
    dbjg:any;                    //担保机构


    desc:any;                    //借款描述
    dy:any;                      //资产抵押
    earnAmount:any;             //资产净值
    endDate:any;   
    fdbinfo:any;             //反担保情况
    fkcs:any;               //风险控制措施
    hasRelevant:any;        //判断身份证等。。图片是否存在
    lx:any;                  //投即计息
    operation:any;          //经营情况
    qyName:any;
    rate:number;            
    regAmount:number;       //注册资金
    regYear:number;         //注册年限
    repayDate:any;          
    repaySource:any;        //还款来源
    zr:any;                //持90天可转
    dys:any=[];            //抵押物    
   
 
}