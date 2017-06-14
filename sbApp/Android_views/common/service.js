//接口API

var BaseURL = 'https://api.douban.com/v2/';

var Douban_APIS = {

	/*
	 图书搜索
	image 图书缩略图
	title 图书名称
	publisher 出版社
	author 作者
	price 价格
	pages 图书总页数
	*/
	book_search:BaseURL+'book/search',

	/*
	 图书详情
	image 图书缩略图
	title 图书名称
	publisher 出版社
	author 作者
	price 价格
	pages 图书总页数
	summary 图书介绍
	author_intro 作者介绍
	*/
	book_detail_id:BaseURL+'book/',

	/*
	 电影搜索
	images.medium 电影图像
	title 电影名称
	casts 电影演员
	rating.average 评分
	year 上映时间
	genres 标签
	alt 详情连接
	*/
	movie_search:BaseURL+'movie/search',
	// verifiycode:'http://m.starqq.com/sendSMS'
	verifiycode:'http://m.starqq.com/getImg',
	recommend: 'http://api.meituan.com/group/v1/recommend/homepage/city/1?__skck=40aaaf01c2fc4801b9c059efcd7aa146&__skcy=mrUZYo7999nH8WgTicdfzaGjaSQ=&__skno=51156DC4-B59A-4108-8812-AD05BF227A47&__skts=1434530933.303717&__skua=bd6b6e8eadfad15571a15c3b9ef9199a&__vhost=api.mobile.meituan.com&ci=1&client=iphone&limit=40&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-06-17-14-50363&offset=0&position=39.983497,116.318042&userId=10086&userid=10086&utm_campaign=AgroupBgroupD100Fab_chunceshishuju__a__a___b1junglehomepagecatesort__b__leftflow___ab_gxhceshi__nostrategy__leftflow___ab_gxhceshi0202__b__a___ab_pindaochangsha__a__leftflow___ab_xinkeceshi__b__leftflow___ab_gxtest__gd__leftflow___ab_gxh_82__nostrategy__leftflow___ab_pindaoshenyang__a__leftflow___i_group_5_2_deallist_poitype__d__d___ab_b_food_57_purepoilist_extinfo__a__a___ab_trip_yidizhoubianyou__b__leftflow___ab_i_group_5_3_poidetaildeallist__a__b___ab_waimaizhanshi__b__b1___a20141120nanning__m1__leftflow___ab_pind',


	 discount: 'http://api.meituan.com/group/v1/deal/topic/discount/city/1?ci=1&client=iphone&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-06-17-14-50363&userid=10086&utm_campaign=AgroupBgroupD100Fab_chunceshishuju__a__a___b1junglehomepagecatesort__b__leftflow___ab_gxhceshi__nostrategy__leftflow___ab_gxhceshi0202__b__a___ab_pindaochangsha__a__leftflow___ab_xinkeceshi__b__leftflow___ab_gxtest__gd__leftflow___ab_gxh_82__nostrategy__leftflow___ab_pindaoshenyang__a__leftflow___i_group_5_2_deallist_poitype__d__d___ab_b_food_57_purepoilist_extinfo__a__a___ab_trip_yidizhoubianyou__b__leftflow___ab_i_group_5_3_poidetaildeallist__a__b___ab_waimaizhanshi__b__b1___a20141120nanning__m1__leftflow___ab_pindaoquxincelue__a__leftflow___ab_i_group_5_5_onsite__b__b___ab_i_group_5_6_searchkuang__a__leftflow&utm_content=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&utm_medium=iphone&utm_source=AppStore&utm_term=5.7&uuid=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&version_name=5.7',

	 menuInfo: [
            { title: '美食', icon: require('../img/Home/icon_homepage_foodCategory.png') },
            { title: '电影', icon: require('../img/Home/icon_homepage_movieCategory.png') },
            { title: '酒店', icon: require('../img/Home/icon_homepage_hotelCategory.png') },
            { title: 'KTV', icon: require('../img/Home/icon_homepage_KTVCategory.png') },
            { title: '优惠买单', icon: require('../img/Home/icon_homepage_default.png') },
            { title: '周边游', icon: require('../img/Home/icon_homepage_foottreatCategory.png') },
            { title: '生活服务', icon: require('../img/Home/icon_homepage_lifeServiceCategory.png') },
            { title: '休闲娱乐', icon: require('../img/Home/icon_homepage_entertainmentCategory.png') },
            { title: '丽人/美发', icon: require('../img/Home/icon_homepage_beautyCategory.png') },
            { title: '购物', icon: require('../img/Home/icon_homepage_shoppingCategory.png') },

            { title: '丽人/美发', icon: require('../img/Home/icon_homepage_beautyCategory.png') },
            { title: '电影', icon: require('../img/Home/icon_homepage_movieCategory.png') },
            { title: '周边游', icon: require('../img/Home/icon_homepage_foottreatCategory.png') },
            { title: '酒店', icon: require('../img/Home/icon_homepage_hotelCategory.png') },
            { title: '优惠买单', icon: require('../img/Home/icon_homepage_default.png') },
            { title: '休闲娱乐', icon: require('../img/Home/icon_homepage_entertainmentCategory.png') },
            { title: 'KTV', icon: require('../img/Home/icon_homepage_KTVCategory.png') },
        ],



}
module.exports = Douban_APIS;
