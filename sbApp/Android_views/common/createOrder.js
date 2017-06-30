/**
 * Created by DELL on 2017/6/29.
 */
import  BaseComponent, {base} from '../base/Base' ;
let {
    N028_ORDERS$_GET_ORDERS,//获取订单列表
    J002_PAY$_VERIFICATION_ORDER_PAY,
    J003_PAY$_RESULT_ORDER_PAY,
    N015_ORDERS$_CREATE_ORDERS,//创建订单
    N034_USERS$_GET_ADDRESS,//获取用户地址
    } = base.requests;

let {
    IDENTIFICATION_WXPAY_DEBUG,//微信支付 测试
    IDENTIFICATION_ALIPAY_DEBUG,//支付宝  测试
    USER_DEFAULT_ADDRESS,//用户默认地址 key值字段
    KEY_PHONE,//
    } = base.fields;
var CreatOrder = {
    //创建订单
    _createOrder:function(callback){
        var params = {
            "Comments": "",
            "ServiceCategoryId": "639299b8-3e20-439c-aacb-e63c3b64b606",
            "CompanyId": "b0b27d2a-49a3-4083-a893-da9925c9c5ca",
            "ItemDetails": "395a36ce-30dd-4a85-91aa-d15b16003324;1",
            "ServiceTimeCategory": "1",
            "ServiceTimeValues": "21:30-22:00",
            "ServiceDate": "2017-06-30",
            "AddressId": "31128524-32f4-4110-b6ef-48afbe146141"
        }
        base.network.getUipData(N015_ORDERS$_CREATE_ORDERS, params, (success) => {
                callback(success.id);//回调抛出订单ID
            },
            (error) => {
                alert("下单失败" + error)
            }
        )

    },
    //获取订单信息
    _getOrderDetailInfo:function(orderId,callback){
        base.network.getUipData(N028_ORDERS$_GET_ORDERS, {'id': orderId}, (success) => {
            if (success && success.length > 0) {
                callback(success[0])//回调抛出订单信息
            }
        }, (error) => {
            alert("获取订单信息失败" + error)
        })
    },
    //微信支付
    _payWX:function(orderDate){
        if (!orderDate) {
            return ;
        }
        var params={};
        params.identification=IDENTIFICATION_WXPAY_DEBUG;
        params.total_fee=orderDate.totalAmount;
        params.bill_no=orderDate.paySign;
        params.title=orderDate.serviceCategory.name;
        params.quantity=orderDate.goodsCount;
        base.payTool.startPay(params)
            .then((succ)=>{
                alert('_payWX succ:'+JSON.stringify(succ))
            })
            .catch((error)=>{
                alert('_payWX error:'+JSON.stringify(error))
            });
    }
}
module.exports = CreatOrder;
