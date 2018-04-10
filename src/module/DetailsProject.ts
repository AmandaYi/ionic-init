export class DetailsProjectModule {
    id: number;     //id--id
    ckEndTime: number;  //筹款时间
    bidTitle:any; //标题
    amount:number; //项目规模【金额】
    publishTime:any;
    paymentType:any;//还款方式
    isDanBao:any;
    peopleNum:number; 
    endTime:any;      //项目到期时间
    guarantee:any;   //担保机构
    qxTime:number;  //判断是起息时间
    bidtype:number; //判断是什么标，0普通标， 1体验标，null债券
    type:number;  //type类型
    remainAmount; //可投金额
    userXJQ;//是否能选择--》优惠券
    alrAmount;//体验标金额 目前：8888.00元
    salePrice;//债券转让 金额
    orderNo;//订单号。。债券标有， 普通标只有购买时返回才有，分清楚
  }