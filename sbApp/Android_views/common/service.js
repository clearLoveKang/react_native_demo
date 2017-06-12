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
	verifiycode:'http://m.starqq.com/getImg'


}
module.exports = Douban_APIS;
