let requestApi = (input)=>{

	let url = generateUrl(input);
	//save url for more button
	sessionStorage.setItem('url',url)
	let setting = {
		url,
		success:success,
		beforeSend: beforeSend,
		complete: complete,
		error:error,
		timeout:5000
	};


	if(input.searchBy=='id'){
		setting.success = successId;
	}	

	$.ajax(setting);
}

let requestMore = ()=>{

	let url = `${sessionStorage.getItem('url')}&page=${parseInt(sessionStorage.getItem('currentPage'))+1}`;
	console.log(url);
	let setting ={
		url,
		success:successMore,
		beforeSend:beforeMore,
		complete:completeMore,
		timeout:5000
	}

	$.ajax(setting);
}

let successId = (resp)=>{
	
	hideLoader();
	hideMessage();

	if(resp.Response.toLowerCase()!="true"){
		setMessage(resp.Error);
		setTimeout(displayApiError, 500);
	}else{

		let element = $('.detail-result-container').empty()
		if(!resp.Poster || resp.Poster=='N/A'){
			resp.Poster='img/poster-placeholder.png';
		}
		addDetailCard(element,resp)
		showDetailCard();
		showResult();
		setTimeout(scrollToResult,300)

	}
}

let success = (resp)=>{
	
	const resultsPerPage = 10;

	hideLoader();
	hideMessage();

	if(resp.Response.toLowerCase()!="true"){
		setMessage(resp.Error);
		setTimeout(displayApiError, 500);
		
	}else{

		element = $('.cards-container').empty().append(`<p class="help-text col-12">
						Click on a card below to see more details.
					</p>`);

		resp.Search.forEach((item)=>{
			if(item.Poster==undefined || item.Poster==null || item.Poster=='N/A'){
				item.Poster='img/poster-placeholder.png';
			}
			addSmallCard(element,item);
		});

		

		showCards();
		setCardClick();
		showResult();
		setTimeout(scrollToResult,300);

		//setting page count for future use
		totalPages= resp.totalResults/resultsPerPage;
		
		if(totalPages>1){
			
			element.append(`<div id="more" class="col-12 text-right">
						<a class="more-btn">
							More..
						</a>
					</div>`);
			setMoreClick();
			sessionStorage.setItem('currentPage',1);
		}
		

	}	
}


let successMore = (resp)=>{

	const resultsPerPage = 10;

	if(resp.Response.toLowerCase()!="true"){
		alert('failed');
		
	}else{

		element = $('#more');
		resp.Search.forEach((item)=>{
			if(item.Poster==undefined || item.Poster==null || item.Poster=='N/A'){
				item.Poster='img/poster-placeholder.png';
			}
			addSmallCard(element,item,true);
		});

		

		showCards();
		setCardClick();
		showResult();
		

		//setting page count for future use
		totalPages = Math.ceil(resp.totalResults/resultsPerPage);
		currentPage = parseInt(sessionStorage.getItem('currentPage'))+1;
		
		if( totalPages > currentPage){

			sessionStorage.setItem('currentPage',currentPage);

		} else{
			element.remove();
		}

	}
}

let beforeMore = ()=>{
	disableMore();
}

let completeMore = ()=>{
	setTimeout(setMoreClick,1000);
}


let beforeSend = ()=>{
	//prevent user from spamming the submit button
	disableSubmit();

	
	hideMessage();
	hideErrorIcon();
	hideResult();
	hideCards();
	hideDetailCard();

	setMessage('Getting Result. Please wait...');
	showDisplayArea();
	showLoader();
	showMessage();
	setTimeout(scrollToDisplay,300)

}

let complete = ()=>{
	//prevent user from spamming the submit button
	setTimeout(enableSubmit,2000);
	

}

let error =(resp,error,msg)=>{
	hideLoader();
	hideMessage();
	setMessage("Some error occurred.");
	setTimeout(displayApiError, 500);
	console.log(error);
}
