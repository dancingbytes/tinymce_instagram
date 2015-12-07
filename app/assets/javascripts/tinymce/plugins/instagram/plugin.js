;(function($) {

  'use strict'

  var REQUEST_URL = '/admin/resources';

  function Tmpl(format, obj) {

    return format.replace(/{\w+}/g, function(p1, offset, s) {
      return obj[ p1.replace(/[{}]/g, '') ];
    });

  }; // Tmpl

  function InstagramCard(ed, url) {

    function showDialog() {

      var win = ed.windowManager.open({

        title:  'Вставить инстаграм',
        width:  520,
        height: 500,

        html:  Tmpl(FORM_TMPL, {
          utl_title:      'Введите ссылку на инстаграм',
          preview_title:  'Предпросмотр'
        }),

        buttons: [
          {
            text:    'Вставить',
            onclick: insertInstagram,
            subtype: 'primary'
          },
          {
            text:     ed.translate('Cancel'),
            onclick:  ed.windowManager.close
          }
        ]

      });

      // Выключаем обработку события submit со стороны редактора
      win.off('submit');

      inputEl = $(win.$el).find('input.tinymce-instagram-url');
      prevEl  = $(win.$el).find('div.tinymce-instagram-preview');

      inputEl.on('change', onLoadInstagram);
      inputEl.on('keyup',  onLoadInstagram);

    }; // showDialog

    function onComplete() {
      loading = false;
    }; // onComplete

    function onSuccess(resp, s, o) {


    }; // onSuccess

    function onFailure() {

    }; // onFailure

    function onLoadInstagram(evt) {

/*
      var url = Tmpl(TWITTER_URL, { url: inputEl.val() });

      if (loading || (urlBefore == url)) { return; }

      contentData = '';
      loading     = true;
      urlBefore   = url;

      prevEl.html('Загрузка...');

      $.ajax({

        url:          REQUEST_URL,
        type:         'POST',
        dataType:     'json',
        cache:        false,

        data: {
          authenticity_token: $('meta[name="csrf-token"]').attr( 'content' ),
          url: url
        },

        complete:     onComplete,
        success:      onSuccess,
        error:        onFailure,

        timeout:      60000

      }); // ajax
*/

    }; // onLoadTweet

    function insertInstagram() {

//      if (String(contentData).length == 0) { return; }

//      ed.execCommand('mceInsertContent', false, contentData + "<br />");
      ed.windowManager.close();

    }; // insertInstagram

    //-------------------------------------------------------------------------
    ed.addButton('instagram', {
      tooltip:  'Вставить инстаграм',
      image:    url + '/img/instagram.svg',
      onclick:  showDialog
    });

    ed.addMenuItem('instagram', {
      text:     'Вставить инстаграм',
      image:    url + '/img/instagram.svg',
      context:  'insert',
      onclick:  showDialog
    });

  }; // InstagramCard

  tinymce.PluginManager.add('instagram', InstagramCard);

})(jQuery);
