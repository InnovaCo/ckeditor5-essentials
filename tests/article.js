/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* global document */

import ArticlePreset from '../src/article';
import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';

import EssentialsPreset from '../src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';

import normalizeHtml from '@ckeditor/ckeditor5-utils/tests/_utils/normalizehtml';

describe( 'Article preset', () => {
	let editor, editorElement;

	beforeEach( () => {
		editorElement = document.createElement( 'div' );
		document.body.appendChild( editorElement );

		return ClassicTestEditor.create( editorElement, {
				plugins: [ ArticlePreset ]
			} )
			.then( newEditor => {
				editor = newEditor;
			} );
	} );

	afterEach( () => {
		editor.destroy();

		editorElement.remove();
	} );

	it( 'should be loaded', () => {
		expect( editor.plugins.get( ArticlePreset ) ).to.be.instanceOf( ArticlePreset );
	} );

	it( 'should load all its dependencies', () => {
		expect( editor.plugins.get( EssentialsPreset ) ).to.be.instanceOf( EssentialsPreset );

		expect( editor.plugins.get( Paragraph ) ).to.be.instanceOf( Paragraph );
		expect( editor.plugins.get( Bold ) ).to.be.instanceOf( Bold );
		expect( editor.plugins.get( Heading ) ).to.be.instanceOf( Heading );
		expect( editor.plugins.get( Image ) ).to.be.instanceOf( Image );
		expect( editor.plugins.get( ImageCaption ) ).to.be.instanceOf( ImageCaption );
		expect( editor.plugins.get( ImageStyle ) ).to.be.instanceOf( ImageStyle );
		expect( editor.plugins.get( ImageToolbar ) ).to.be.instanceOf( ImageToolbar );
		expect( editor.plugins.get( Italic ) ).to.be.instanceOf( Italic );
		expect( editor.plugins.get( Link ) ).to.be.instanceOf( Link );
		expect( editor.plugins.get( List ) ).to.be.instanceOf( List );
	} );

	it( 'loads data', () => {
		const data =
			'<h2>Heading 1</h2>' +
			'<p>Paragraph</p>' +
			'<p><strong>Bold</strong> <em>Italic</em> <a href="foo">Link</a></p>' +
			'<ul>' +
				'<li>UL List item 1</li>' +
				'<li>UL List item 2</li>' +
			'</ul>' +
			'<ol>' +
				'<li>OL List item 1</li>' +
				'<li>OL List item 2</li>' +
			'</ol>' +
			'<figure class="image image-style-side">' +
				'<img alt="bar" src="foo">' +
				'<figcaption>Caption</figcaption>' +
			'</figure>';

		// Can't use data twice due to https://github.com/ckeditor/ckeditor5-utils/issues/128.
		const expectedOutput =
			'<h2>Heading 1</h2>' +
			'<p>Paragraph</p>' +
			'<p><strong>Bold</strong> <em>Italic</em> <a href="foo">Link</a></p>' +
			'<ul>' +
				'<li>UL List item 1</li>' +
				'<li>UL List item 2</li>' +
			'</ul>' +
			'<ol>' +
				'<li>OL List item 1</li>' +
				'<li>OL List item 2</li>' +
			'</ol>' +
			'<figure class="image image-style-side">' +
				'<img alt="bar" src="foo"></img>' +
				'<figcaption>Caption</figcaption>' +
			'</figure>';

		editor.setData( data );

		expect( normalizeHtml( editor.getData() ) ).to.equal( expectedOutput );
	} );
} );