/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <jonnasfonini@gmail.com>
* @version 2.1.14
*/
(function () {
	CKEDITOR.plugins.add('AptBrowseImage', {
		init: function (editor) {
			editor.ui.addButton('AptBrowseImagePlg', {
				label : 'Browse Image',
				toolbar : 'insert',
				command : 'AptBrowseImagePlgCmd',
				icon : this.path + 'images/AptBrowseImage.png'
			});

			editor.addCommand('AptBrowseImagePlgCmd',{
				exec: function(edtior){
					(async () => {

						const { value: file } = await Swal.fire({
						  title: 'Upload image from system',
						  input: 'file',
						  inputAttributes: {
						    'accept': 'image/*',
						    'aria-label': 'Upload image from system'
						  }
						})

						if (file) {
						  const reader = new FileReader()
						  reader.onload = (e) => {

						  	const swalWithBootstrapButtons = Swal.mixin({
							  customClass: {
							    confirmButton: 'btn btn-success',
							    cancelButton: 'btn btn-danger'
							  },
							  buttonsStyling: false
							});

							swalWithBootstrapButtons.fire({
							  title: 'You selected this image',
						      imageUrl: e.target.result,
						      imageAlt: 'The selected image',
							  showCancelButton: true,
							  confirmButtonText: 'Next',
							  cancelButtonText: 'Cancel',
							  reverseButtons: true
							}).then((result) => {
							  if (result.value) {
							    editor.insertElement(CKEDITOR.dom.element.createFromHtml('<img src="' + e.target.result +'" style="max-width:100%!important; width:auto;"/>'));
							  } else if (
							    
							    result.dismiss === Swal.DismissReason.cancel
							  ) {
							  	return false;
							  }
							});

						   /* Swal.fire({
						      title: 'You selected this image',
						      imageUrl: e.target.result,
						      imageAlt: 'The selected picture'
						    })
						    .then( (value) => {
						    	editor.insertElement(CKEDITOR.dom.element.createFromHtml('<img src="' + e.target.result +'" />'));
						    });*/
						  }
						  reader.readAsDataURL(file)
						}

					})()
				}
			})
		}
	});
})();


