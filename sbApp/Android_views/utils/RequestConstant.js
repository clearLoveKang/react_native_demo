/**
 *
 * @type {string}
 * 常量表===》请求网址
 */
// 用预生产或者测试服的

// 盈家的 Host  测试和预生产
export const HOST = 'http://testuip.innjia.com/test/api/innjiauip/';//测试
// export const HOST = 'http://testuip.innjia.com/pre/api/innjiauip/';//预生产



//---------------------以下为 methodId ---------------------------

//http://120.55.86.180:8980/index.php    UIP接口文档说明地址
//http://120.26.246.252:7095/  检测UIP链接数据情况  admin  123456

//品质生活栏目列表-[1009]-[Category]
export const CATEGORY_1009 = "1009";

//LOCK
export const LOCK_2008 = "2008";//电量，or绑定设备
export const LOCK_2014 = "2014";// 是否 绑定设备
export const LOCK_2013 = "2013";// 开锁
export const LOCK_1010 = "1010";// 获取用户优惠券 余额
export const LOCK_2033 = "2033";// 电表充值 获取充值列表
export const LOCKE_2045 = "2045";// 设置电表密码

export const REGISTERCOUPON_2028 = "2028";// 新用户注册 优惠券 获取详情


export const N001_VERSION$_BASE_CONFIG = "N001";// 获取基本配置
export const N002_USERS$_IS_EXIST = "N002";// 手机号是否存在
export const N003_USERS_GENERATE_CODE = "N003";// 发送验证码
export const N004_USERS$_GET_USER = "N004";// 获取用户信息,
export const N005_USERS$_EDIT_SYSUSERS = "N005";// 修改用户信息
export const N006_USERS$_LOG_OUT = "N006";// 注销用户
export const N007_USERS$_AVART = "N007";// 上传头像
export const N008_USERS$_THADERS_PWD = "N008";// 用户更新交易密码
export const N009_USERS$_VERIFY_CODE = "N009";// 校验验证码
export const N010_RECHARGES$_GET_RECHARGES = "N010";// 充值额度列表
export const N011_RECHARGES$_GENERATE_CODE = "N011";// 充值订单号
export const N012_USERS$_VERIFY_TRADERS_PWD = "N012";// 验证交易密码
export const N013_ORDERS$_PAY_ORDERS = "N013";// 钱包支付订单
export const N014_ARTICLES$_ADD_ARTICLE_SHARE = "N014";//分享
export const N015_ORDERS$_CREATE_ORDERS = "N015";//创建订单
export const N016_GOODS$_SERVICE_FEE_GET = "N016";//获取服务费
export const N017_GOODS$_GET_SC_GOODS = "N017";//获取商品列表
export const N019_USERS$_VOICE = "N019";//意见反馈
export const N020_FAQ$_ALL = "N020";//常见问题
export const N023_SCENARIOS$_SEND_IM_MSG = "N023";//场景
export const N025_ACTIVES$_GET_BANNERS = "N025";//签到分享
export const N026_CATEGORIES$_GET_ALL_CATEGORIES = "N026";//获取商品类目列表
export const N027_USERS$_GET_AMOUN_LIST = "N027";//获取账单明细
export const N028_ORDERS$_GET_ORDERS = "N028";//获取订单列表
export const N029_ORDERS$_CANCEL_ORDERS = "N029";//取消订单
export const N030_ORDERS$_COMPLETE_ORDERS = "N030";//确认收货
export const N032_USERS$_GET_COUPONS = "N032";//获取优惠券列表
export const N033_COUPONS$_EXCHANGE = "N033";//兑换优惠券
export const N034_USERS$_GET_ADDRESS = "N034";//获取用户地址
export const N035_USERS$_ADD_ADDRESS = "N035";//添加地址
export const N036_USERS$_EDIT_ADDRESS = "N036";//编辑地址
/*export const N037_USERS$_SET_DEFAULT = "N037";//设置默认地址*/
export const N038_USERS$_DELETE_ADDRESS = "N038";//删除地址
export const N039_ARTICLES$_GET_ARTICLES = "N039";// 发现列表
export const N040_ARTICLES$_GET_ARTICLE = "N040";// 获取文章详情
export const N041_ARTICLES$_GET_ARTICLE_COMMENTS = "N041";// 发现评价列表
export const N042_ARTICLES$_UP_VOTE = "N042";//点赞
export const N043_ARTICLES$_ADD_ARTICLE_COMMENTS = "N043";//发现文章评论
export const N044_BANNERS$_GET_DOTHING = "N044";// 首页banner文字
export const N045_BANNERS$_APP_BANNER_LIST = "N045";// 开屏广告// 4.1 首页导航及广告
export const N046_VERSION$_LAST_VERSION = "N046";// 获取app版本信息

export const J001_PAY$_ZERO_ORDER_PAY = "J001"; //0元支付
export const J002_PAY$_VERIFICATION_ORDER_PAY = "J002"; //支付请求
export const J003_PAY$_RESULT_ORDER_PAY = "J003"; //支付回调
export const J004_LEASE_SERVICE$_GET_NEWEST_LEASE = "J004"; //获取最新用户认证资料


export const J006_SERVICE$_UPLOAD_IMGS = "J006";// 认证 多图片上传
// TEST
export const J008_SERVICE$_UPLOAD_IMG = "J008";// 单传图片
export const J007_SERVICE$_SAVE_LEASE = "J007";// 提交认证
export const J009_SERVICE$_SAVE_LEASE = "J009";// 查询租金分期还款提醒


export const HOT_SUPERIOR_1008 = "1008";// 热销优品

export const LOGIN_1004 = "1004";// 登录
export const REGISTER_1005 = "1005";// 注册


export const SIGN_1003 = "1003";// 抽奖
export const SIGN_1007 = "1007";// 领奖
export const SIGN_2001 = "2001";// 获取签到状态
export const SIGN_2002 = "2002";// 会员签到
export const SIGN_2003 = "2003";// 抽奖记录
export const SIGN_2005 = "2005";// 当日抽奖记录

export const CategoryGoods_1019 = "1019";// 品质生活
export const GetUnUsedCoupon_3002 = "3002";// 优惠券过期

export const J014_PAY_ACQUIREPAGECREATEANDPAY = "J014";// 代扣
export const J015_PAY_SETTLEACQUIREPAGECREATEANDPAY = "J024";// 签约代扣 并支付

export const REPAYMENTPLAN_1026 = "1026";// 请求还款计划

export const OPENACCOUNT_1034 = "1034";// 根据第三方的OPENID登录
export const OPENACCOUNT_1035 = "1035";// 绑定第三方账号


export const LOCATION_6003 = "6003";// 获取定位城市列表
export const MSG_6002 = "6002";// 获取最新未读消息列表
export const MSG_6001 = "6001";// 获取最新未读消息概要

export const HOME_6005 = "6005";// 获取APP首页推荐房源

export const TENANT_5021 = "5021";// 租客 租约
export const TENANT_4019 = "4019";// 租客 单个租约
export const TENANT_1045 = "1045";// 租客 租约状态
export const TENANT_J016 = "J016";// 用户是否是租金分期用户
export const TENANT_6009 = "6009";// 获取用户交租历史
export const TENANT_4031 = "4031";// 租客查看自己的签约历史
export const TENANT_4028 = "4028";// 完善租客户身份信息并确认合同 contractId必传


export const ADDRESS_RANG_6008 = "6008";// 查询订单商品是否在配送范围
export const COUPON_AVAIL_6007 = "6007";// 获取是否有可用优惠券
export const HOME_MULTY_REMIND_6010 = "6010";// APP首页显示逾期、退租、租约待确认的提示消息