var vm = new Vue({
	el: '#app',
	data: () => ({
		currentStep: 1,
		roofs: {},
		params: {},
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
		}
	}),
	computed:{

	},
	methods: {
		firstStep(roof){
		},
		fullImage(roofCode){
			this.fullImgPath = this.imgPath + this.mainRoof + '/' + roofCode + '.png'
		},
		NextStep(EO){
			this.currentStep ++ 
		},
	},
	mounted(){
		axios
		.get('main.json')
		.then(response => (this.roofs = response.data));	
		axios
		.get('param.json')
		.then(response => (this.params = response.data));	
	}

})



