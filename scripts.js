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
			zamery:0,
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
	computed:{

	},
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
			let holder_count = this.measurements.slope_length*2 + this.measurements.first_chi_length + this.measurements.second_chi_length + this.measurements.third_chi_length
			console.log(this.resultList.holder[this.result.material].price * holder_count)
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
		if(this.mainRoof == "Odnokatnaya" && this.currentStep == 4 || this.mainRoof == "Odnokatnaya" && this.currentStep == 5){
			this.konPath = ""
		}
		else{
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
				.full_img_section.masked:before{
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

