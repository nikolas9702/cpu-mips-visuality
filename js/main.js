
tinymce.init({
	selector: 'textarea#codesample',
	height: 500,
	plugins: 'codesample code',
	codesample_languages: [
		{text: 'HTML/XML', value: 'markup'},
		{text: 'JavaScript', value: 'javascript'},
		{text: 'CSS', value: 'css'},
		{text: 'PHP', value: 'php'},
		{text: 'Ruby', value: 'ruby'},
		{text: 'Python', value: 'python'},
		{text: 'Java', value: 'java'},
		{text: 'C', value: 'c'},
		{text: 'C#', value: 'csharp'},
		{text: 'C++', value: 'cpp'}
	],
	toolbar: 'codesample code',
	content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});


let code = document.querySelector('#codesample')
code.addEventListener("change" , e => {
	sendCode( {
		"source":e.target.innerHTML,
		"compiler":"mips5","options":{"userArguments":"","compilerOptions":{"produceGccDump":{},"produceCfg":false},
		"filters":{"binary":true,"execute":false,"intel":true,"demangle":true,"labels":true,"libraryCode":true,"directives":true,"commentOnly":true,"trim":false},
		"tools":[],"libraries":[]},"lang":"c++","allowStoreCodeDebug":true}
	)
})

function sendCode ( data ) {
	fetchPOST('/api/compiler/gs3/compile',data).then(response => {
		let result = '';
		let resultHexa = '';
		response.asm.forEach( asm => {
			result += `
				<div class="alert alert-primary" role="alert">
					${asm.text}
				</div>`;
			resultHexa +=  MIPS.fill ( asm.text )
		});
		document.querySelector('.result').innerHTML = result
		document.querySelector('.result_mips').innerHTML = resultHexa
	})
}

async function fetchPOST (url,data) {
	return fetch(url , {method:"POST" , body: data}).then( response => response.json() )
}
