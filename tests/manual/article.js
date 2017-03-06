/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals console, window, document */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classic';

import ArticlePreset from '../../src/article';

ClassicEditor.create( document.querySelector( '#editor' ), {
	plugins: [ ArticlePreset ],
	toolbar: [ 'headings', 'bold', 'italic', 'link', 'unlink', 'bulletedList', 'numberedList', 'undo', 'redo' ]
} )
.then( editor => {
	window.editor = editor;
} )
.catch( err => {
	console.error( err.stack );
} );