window.onload = function(){
	$(".preloader").fadeOut()
}
Vue.use(VueLazyload, {
	preLoad: 2,
	loading: 'loading-spin.svg',
	attempt: 1
})
var vm = new Vue({
	el: '#app',
	data: () => ({
		currentStep: 1,
		counterPlus: 1,
		counterMinus: 1,
		konPath: "",
		isMasked : false,
		num : [],
		roofs: {},
		params: {},
		resultList: {},
		mainRoof: "",
		imgPath: "https://terrazn-dom.by/wp-content/themes/blankslate/calc/img/roofs/",
		fullImgPath : "",
		holder_count: 0,
		facade_holder: 0,
		wire_length: 0,
		control_sum: 0,
		steps : {
			step_1_name: "Форма крыши",
			step_2_name: "Материал крыши",
			step_3_name: "Конёк",
			step_4_name: "Дымоходы и шахты",
			step_5_name: "Фасад",
			step_6_name: "Замеры",
			step_7_name: "УЗип",
			step_8_name: "Товарный чек",
		},
		stepChoose: ["Выберите Форму крыши","Выберите Материал крыши", "Выберите Конёк", "Выберите Дымоход", "Выберите Фасад","Замеры","Выберите УЗип","Товарный чек"],
		septBreadCrumbs: [],
		optionsCodes : {
			material_code: "",
			kon_code: "",
			chimney_code: "",
			front_code: "",
		},
		result : {
			shape:"",
			material:"",
			skate:"",
			chimney:"",
			superstructures:"",
			facade:"",
			priming:"",
			grounding_sustem:"",
			wires:"",
		},
		measurements : {
			skate_length:0,
			house_height:0,
			slope_length:0,
			first_chi_length:0,
			second_chi_length:0,
			third_chi_length:0
		},
	}),

	methods: {
		fullImage(roofCode, folder){
			if(this.currentStep == 3){
				this.fullImgPath = this.imgPath + this.mainRoof + folder + this.optionsCodes.material_code + '/' + roofCode + '-full.png'
			}else if(this.currentStep == 5){
				this.fullImgPath = this.imgPath + this.mainRoof + folder + roofCode + '.png'
			}
			else{
				this.fullImgPath = this.imgPath + this.mainRoof + folder + roofCode + '-full.png'
			}		
		},

		Step(step){
			$(".step_circle").removeClass("active")
			
			for(let i = 0; i < this.currentStep+1; i++){
				$($(".step_circle")[i]).addClass("active")
			}

			if(this.mainRoof == "Sharovaya"){
				this.num = ["R3","R4","R5"]
				$(".skat").css("display","none")
			}else{
				this.num = ["R4","R5","R6"]
			}

			if(step == 'Next'){
				if (this.currentStep == 1 && this.result.shape == "") {
					alert(this.stepChoose[this.currentStep-1])
					return false
				}
				if (this.currentStep == 2 && this.result.material == "") {
					alert(this.stepChoose[this.currentStep-1])
					return false
				}
				if (this.currentStep == 3 && this.result.skate == "") {
					alert(this.stepChoose[this.currentStep-1])
					return false
				}
				if(this.currentStep == 4){
					if(this.result.chimney == ""){
						alert(this.stepChoose[this.currentStep-1])
						return false
					}
					if(this.result.superstructures == ""){
						alert(`Выберете Материал кровельных надстроек`)
						return false
					}
				}
				if (this.currentStep == 5 && this.result.facade == "") {
					alert(this.stepChoose[this.currentStep-1])
					return false
				}
				if (this.currentStep == 6) {
					if(this.result.priming == ""){
						alert(`Выберете Тип грунта`)
						return false
					}
				}
				if (this.currentStep == 7) {
					if(this.result.grounding_sustem == ""){
						alert(`Выберете Способ ввода электропроводки в здание`)
						return false
					}
					if(this.result.wires == ""){
						alert(`Выберете Количество проводов`)
						return false
					}
				}
				if(this.mainRoof == "Odnokatnaya"  && this.currentStep == 1){
					this.counterPlus = 2
				}else{
					this.counterPlus = 1
				}
				if(this.mainRoof == "Odnokatnaya" && this.currentStep == 2){
					this.currentStep += 2
					this.counterMinus = 2
				}else{
					this.counterMinus = 1
					this.currentStep ++
				}
			}else{
				if(this.mainRoof == "Odnokatnaya" && this.currentStep == 4){
					this.currentStep -= 2
					this.counterMinus = 1
					this.counterPlus = 2
				}else{
					this.counterPlus = 1
					this.currentStep --
				}
			}
		},

		CleanCounters(){
			for (let key in this.measurements) {
				this.measurements[key] = 0
			}
		},

		resultTable(){
			this.holder_count = this.measurements.slope_length*2 + this.measurements.first_chi_length + this.measurements.second_chi_length + this.measurements.third_chi_length
			this.facade_holder = this.measurements.house_height *2
			if(this.result.shape == "Шатровая"){
				this.wire_length = Math.ceil((this.measurements.skate_length + this.measurements.house_height*2 + (this.measurements.first_chi_length + this.measurements.second_chi_length + this.measurements.third_chi_length) + 5)*0.4)
			}else{
				this.wire_length = Math.ceil((this.measurements.skate_length + this.measurements.slope_length*2 + this.measurements.house_height*2 + (this.measurements.first_chi_length + this.measurements.second_chi_length + this.measurements.third_chi_length) + 5)*0.4)
			}
		},

		controlSum(){
			let sum = 0
			var pos = 0
			$(".price").map((index,element) =>{
				sum = sum + parseInt($(element).text())
				$($(".pos")[index]).text(pos += 1)
			})
			this.control_sum = sum
		},

		savePdf(){
			let getTableData = function(){
				var resultTablemas = [['№','Наименование товара','ед. изм.','Количество', 'Цена с НДС, BYN']]
				$("#result_table .resLine").map(function(index,element){
					let tableString = []
					$(element).find("td").map(function(index,text){
						tableString.push($(text).text())
					})
					resultTablemas.push(tableString)
				})
				resultTablemas.push([{text:'Сумма',bold:true,colSpan:4},{},{},{},{text:$("#result_table .sum").text(),bold:true}])

				return resultTablemas
			}
			var docInfo = {
		 
				info: {
					title:'Товарный чек',
					author:'TERRAZN',
				},
				
				pageSize:'A4',
				pageOrientation:'portrait',
				pageMargins:[20,50,20,60],
				
				content: [
					{text:'ООО "ТерраЦинк"',margin:[0,3,0,3]},
					{text:'Юридический адрес: 223050, Минская область, Минский район, Колодищанский с/с, 175, район агрогородка Колодищи, кабинет 209. Почтовый адрес: 223050 Минская обл., Минский район, пос. Колодищи ул. Парковая 17',margin:[0,3,0,3]},
					{text:'УНП 691788197',margin:[0,3,0,3]},
					{text:'Банк получатель:',bold:true,margin:[0,3,0,3]},
					{text:'Приорбанк ОАО ЦБУ 117 220141, г. Минск, пр. Независимости, 172 (PRIORBANK, MINSK, REPUBLIC OF BELARUS)',margin:[0,3,0,3]},
					{text:'Р/с бел.руб: BY64PJCB30120599061000000933',margin:[0,3,0,3]},
					{text:'BIC SWIFT: PJCBBY2X',margin:[0,3,0,3]},	
					{
						text:'Товарный чек',
						fontSize:20,
						margin:[0,20,0,20],
						alignment:'center'
					},
					{
						table:{
							widths:['auto','auto','auto','auto','auto'],
							body:getTableData(),
							headerRows:1
						}
					},
					{text:$(".mat_structure").text(),margin:[0,20,0,3]},
					{text:$(".electro").text(),margin:[0,3,0,3]},
					{text:$(".wires_count").text(),margin:[0,3,0,0]},
				]
			}
			pdfMake.createPdf(docInfo).download('price.pdf');
		}
	},

	mounted(){
		axios
		.get('main.json')
		.then(response => (this.roofs = response.data));	
		axios
		.get('param.json')
		.then(response => (this.params = response.data));	
		axios
		.get('result-list.json')
		.then(response => (this.resultList = response.data));	
	},

	updated(){
		this.controlSum()
		
		if(this.mainRoof == "Odnokatnaya" && this.currentStep == 4 || this.mainRoof == "Odnokatnaya" && this.currentStep == 5){
			this.konPath = ""
		}else{
			this.konPath = this.optionsCodes.kon_code + '-'
		}

		if(this.currentStep == 6){
			if(this.mainRoof == "Odnokatnaya"){
				this.konPath = `${this.imgPath + this.mainRoof}/mask/${this.optionsCodes.material_code}/${this.optionsCodes.chimney_code}/${this.optionsCodes.front_code}.png`
			}else{
				this.konPath = `${this.imgPath + this.mainRoof}/mask/${this.optionsCodes.material_code}/${this.optionsCodes.kon_code}/${this.optionsCodes.chimney_code}/${this.optionsCodes.front_code}.png`
			}
			$(".mask_style").remove()
			$(".full_img_section").append(`
				<style class="mask_style">
					.full_img_section.masked .img_box:before{
						background: url(${this.konPath}) center/contain no-repeat;
					}
				</style>
			`)
			this.isMasked = true

			if(this.optionsCodes.chimney_code == "two"){
				$(".two_chi").css("display","block")
				console.log($(".two_chi"))
			}

			if(this.optionsCodes.chimney_code == "three"){
				$(".two_chi").css("display","block")
				$(".three_chi").css("display","block")
			}

		}else{
			$(".mask_style").remove()
			this.isMasked = false
		}
	}
})

$( ".options_section").on( "click", ".cr_element", function() {
	$(".cr_element.active").removeClass("active")
	$(this).addClass("active")
});


