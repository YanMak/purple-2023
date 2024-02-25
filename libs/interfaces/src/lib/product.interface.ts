//<categories>
//	<category id="6323" picture = "https://xxx/xxx/xxx.jpg" > Смартфоны и гаджеты < /category>
//		< category id = "183" parentId = "6323" picture = "https://xxx/xxx/xxx.jpg" > Смартфоны < /category>
//			</categories> 
export interface IProductCategory {
	id: string;
	parentId: string;
	picture: string // - URL картинки категории
	//textColor - цвет текста(опционально)
	//backgroundColor - цвет фона(опционально)
	//universalLink - URL страницы категории на сайте магазина(опционально)
	title: string// - имя категории(обязательно при использовании сегментов в категории)
}

//<rec title="Похожие товары">213741,1899435,1630074</rec>
//<rec title="Дополни образ" > 666000, 777000 < /rec>
//Для товаров из списка рекомендаций, объединённых в группы(см.атрибутgroup_id), необходимо указывать их идентификатор группы вместо товарного предложения, т.е.значение из group_id = "***", а не offer id = "***".
export interface IRec {
	id: string;
	title: string;
	value: string[];
}

export interface IProduct extends IProduct_Raw {
	id: string;
	available: boolean;
	publishedOn: Date; // - дата релиза товара для подключения автоматической сортировки по старым / новым товарам
	itemPreviewUrl: string;
	uuid: string;	// - атрибут, дополнительный идентификатор товара(например, из 1С)
	sizeGridImage: string; // - атрибут, URL - ссылка на картинку с размерами для примерки
	groupId: string;
	barcodes: string[];
	title: string; // - полное название предложения, в которое входит: тип товара, производитель, модель и название товара, важные характеристики.Составляйте по схеме: что(тип товара) + кто(производитель) + товар(модель, название) + важные характеристики.
	sort: number// порядок сортировки по популярности
	url: string // - URL страницы товара на сайте магазина
	vendor: string;	//- производитель.
	vendorCode: string;// - 
	modelName: string;	// - модель и название товара.
	categoryIds: string[] // - идентификатор категории товара, присвоенный магазином.Элемент offer может содержать несколько элементов categoryId, в этом случае каждая из категорий передается в отдельном теге.
	param: string[][]; // - все важные характеристики товара — цвет, размер, объем, материал, вес, возраст, пол, и т.д.Элемент offer может содержать несколько элементов param(один элемент param — одна характеристика), в этом случае каждая характеристика передается в отдельном теге. (при использовании перелинковки цвета отдавать в hex формате или указывать URL изображения в атрибуте itemImage).
	pictures: string[]; //						picture - URL - ссылка на картинку товара.Элемент offer может содержать несколько элементов picture, в этом случае каждая из картинок передается в отдельном теге.
	currencyId: string; // - валюта, в которой указана цена товара: RUR, USD, EUR, UAH, KZT, BYN.
	price: number; // - актуальная цена товара.
	priceUnits: string // - единица измерения.
	oldPrice: number; // - старая цена товара, должна быть выше текущей.
	priceLabel: string; // - текст вместо цены товара для кейса когда товара нет в наличии но есть возможность подписаться на него только для клиентов с elassticSearch
	description: string; //- описание предложения.
	collapsibleDescription: string;// - описание со сворачивающимися блоками
	rec: IRec[]
	vat: string
}

interface IProduct_Raw {
	id: string;
	available: boolean;
	publishedOn: Date; // - дата релиза товара для подключения автоматической сортировки по старым / новым товарам
	itemPreviewUrl: string; // - атрибут, URL - ссылка на страницу с 3D - моделью товара(на страницу с 3D предпросмотром, не на карточку товара).
	fraction: string; // - кратность товара, с которой можно добавлять его в корзину.Например, если fraction = 0.2, то добавлять в корзину можно только 0.2, 0.4, 0.6 и т.д.единиц товара.
	//fraction необходим для включения функционала.По умолчанию кратность всегда 1 к 1.
	//Цена указывается за 1(одну) полную единицу товара(не за 0.2, 0.3 и т.д).
	uuid: string;	// - атрибут, дополнительный идентификатор товара(например, из 1С)
	sizeGridImage: string; // - атрибут, URL - ссылка на картинку с размерами для примерки
	groupId: string;
	barcodes: string[];
	title: string; // - полное название предложения, в которое входит: тип товара, производитель, модель и название товара, важные характеристики.Составляйте по схеме: что(тип товара) + кто(производитель) + товар(модель, название) + важные характеристики.
	sort: number// порядок сортировки по популярности
	url: string // - URL страницы товара на сайте магазина
	//guid - параметр необходимый при прямой интеграции mindbox чтобы определять какой товар смотрел юзер.Значение должно быть то же которое настроено в mindbox
	vendor: string;	//- производитель.
	vendorCode: string;// - код производителя для данного товара.
	modelName: string;	// - модель и название товара.
	//typePrefix - тип / категория товара(например, «мобильный телефон», «стиральная машина», «угловой диван»).
	categoryIds: string[] // - идентификатор категории товара, присвоенный магазином.Элемент offer может содержать несколько элементов categoryId, в этом случае каждая из категорий передается в отдельном теге.
	// googleProductCategory - google product category(GPC) taxonomy для товара.
	param: string[][]; // - все важные характеристики товара — цвет, размер, объем, материал, вес, возраст, пол, и т.д.Элемент offer может содержать несколько элементов param(один элемент param — одна характеристика), в этом случае каждая характеристика передается в отдельном теге. (при использовании перелинковки цвета отдавать в hex формате или указывать URL изображения в атрибуте itemImage).
	pictures: string[]; //						picture - URL - ссылка на картинку товара.Элемент offer может содержать несколько элементов picture, в этом случае каждая из картинок передается в отдельном теге.
	// !we must provide for different prices later
	currencyId: string; // - валюта, в которой указана цена товара: RUR, USD, EUR, UAH, KZT, BYN.
	price: number; // - актуальная цена товара.
	//priceByCard - цена товара по скидочной карте(в разработке), должна быть ниже обычной цены.Несовместимо с oldrice.
	priceUnits: string // - единица измерения.
	oldPrice: number; // - старая цена товара, должна быть выше текущей.
	//Так же есть возможность показывать старую цену в зависимости от сегмента пользователя.
	//< oldprice > 20000 < /oldprice>
	//< oldprice priceTier = "silver" > 19500 < /oldprice>
	//	< oldprice priceTier = "gold" > 19400 < /oldprice>
	//		< oldprice priceTier = "platina" > 19300 < /oldprice>
	//			< oldprice priceTier = "vip" > 19200 < /oldprice>
	//saleEndsDateIso - Дата время до окончания акции по аналогии с датой фида у яндекса.
	//retailPrice - РРЦ товара(цена товара в оффлайне в случае если отличается от price).
	//deferPrice - цена на случай отсрочки получения, должна быть ниже price.
	//listPrice - необязательно, справочные цены, если нужно показать несколько цен, только для отображения, в расчетах не используются.
	//		title - атрибут, текстовое описание цены.
	priceLabel: string; // - текст вместо цены товара для кейса когда товара нет в наличии но есть возможность подписаться на него только для клиентов с elassticSearch
	//< priceLabel > Скоро в продаже < /priceLabel>
	description: string; //- описание предложения.
	collapsibleDescription: string;// - описание со сворачивающимися блоками
	//collapsibleDescription -> section(дочерние элементы)
	//section(атрибуты)
	//lang – локализация(необязательно)
	//expanded – укажите expanded = "true", чтобы секция была развернута по умолчанию.Опционально.
	//title – заголовок
	//text – описание(поддерживается markdown)
	rec: IRec[]// - идентификаторы товаров для блока рекомендаций через запятую.Возможно передавать несколько блоков с подборками товаров, например "Похожие товары", "С этим покупают", "Дополни образ" итд.Для этого следует передать несколько тегов rec с атрибутом title(см пример). 
	//Для товаров из списка рекомендаций, объединённых в группы(см.атрибутgroup_id), необходимо указывать их идентификатор группы вместо товарного предложения, т.е.значение из group_id = "***", а не offer id = "***".
	//maxPromocodeDiscountPercent - максимальный процент скидки на данный товар, например, по купону.Используется для ограничения размера скидки, например, для товаров с низкой маржинальностью.
	vat: string// - значение ставки НДС для товара.Для всех ставок НДС предусмотрены специальные значения.
	//НДС не облагается - 6 или NO_VAT
	//0 % - 5 или VAT_0
	//10 % - 2 или VAT_10
	//20 % - 7 или VAT_20
	//useBonuses - возможность частичной или полной оплаты данного товара с бонусного счета при наличии программы лояльности.
	//overSized - крупногабаритный товар.
	//preorder - параметр для товаров по предзаказу.
	//badge - бейджик на картинке товара.Элемент offer может содержать несколько элементов badge, в этом случае каждый из бейджик передается в отдельном теге.В одном бейдже может быть либо только текстовый вариант, либо только с картинкой.И текст и картинка в одной бейдже быть не могут.
	//textColor, атрибут, необязательно - цвет текста в формате #rrggbb
	//bgColor, атрибут, необязательно - цвет фона для текстового бейджа в формате #rrggbb
	//link, атрибут, необязательно - ссылка при нажатии на бейджик
	//position атрибут, необязательно - задает позицию бейджа на карточке товара.Возможные значения: top - right, top - left, bottom - left, bottom - right
	//video - видео товара(можно передать несколько).Видео должны быть в формате H.264.
	//main - если true, то видео будет отображаться в слайдере с фотографиями товара
	//title - опциональный заголовок видео
	//image - URL на картинку, которая отображается, пока грузится видео
	//file - релевантные документы.
	//title - название
	//size(опционально) - вес файла для отображения на кнопке в приложении
	//icon(опционально) - иконка для отображения на кнопке в приложении
	//url - ссылка на скачивание
	//rating - рейтинг товара для отображения на карточке товара сверху(не путать с хуком отзывов на товары).
	//reviews_count - количество отзывов для отображения в ячейке и на карточке товара сверху(не путать с хуком отзывов на товары).
	//sizeGridPageUrl - URL - ссылка на HTML с таблицей размеров(отобразится, если не задан в атрибутах sizeGridImage и нет sizeGridImgUrl в settings)
	//othercolors - блок товаров "еще в другом цвете", перечислить group Id товаров с альтернативными цветами.Не используется вместе с parentVendorCode.
	//parentVendorCode - по данному параметру объединяем товары для перелинковки(позволяет добавлять переключаемые параметры на карточку товара) не должен пересекаться с group id, не используется вместе с othercolors
	//cashback - кол - во кэшбека
	//Так же есть возможность показывать кэшбек в зависимости от сегмента пользователя.
	//< cashback > 100 < /cashback>
	//< cashback priceTier = "silver" > 110 < /cashback>
	//	< cashback priceTier = "gold" > 120 < /cashback>
	//		< cashback priceTier = "platina" > 130 < /cashback>
	//			< cashback priceTier = "vip" > 140 < /cashback>

	/*< offer id = "998822" available = "true" group_id = "222222" >
						<barcode>4627077842287 < /barcode>
						< name > Ботинки кожаные < /name>
							< url > https://xxx.ru/xxx./</>
<sort>8 < /sort>
	< price > 450 < /price>
	< oldprice > 650 < /oldprice>
	< priceByCard > 390 < /priceByCard>
	< retailPrice > 790 < /retailPrice>
	< deferPrice > 550 < /deferPrice>
	< priceUnits > м²</>
		< currencyId > RUB < /currencyId>
		< saleEndsDateIso > 2020 - 11 - 22T14: 37: 38 < /saleEndsDateIso>
			< guid > 241921 < /guid>
			< cashback > 100 < /cashback>
			< vendor > BrandName < /vendor>
			< vendorCode >0000 - 667838 < /vendorCode>
			< categoryId > 1728 < /categoryId>
			< model > V198605N - 1568C68 < /model>
				< typePrefix > Ботинки < /typePrefix>
				< param name = "Размер" > 39 < /param>
					< param name = "Цвет" hex = "#0000FF" > Синий < /param>
						< param name = "Материал подошвы" > Каучук < /param>
							< param name = "Материал верха" > Кожа < /param>
								< param name = "Обложка" noFilter = "true" > Мягкая < /param>
									< description > Прекрасные ботинки известного бренда < /description>
										< googleProductCategory > Apparel & amp; Accessories > Clothing > Shirts & amp; Tops < /googleProductCategory>
											< rec title = "Похожие товары" > 213741, 1899435, 1630074 < /rec>
												< rec title = "Дополни образ" > 666000, 777000 < /rec>
													< badge textColor = "#000" bgColor = "#CCFF33" > НОВИНКА < /badge>
														< badge picture = "https://xxxxx/xxxxxx.png" < /badge>
															< maxPromocodeDiscountPercent > 0 < /maxPromocodeDiscountPercent>
															< vat > vat_20 < /vat>
															< picture > https://xxxx/xxxx/image1.jpg</>
<picture>https://xxxx/xxxx/image2.jpg</picture>
<useBonuses>true < /useBonuses>
	< preorder > true < /preorder>
	< rating > 4.5 < /rating>
	< reviews_count > 130 < /reviews_count>
	< video main = "true" image = "https://xxxxxx" > https://xxx.ru/xxx.mp4</>
<video title="Видео-инструкция" image = "https://xxx.ru/xxx.mp4</video>
	< file title = "Руководство пользователя" size = "24mb" icon = "https://xxx.ru/xxx.png" url = "https://xxxxxxx/x.pdf" />
}*/

	/*
	<url>https://incity.ru/incity/odezhda/platya_sarafany_tuniki/1.1.1.20.01.44.05027%7C006064/</url>
	<price>899 < /price>
		< oldprice > 1999 < /oldprice>
		< vat > VAT_20 < /vat>
		< currencyId > RUR < /currencyId>
		< categoryId > 2535 < /categoryId>
		< picture > https://incity.ru/upload/iblock/ff3/edynznwesfpfc4lybn06ecccs68vpgta.jpg</>
	<picture>https://incity.ru/upload/iblock/6f8/zly3q75uujubxgqtm70g4jltliuc26jz.jpg</picture>
	<picture>https://incity.ru/upload/iblock/b13/rist16ykbvmk1l9586fhsmtu8xq2ndy1.jpg</picture>
	<picture>https://incity.ru/upload/iblock/58e/ryvmis0u2c4jxmzaly0mx2lup5sudkuo.jpg</picture>
	<picture>https://incity.ru/upload/iblock/cfc/2o2g3qf44y5bqqr2jivo61i9x4bobbjh.jpeg</picture>
	<picture>https://incity.ru/upload/iblock/9ea/ccp9nhk4i64f4o60qlymg6fxeup4gmpn.jpeg</picture>
	<delivery>true < /delivery>
		< pickup > true < /pickup>
		< name > Бежевое платье - рубашка INCITY, цвет бежевый, размер XS < /name>
			< model > Бежевое платье - рубашка < /model>
				< vendor > INCITY < /vendor>
				< description > Платье рубашка средней длины выполнено из легкой вискозы песочного бежевого оттенка.Свободные рукава с имитацией отворота.Два кармана на груди.Пояс на шлевках.< /description>
					< country_of_origin > Индия < /country_of_origin>
					< param name = "Цвет" > бежевый < /param>
						< param name = "size" > XS < /param>
							< param name = "Пол" > Женский < /param>
								< param name = "Стиль" > повседневный < /param>
									< param name = "Узор" > однотонный < /param>
										< param name = "Длина" > мини < /param>
											< param name = "Длина рукава" > короткий рукав < /param>
												< param name = "Вырез" > отложной воротник < /param>
													< param name = "Фасон" > приталенный < /param>
														< param name = "Тип рукава" > спущеное плечо < /param>
															< param name = "Состав" > 100 % вискоза < /param>
																< param name = "Цвет товара для фильтра" > бежевый < /param>
																	< param name = "Цвет товара для карточки" > бежевый < /param>
																		< weight > 0.37 < /weight>
																		< dimensions > 25 / 27 / 2 < /dimensions>
																		< shop - sku > 2029009223409 < /shop-sku>
																		< count > 1 < /count>
																		< vendorCode > 1.1.1.20.01.44.05027 /006064 < /vendorCode>
																			< param name = "Размер" unit = "INT" > XS < /param>
	*/
}