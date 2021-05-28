
let step_1_name = "Форма крыши",
step_2_name = "Материал крыши",
step_3_name = "Конёк",
step_4_name = "Дымоходы и шахты",
step_5_name = "Фасад",
step_6_name = "Замеры",
step_7_name = "УЗип",
step_8_name = "Товарный чек",
current_step = 1,
file_name = "",
img_patch = "",
cur_mat = "",
cur_kon = "",
cur_chi = "",
cur_fas = "",
cur_zam = "",
check = false,
button = "+",
steps_name = ["Форму крыши", "Материал крыши", "Конёк", "Дымоход", "Фасад","Замеры","УЗип","Товарный чек"],
first_step = "",
main_roof = ""
result = {
    shape:"",
    material:"",
    skate:"",
    chimney:"",
    superstructures:"",
    facade:"",
    priming:"",
    zamery:0,
    grounding_sustem:"",
    wires:""
}
measurements = {
    skate_length:0,
    house_height:0,
    slope_length:0,
    first_chi_length:0,
    second_chi_length:0,
    third_chi_length:0
}

var mat_code = ""
var kon_code = ""
var chi_code = ""
var front_code = ""


function full() {
$(".option_element").click(function() {
    $(".full_img_section").html(`<img src="${$(this).data("full")}">`)

    if (current_step == 1) {
        file_name = $(this).data("roof")
        img_patch = "https://terrazn-dom.by/wp-content/themes/blankslate/calc/img/roofs/" + file_name
        result.shape = $(this).find(".title").text()
    }
    if (current_step == 2) {
        cur_mat = $(this).data("mat")
        result.material = $(this).find(".title").text()
    }
    if (current_step == 3) {
        cur_kon = $(this).data("kon")
        result.skate = $(this).find(".title").text()
    }
    if (current_step == 4) {
        cur_chi = $(this).data("chi")
        result.chimney = $(this).find(".title").text()
        
    }
    if (current_step == 5) {
        cur_fas = $(this).data("fas")
        result.facade = $(this).find(".title").text()
    }
})
}
full()

function sw(current_step) {
switch (current_step) {
    case 2:
        step2()
        break;
    case 3:
        step3()
        break;
    case 4:
        step4()
        break;
    case 5:
        step5()
        break;
    case 6:
        step6()
        break;
    case 7:
        step7()
        break;
    case 8:
        step8()
        break;
}

$(".steps_info .current_step").text(current_step)
$(".steps_info .current_section").text(steps_name[current_step-1])
$(".steps_circles .step_circle").removeClass("active")
for(let i = 0; i<current_step; i++){
    let q = $(".steps_circles .step_circle")[i]
    $(q).addClass("active")
}
if (button == "+") {
    if (current_step == 8) {
        $(".next_btn").addClass("hidden")
        $(".prev_btn .prev_step").text(current_step - 1)
        $(".prev_btn .prev_cat").text(eval(`step_${current_step-1}_name`))
        return false
    }
    if (file_name == "Odnokatnaya" && current_step == 2) {
        $(".btn").removeClass("hidden")
        $(".next_btn .next_step").text(current_step + 2)
        $(".next_btn .next_cat").text(eval(`step_${current_step+2}_name`))
        $(".prev_btn .prev_step").text(current_step - 1)
        $(".prev_btn .prev_cat").text(eval(`step_${current_step-1}_name`))
        return false
    }
    $(".btn").removeClass("hidden")
    $(".next_btn .next_step").text(current_step + 1)
    $(".next_btn .next_cat").text(eval(`step_${current_step+1}_name`))
    $(".prev_btn .prev_step").text(current_step - 1)
    $(".prev_btn .prev_cat").text(eval(`step_${current_step-1}_name`))


    
}
if (button == "-") {
    if (current_step == 1) {
        $(".options_section").replaceWith(first_step);
        $(".prev_btn").addClass("hidden")
        $(".next_btn .next_step").text(current_step + 1)
        $(".next_btn .next_cat").text(eval(`step_${current_step+1}_name`))
        return false
    }
    if (file_name == "Odnokatnaya" && current_step == 4) {
        $(".btn").removeClass("hidden")
        $(".next_btn .next_step").text(current_step + 1)
        $(".next_btn .next_cat").text(eval(`step_${current_step+1}_name`))
        $(".prev_btn .prev_step").text(current_step - 2)
        $(".prev_btn .prev_cat").text(eval(`step_${current_step-2}_name`))
        return false
    }
    $(".next_btn").removeClass("hidden")
    $(".next_btn .next_step").text(current_step + 1)
    $(".next_btn .next_cat").text(eval(`step_${current_step+1}_name`))
    $(".prev_btn .prev_step").text(current_step - 1)
    $(".prev_btn .prev_cat").text(eval(`step_${current_step-1}_name`))
}
}
$(".next_btn").click(function() {
if (current_step == 1 ) {
    if(result.shape == ""){
        alert(`Выберете ${steps_name[current_step-1]}`)
        return false
    }
    first_step = $(".options_section")[0]
    first_step = $(first_step).clone(true)
}
if (current_step == 2 && result.material == "") {
    alert(`Выберете ${steps_name[current_step-1]}`)
    return false
}
if (current_step == 3 && result.skate == "") {
    alert(`Выберете ${steps_name[current_step-1]}`)
    return false
}
if(current_step == 4){
    if(result.chimney == ""){
        alert(`Выберете ${steps_name[current_step-1]}`)
        return false
    }
    if(result.superstructures == ""){
        alert(`Выберете Материал кровельных надстроек`)
        return false
    }
}
if (current_step == 5 && result.facade == "") {
    alert(`Выберете ${steps_name[current_step-1]}`)
    return false
}
if (current_step == 6) {
    $(".zamery input").map(function(index,element){
        result.zamery = Math.ceil(result.zamery + parseInt($(element).val()))
    })
    measurements.skate_length = parseInt($(".zamery input[name=zamer-1]").val())
    measurements.house_height =  parseInt($(".zamery input[name=zamer-2]").val())
    measurements.slope_length =  parseInt($(".zamery input[name=zamer-3]").val())
    measurements.first_chi_length =  parseInt($(".zamery input[name=zamer-4]").val())
    measurements.second_chi_length =  parseInt($(".zamery input[name=zamer-6]").val())
    measurements.third_chi_length =  parseInt($(".zamery input[name=zamer-7]").val())
    if(result.priming == ""){
        alert(`Выберете Тип грунта`)
        return false
    }
}
if (current_step == 7) {
    if(result.grounding_sustem == ""){
        alert(`Выберете Способ ввода электропроводки в здание`)
        return false
    }
    if(result.wires == ""){
        alert(`Выберете Количество проводов`)
        return false
    }
}
if (current_step == 2 && file_name == "Odnokatnaya") {
        current_step += 2
}else{
    current_step++
}

button = "+"
sw(current_step)
})
$(".prev_btn").click(function() {
if (file_name == "Odnokatnaya" && current_step == 4) {
    current_step -= 2
} else {
    current_step--
}
button = "-"
sw(current_step)
})
function step2() {
	$(".options_section").html("")
	roof_param.always(function(data) {
		$.each(data.materials, function(key, val) {
			$(".options_section").append(`
                <div class="option_element" data-mat="${key}" data-full="${img_patch}/material/${val.code}-full.png">
                <img src="${img_patch}/material/${val.code}.png">
                <p class="title">${val.name}</p>
                </div>
            `)
		});
	})
	full()
}

function step3() {
	$(".options_section").html("")
	roof_param.always(function(data) {
		mat_code = data.materials[cur_mat].code
		$.each(data.konek, function(key, val) {
			$(".options_section").append(`
                <div class="option_element" data-kon="${key}" data-full="${img_patch}/konek/${mat_code}/${val.code}-full.png">
                <img src="${img_patch}/konek/${mat_code}/${val.code}.png">
                <p class="title">${val.name}</p>
                </div>
            `)
		});
	})

	full()
}

function step4() {
	$(".options_section").html("")
	roof_param.always(function(data) {
		mat_code = data.materials[cur_mat].code
		let r = ""
		if (file_name == "Odnokatnaya") {
			r = mat_code
		} else {
			kon_code = data.konek[cur_kon].code
			r = `${mat_code}-${kon_code}`
		}
		$.each(data.chimneys, function(key, val) {
			$(".options_section").append(`
                    <div class="option_element" data-chi="${key}" data-full="${img_patch}/chimney/${r}-${val.code}-full.png">
                    <img src="${img_patch}/chimney/${r}-${val.code}.png">
                    <p class="title">${val.name}</p>
                    </div>
                `)
		});
		$(".options_section").append(`
		<p class="steps_info" style="margin: 40px 0 20px 0;">Материал кровельных надстроек. Варианты</p>
		<div class="cr_mat">
			<div class="cr_element" title="Кирпичи"><img src="https://terrazn-dom.by/wp-content/themes/blankslate/calc/img/cr_mat-1.jpg"><span>Кирпичи</span></div>
			<div class="cr_element" title="Асбест (труба)"><img src="https://terrazn-dom.by/wp-content/themes/blankslate/calc/img/cr_mat-2.jpg"><span>Асбест (труба)</span></div>
			<div class="cr_element" title="Кирпич, обшитый металлопрофилем"><img src="https://terrazn-dom.by/wp-content/themes/blankslate/calc/img/cr_mat-3.jpg"><span>Кирпич, обшитый металлопрофилем</span></div>
			<div class="cr_element" title="Металлопрофиль (жесть)"><img src="https://terrazn-dom.by/wp-content/themes/blankslate/calc/img/cr_mat-4.jpg"><span>Металлопрофиль (жесть)</span></div>
			<div class="cr_element" title="Труба металлическая"><img src="https://terrazn-dom.by/wp-content/themes/blankslate/calc/img/cr_mat-5.jpg"><span>Труба металлическая</span></div>
		</div>
		`)
		$(".cr_element").click(function(){
			$(".cr_element.active").removeClass("active")
			$(this).addClass("active")
			result.superstructures = $(this).find("span").text()
		})
		full()
	})
}

function step5() {
	$(".options_section").html("")
	$(".full_img_section").removeClass("masked")
	roof_param.always(function(data) {
		chi_code = data.chimneys[cur_chi].code
		let r = ""
		if (file_name == "Odnokatnaya") {
			r = `${mat_code}-${chi_code}`
		} else {
			r = `${mat_code}-${kon_code}-${chi_code}`
		}
		$.each(data.front, function(key, val) {
			$(".options_section").append(`
				<div class="option_element" data-fas="${key}" data-full="${img_patch}/front/${r}-${val.code}.png">
				<img src="${img_patch}/front/${r}-${val.code}.png">
				<p class="title">${val.name}</p>
				</div>
			`)
		});
	})
	full()
}
function step6() {
	$(".options_section").html("")
	$(".full_img_section").addClass("masked")
	roof_param.always(function(data) {
		front_code = data.front[cur_fas].code
	})
	let path = ""
	if (file_name == "Odnokatnaya") {
		path = `${mat_code}/${chi_code}/${front_code}`
	} else {
		path = `${mat_code}/${kon_code}/${chi_code}/${front_code}`
	}
	$(".full_img_section").append(`
		<style>
			.full_img_section.masked:before{
				background: url(${img_patch}/mask/${path}.png) center/contain no-repeat;
			}
		</style>
	`)
	if(result.shape == "Шатровая"){
		var num = ["R3","R4","R5"]
	}else{
		var num = ["R4","R5","R6"]
	}
	if(result.zamery != 0){
		$(".options_section").append(`
		<div class="zamery">
			<label><span>Замер R1 (Длина конька,м)</span><input type="number" name="zamer-1" value="${measurements.skate_length}"></label>
			<label><span>Замер R2 (Высота дома,м)</span><input type="number" name="zamer-2" value="${measurements.house_height}"></label>
			<label class="skat"><span>Замер R3 (Длина ската,м)</span><input type="number" name="zamer-3" value="${measurements.slope_length}"></label>
			<label><span>${num[0]} Расстояние от конька до дымохода 1,м</span><input type="number" name="zamer-4" value="${measurements.first_chi_length}"></label>
			<label class="hidden two_chi"><span>${num[1]} Расстояние от конька до дымохода 2,м</span><input type="number" name="zamer-6" value="${measurements.second_chi_length}"></label>
			<label class="hidden three_chi"><span>${num[2]} Расстояние от конька до дымохода 3,м</span><input type="number" name="zamer-7" value="${measurements.third_chi_length}"></label>
		</div>
		`)
	}else{
		$(".options_section").append(`
		<div class="zamery">
			<label><span>Замер R1 (Длина конька,м)</span><input type="number" name="zamer-1" value="0"></label>
			<label><span>Замер R2 (Высота дома,м)</span><input type="number" name="zamer-2" value="0"></label>
			<label class="skat"><span>Замер R3 (Длина ската,м)</span><input type="number" name="zamer-3" value="0"></label>
			<label><span>${num[0]} Расстояние от конька до первого дымохода,м</span><input type="number" name="zamer-4" value="0"></label>
			<label class="hidden two_chi"><span>${num[1]} Расстояние от конька до второго дымохода,м</span><input type="number" name="zamer-6" value="0"></label>
			<label class="hidden three_chi"><span>${num[2]} Расстояние от конька до третего дымохода,м</span><input type="number" name="zamer-7" value="0"></label>
		</div>
		`)
	}
	if(result.shape == "Шатровая"){
		$(".skat").css("display","none")
	}
	if(cur_chi == "chimney_2"){
		$(".two_chi").css("display","block")
	}
	if(cur_chi == "chimney_3"){
		$(".two_chi").css("display","block")
		$(".three_chi").css("display","block")
	}





	$(".options_section").append(`
		<p class="steps_info" style="margin: 40px 0 20px 0;">Тип грунта:</p>
		<div class="ground_wrapper">
			<label><input type="radio" name="ground" value="Глина">Глина</label>
			<label><input type="radio" name="ground" value="Суглинок">Суглинок</label>
			<label><input type="radio" name="ground" value="Песок">Песок</label>
			<label><input type="radio" name="ground" value="Чернозем">Чернозем</label>
		</div>
	`)
	result.zamery = 0
	$(".ground_wrapper label").click(function(){
		result.priming = $(this).find("input").val()
	})
}
function step7() {
	$(".last_hidden").css("display","inline")
	$(".options_section").html(`
	<p class="steps_info" style="margin: 40px 0 20px 0;">Способ ввода электропроводки в здание:</p>
	<div class="ground_wrapper system">
		<label><input type="radio" name="gs" value="Воздушный">Воздушный</label>
		<label><input type="radio" name="gs" value="Подземный">Подземный</label>
		<label><input type="radio" name="gs" value="Не знаю">Не знаю</label>
	</div>
	<p class="steps_info" style="margin: 40px 0 20px 0;">Количество проводов:</p>
	<div class="ground_wrapper wires">
		<label><input type="radio" name="wires" value="2">2</label>
		<label><input type="radio" name="wires" value="3">3</label>
		<label><input type="radio" name="wires" value="4">4</label>
		<label><input type="radio" name="wires" value="5">5</label>
		<label><input type="radio" name="wires" value="Не знаю">Не знаю</label>
	</div>
	`)
	$(".ground_wrapper.system label").click(function(){
		result.grounding_sustem = $(this).find("input").val()
	})
	$(".ground_wrapper.wires label").click(function(){
		result.wires = $(this).find("input").val()
	})
}
function step8() {
	let obj = ""
	let position = 1
	$(".last_hidden").css("display","none")
	$(".options_section").html(`
	<div class="result_tabel">
		<div class="requisites">
			<p>ООО "ТерраЦинк"</p>
			<p>Юридический адрес: 223050, Минская область, Минский район, Колодищанский с/с, 175, район агрогородка Колодищи, кабинет 209. Почтовый адрес: 223050 Минская обл., Минский район, пос. Колодищи ул. Парковая 17.</p>
			<p>УНП 691788197</p>
			<p><strong>Банк получатель: </strong></p>
			<p>Приорбанк ОАО ЦБУ 117 220141, г. Минск, пр. Независимости, 172 (PRIORBANK, MINSK, REPUBLIC OF BELARUS)</p>
			<p>Р/с бел.руб: BY64PJCB30120599061000000933</p>
			<p>BIC SWIFT: PJCBBY2X</p>
		</div>
		<p class="bold">Товарный чек</p>
		<table>
			<thead>
				<tr>
					<td>№</td>
					<td class="name">Наименование <br> товара</td>
					<td class="ed">ед. <br> изм.</td>
					<td class="count">Коли-<br>чество</td>
					<td class="count">Цена с НДС, <br>BYN</td>
				</tr>
			</thead>
			<tbody>
				
			</tbody>
		</table>
		<p>Материал кровельных надстроек: <strong>${result.superstructures}</strong></p>
		
	</div>
	`)
	$(".result_tabel").fadeIn().css("display","flex")
	result_list.always(function(data) {
		let holder_count = measurements.slope_length*2 + measurements.first_chi_length + measurements.second_chi_length + measurements.third_chi_length
		$(".result_tabel tbody").append(`
		<tr>
			<td >${position}</td>
			<td class="name">${data.holder[result.material].name}</td>
			<td class="ed">шт</td>
			<td class="count">${holder_count}</td>
			<td class="price">${Math.round(data.holder[result.material].price * holder_count)}</td>
		</tr>
		`)
		if(result.skate != ""){
			position++
			$(".result_tabel tbody").append(`
			<tr>
				<td >${position}</td>
				<td class="name">${data.skate_holder[result.skate].name}</td>
				<td class="ed">шт</td>
				<td class="count">${measurements.skate_length}</td>
				<td class="price">${data.skate_holder[result.skate].price}</td>
			</tr>
			`)	
		}
		obj = data.chimney[result.chimney]
		for (var prop in obj) {
			position++
			$(".result_tabel tbody").append(`
			<tr>
				<td >${position}</td>
				<td class="name">${obj[prop].name}</td>
				<td class="ed">шт</td>
				<td class="count">${obj[prop].count}</td>
				<td class="price">${obj[prop].price}</td>
			</tr>
			`)
		}
		position++
		let facade_holder = measurements.house_height *2
		$(".result_tabel tbody").append(`
		<tr>
			<td >${position}</td>
			<td class="name">${data.facade_holder[result.facade].name}</td>
			<td class="ed">шт</td>
			<td class="count">${facade_holder}</td>
			<td class="price">${Math.round(data.facade_holder[result.facade].price * facade_holder)}</td>
		</tr>
		`)
		obj = data.priming_elements[result.priming]
		for (var prop in obj) {
			position++
			if(obj[prop].name == "Полоса оцинк 25х4"){
				$(".result_tabel tbody").append(`
				<tr>
					<td >${position}</td>
					<td class="name">${obj[prop].name}</td>
					<td class="ed">кг</td>
					<td class="count">${obj[prop].count}</td>
					<td class="price">${obj[prop].price}</td>
				</tr>
				`)
			}else{
				$(".result_tabel tbody").append(`
				<tr>
					<td >${position}</td>
					<td class="name">${obj[prop].name}</td>
					<td class="ed">шт</td>
					<td class="count">${obj[prop].count}</td>
					<td class="price">${obj[prop].price}</td>
				</tr>
				`)
			}
		}
		$(".result_tabel").append(`<p>Способ ввода электропроводки в здание: ${result.grounding_sustem}</p>`)
		if(result.wires != "Не знаю"){
			position++
			$(".result_tabel tbody").append(`
				<tr>
					<td >${position}</td>
					<td class="name">УЗИП: ${data.wires[result.wires].name}</td>
					<td class="ed">шт</td>
					<td class="count">1</td>
					<td class="price">${data.wires[result.wires].price}</td>
				</tr>
			`)
		}else{
			$(".result_tabel").append(`<p>Количество проводов: ${result.wires}</p>`)
		}
		position++
		let wire_length = 0
		
		switch (result.shape) {
			case "Четырехскатная":
				wire_length = Math.ceil((measurements.skate_length + measurements.slope_length*2 + measurements.house_height*2 + (measurements.first_chi_length + measurements.second_chi_length + measurements.third_chi_length) + 5)*0.4)
				break;
			case "Шатровая":
				wire_length = Math.ceil((measurements.skate_length + measurements.house_height*2 + (measurements.first_chi_length + measurements.second_chi_length + measurements.third_chi_length) + 5)*0.4)
				break;
			case "Однокатная":
				wire_length = Math.ceil((measurements.skate_length + measurements.slope_length*2 + measurements.house_height*2 + (measurements.first_chi_length + measurements.second_chi_length + measurements.third_chi_length) + 5)*0.4)
				break;
			case "Двускатная":
				wire_length = Math.ceil((measurements.skate_length + measurements.slope_length*2 + measurements.house_height*2 + (measurements.first_chi_length + measurements.second_chi_length + measurements.third_chi_length) + 5)*0.4)
				break;
			case "Мансардная":
				wire_length = Math.ceil((measurements.skate_length + measurements.slope_length*2 + measurements.house_height*2 + (measurements.first_chi_length + measurements.second_chi_length + measurements.third_chi_length) + 5)*0.4)
				break;
			case "Полувальмовая":
				wire_length = Math.ceil((measurements.skate_length + measurements.slope_length*2 + measurements.house_height*2 + (measurements.first_chi_length + measurements.second_chi_length + measurements.third_chi_length) + 5)*0.4)
				break;
		}
		$(".result_tabel tbody").append(`
				<tr>
					<td >${position}</td>
					<td class="name">Проволока ф8 оцинкованная</td>
					<td class="ed">кг</td>
					<td class="count">${wire_length}</td>
					<td class="price">${wire_length * 5.05}</td>
				</tr>
		`)
		let control_sum = 0
		$(".price").map(function(index,element){
			control_sum = control_sum + parseInt($(element).text())
		})
		$(".result_tabel tbody").append(`
				<tr>
					<td colspan="4" style="text-align: left;font-weight: bold;">Сумма</td>
					<td class="sum" style="text-align: right;font-weight: bold;">${control_sum}</td>
				</tr>
		`)

	})
}