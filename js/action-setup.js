
let setRadioAction = ()=>{
	$('input[name=search-by]').on('change',(event)=>{
		target = $(event.target).attr('value');

		if(target==='title'){
			
			$('#title').removeAttr('disabled').focus().trigger('keyup');
			$('#id').attr('disabled','true').val('');

		} else if(target=='id'){

			$('#id').removeAttr('disabled').focus().trigger('keyup');
			$('#title').attr('disabled','true').val('');

		} else{
			console.log('invalid checkbox id');
		}
	});
}//enable and diable input based on radio selection	

let setSearchAction = ()=>{
	$('.submit-btn').on('click',(event)=>{
		event.preventDefault();
		
		if(isInputValid()){
			let inputObj = readUserInput();
			requestApi(inputObj);
		} else {
			
		}
	});
}

let setCardClick = ()=>{
	$('.custom-card').on('click',function(){
		let inputObj = { 
			searchBy:'id',
			search:$(this).attr('imdbid')};
			requestApi(inputObj);
	});
}

let setMoreClick = ()=>{
	$('a.more-btn').on('click',(event)=>{
		event.preventDefault();
		requestMore();
	})
}

let setInputValidation = ()=>{

	$('#id').on('keyup',()=>{
		
		if(isInputValid()){
			enableSubmit();
		}else{
			disableSubmit();
		}
	});

	$('#title').on('keyup',()=>{
		if(isInputValid()){
			enableSubmit();
		}else{
			disableSubmit();
		}
	});
}//enable or disable submit buttom based on valid input

let setYearValidation = ()=>{
	$('#year-filter').on('keyup',function(){
		$(this).val($(this).val().replace(/[^0-9]/,""));
	});
}//prevent non numeric inputs for year