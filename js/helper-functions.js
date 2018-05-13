let readUserInput = ()=>{
	let obj ={};
	
	let radioInput = $('input[name=search-by]:checked').attr('value');

	if(radioInput==='title'){
		obj.searchBy = radioInput;
		obj.search = $('#title').val().trim();
		obj.year = $('#year-filter').val().trim();
		obj.plot = $('#plot-filter').val().trim();
		obj.typ = $('#type-filter').val().trim();
		

	} else if (radioInput==='id'){
		obj.searchBy = radioInput;
		obj.search = $('#id').val().trim().toLowerCase();
		obj.year = $('#year-filter').val().trim();
		obj.plot = $('#plot-filter').val().trim();
		obj.typ = $('#type-filter').val().trim();

	}else{

		console.log('invalid search');

	}

	return obj;
}//reads the input and returns an obj

let presetRadio =()=>{
	$('#title-search-radio').attr("checked","true")
	$('#title').focus();
	$('#id').attr('disabled','true')
} //sets up the initial radio options

let isInputValid = ()=>{
	return !($(`#${$('input[name=search-by]:checked').attr('value')}`).val()=='');
}//returns if the current active option has valid input


let generateUrl = (input)=>{

	const baseUrl = "https://www.omdbapi.com";
	const apikey = "9016ffe2";
	let url = `${baseUrl}/?r=json&apikey=${apikey}`;


	if(input.searchBy==='id'){
		url=`${url}&i=${input.search}`;

	}else if (input.searchBy==='title'){
	
		url=`${url}&s=${input.search}`;
		
	}

	if(input.year!=null && input.year!=undefined && input.year!=""){
		url=`${url}&y=${input.year}`;
	}

	if(input.typ!=null && input.typ!=undefined && input.typ!=""){
		url=`${url}&type=${input.typ}`;
	}

	if(input.plot!=null && input.plot!=undefined && input.plot!=""){
		url=`${url}&plot=${input.plot}`;
	}

	return url;
}


let addSmallCard = (element, item,before=false)=>{
	if(before){
		element.before(`<div class="col-12 col-md-6 col-lg-4">
						<div class="card custom-card" imdbid=${item.imdbID}>
						  <img class="card-img-top" 
						  	src= "${item.Poster}" alt="Card image cap">
						  <div class="card-body">
						    <h5 class="card-title text-truncate">${item.Title}</h5>
						    <p class="card-text">Year: ${item.Year.substring(0,4)}</p>
						  </div>
						</div>
					</div>`);
	}else {
		element.append(`<div class="col-12 col-md-6 col-lg-4">
						<div class="card custom-card" imdbid=${item.imdbID}>
						  <img class="card-img-top" 
						  	src= "${item.Poster}" alt="Card image cap">
						  <div class="card-body">
						    <h5 class="card-title text-truncate">${item.Title}</h5>
						    <p class="card-text">Year: ${item.Year.substring(0,4)}</p>
						  </div>
						</div>
					</div>`);
	}	
}

let addDetailCard = (element,item)=>{
	
	element.append(`<div class="col-12 col-md-5 img-area">
						<img src="${item.Poster}">
					</div>
					<div class="col-12 col-md-7 info-area">
						<div class="row no-gutters">
							<div class="col-12">
								<div class="row">							
									<div class="col-12">
										<span class="title">${item.Title} ${year(item.Year)} ${lang(item.Language)} ${type(item.Type)}</span>	
									</div>
									${rating(item.imdbRating,item.imdbVotes)}
									${duration(item.Runtime)}
								</div>					
							</div>						
							${rated(item.Rated)}

							${release(item.Released,item.Country)}

							${genre(item.Genre)}

							${production(item.Production)}

							${director(item.Director)}

							${writer(item.Writer)}

							${staring(item.Actors)}

							${story(item.Plot)}

							${awards(item.Awards)}
							
							${boxOffice(item.BoxOffice)}
							
							${seasons(item.totalSeasons)}	

							${website(item.Website)}
						</div>
					</div>`);
}


// content setting utilites for Detail card
let year =(year)=>{
	if(year && year != "N/A") return `(${year.substring(0,4)})`;
	else return "";
}

let lang =(lang)=>{
	if(lang && lang != "N/A") return `(${lang})`;
	else return "";
}

let type = (type)=>{
	if(type && type != "N/A") return `(${type})`;
	else return "";
}


let rating = (rating,votes)=>{
	if(!votes) votes = 0;
	if(rating && rating!="N/A"){
		return `<div class="col-12">
			<i class="fas fa-star star-icon"></i>
			<span class="rating">${rating}</span>
			<span class="rating-base">/10</span>
			<span class="total-votes">(${votes})</span>		
		</div>`;
	}else return "";
}

let duration=(dur)=>{
	if(dur && dur != "N/A"){
		return `<div class="col-12 text-right">
					<span class="duration">${dur}</span>
				</div>`;
	}else return "";
}

let rated  = (rated)=>{
	if(rated=='N/A') rated ="Not Yet Rated";
	if(rated){
		return `<div class="col-12 col-md-6">
					<p class="feature" id="rated"> <span class="feature-title">Rated</span> : ${rated}</p>
				</div>`;
	}
}

let release =(year,country)=>{
	if(year && year!="N/A"){
		let result;
		if(country && country!=`N/A`){
			result = `<div class="col-12 col-md-6">
							<p class="feature" id="release"><span class="feature-title">Release</span> : ${year} (${country})</p>
						</div>`;
		}else {
			result = `<div class="col-12 col-md-6">
							<p class="feature" id="release"><span class="feature-title">Release</span> : ${year}</p>
						</div>`;
		}

		return result;
	}else return "";
}

let genre = (genre)=>{
	if(genre && genre!='N/A'){
		return `<div class="col-12">
					<p class="feature" id="genre"><span class="feature-title">Genre</span> : ${genre}</p>
				</div>`;
	}else return "";
}

let production = (prod)=>{
	if(prod && prod!='N/A'){
		return `<div class="col-12">
					<p class="feature" id="production"><span class="feature-title">Production</span> : ${prod}</p>
				</div>`;
	}else return "";
}

let director = (director)=>{
	if(director && director!='N/A'){
		return `<div class="col-12">
					<p class="feature" id="director"><span class="feature-title">Director(s)</span> : ${director}</p>
				</div>`;
	}else return "";	
}

let writer = (writer)=>{
	if(writer && writer!='N/A'){
		return `<div class="col-12">
					<p class="feature" id="writer"><span class="feature-title">Writer(s)</span> : ${writer}</p>
				</div>`;
	}else return "";
}

let staring = (cast)=>{
	if(cast && cast!='N/A'){
		return `<div class="col-12">
					<p class="feature" id="actors"><span class="feature-title">Staring</span> : ${cast}</p>
				</div>`;
	}else return "";
}

let story = (plot)=>{
	if(plot && plot!='N/A'){
		return `<div class="col-12">
					<p class="feature" id="plot"><span class="feature-title">Plot</span> : ${plot}</p>
				</div>`;
	}else return "";
}

let awards = (awards)=>{
	if(awards && awards!='N/A'){
		return `<div class="col-12">
					<p class="feature" id="awards"><span class="feature-title">Awards</span> : ${awards}</p>
				</div>`;
	}else return "";
}

let boxOffice = (amount)=>{
	if(amount && amount!='N/A'){
		return `<div class="col-12 col-md-8">
					<p class="feature" id="box-office"><span class="feature-title">Box Office</span> : ${amount}</p>
				</div>`;
	}else return "";
}

let seasons = (count)=>{
	if(count && count!='N/A'){
		return `<div class="col-12 col-md-8">
					<p class="feature" id="seasons"><span class="feature-title">Seasons</span> : ${count}</p>
				</div>`;
	}else return "";
}

let website = (link)=>{
	if(link && link!='N/A'){
		return `<div class="col-12 col-md-4">
					<a class="website-link" href="${link}" target="_blank">
						<i class="fas fa-globe globe-icon"></i>
						Visit website
					</a>
				</div>`;
	}else return "";
}

// hide and show utilities
let showLoader = ()=>{
	$('.loader-container').show(100);
}

let hideLoader = ()=>{
	$('.loader-container').fadeOut(100);
}

let setMessage= (msg) => {
	setTimeout(()=>{$('#message').text(msg);},100)
}

let showDisplayArea = ()=>{
	$('.display-area').show(100);
}

let hideDisplayArea = ()=>{
	$('.display-area').hide(100);
}

let showCards = ()=>{
	$('.cards-container').show(100);
	$('.cards-container').css('display','flex');
}

let hideCards = ()=>{
	$('.cards-container').hide(100);
}

let hideResult = ()=>{

	$('#result-area').hide(100);
}

let showResult = ()=>{

	$('#result-area').show(100);
}

let showDetailCard = ()=>{
	$('.detail-result-container').show(100);
	$('.detail-result-container').css('display','flex');
}

let hideDetailCard = ()=>{
	$('.detail-result-container').hide(100);
}

let showErrorIcon = ()=>{
	$('#error-icon-container').fadeIn(100);
}

let hideErrorIcon = ()=>{
	$('#error-icon-container').fadeOut(100);
}

let showMessage = ()=>{
	$('.message-container').fadeIn(100);
}

let hideMessage = ()=>{
	$('.message-container').fadeOut(100);
}

let displayApiError = ()=>{
	hideLoader();
	showErrorIcon();
	showMessage();
}

let scrollToResult=()=>{
	let position = $('#result-area').offset().top;
	$("body, html").animate({
		scrollTop: position
	});
}

let scrollToDisplay=()=>{
	let position = $('.display-area').offset().top;
	$("body, html").animate({
		scrollTop: position
	});
}

let disableSubmit = ()=>{
	$('input[type=submit]').attr('disabled','true');
}

let enableSubmit =()=>{
	$('input[type=submit]').removeAttr('disabled');
}

let disableMore = ()=>{
	$('a.more-btn').off('click');
}
