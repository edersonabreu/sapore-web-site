$(document).ready(function(){
	/*
	//////////////////////////////////
		Mask Plugin
	//////////////////////////////////
	*/
		$('.form-mask-js').each(function(){
			var m_type = $(this).attr('data-mask');
			switch(m_type){
				case 'celular': $(this).mask("(00) 00000-0000");
								$(this).attr('placeholder', "(__) _____-____");
								break;
				case 'telefone': $(this).mask("(00) 0000-0000");
								 $(this).attr('placeholder', "(__) ____-____");
								 break;
				case 'data': $(this).mask("00/00/0000");
								 $(this).attr('placeholder', "__/__/____");
								 break;
				case 'cpf': $(this).mask("000.000.000-00");
								 $(this).attr('placeholder', "___.___.___-__");
								 break;
				case 'cnpj': $(this).mask("00.000.000/0000-00");
								 $(this).attr('placeholder', "__.___.___/____-__");
								 break;
			}
		});

	/*
	//////////////////////////////////
		//Mask Plugin
	//////////////////////////////////
	*/	
});
