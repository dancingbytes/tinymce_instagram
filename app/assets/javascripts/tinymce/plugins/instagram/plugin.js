;(function($) {

  'use strict'

  var REQUEST_URL   = '/admin/resources';
  var INSRAGRAM_URL = 'https://www.instagram.com/publicapi/oembed/?url={url}';

  var FORM_TMPL = (

    '<div class="tinymce-instagram-window">' +

      '<div class="row">' +

        '<div class="col-md-12">' +

          '<div class="form-group">' +
            '<label>{utl_title}</label>' +
            '<input type="url" class="form-control tinymce-instagram-url" />' +
          '</div>' +

          '<div class="form-group">' +
            '<label>{preview_title}</label>' +
            '<div class="tinymce-instagram-preview" style="background-image:url(\'{bg}\')">&nbsp;</div>' +
          '</div>' +

        '</div>' +

      '</div>' +

    '</div>'

  ); // FORM_TMPL

  function Tmpl(format, obj) {

    return format.replace(/{\w+}/g, function(p1, offset, s) {
      return obj[ p1.replace(/[{}]/g, '') ];
    });

  }; // Tmpl

  function InstagramCard(ed, url) {

    var loading,
        urlBefore,
        contentData;

    var inputEl,
        prevEl;

    function showDialog() {

      var win = ed.windowManager.open({

        title:  'Вставить инстаграм',
        width:  520,
        height: 500,

        html:  Tmpl(FORM_TMPL, {
          utl_title:      'Введите ссылку на инстаграм',
          preview_title:  'Предпросмотр',
          bg: url + '/img/instagram.svg'
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

      if (resp && resp.html) {

        contentData = onPrepareData(resp.html);
        prevEl.html(contentData);

        setTimeout(function() {
          instgrm && instgrm.Embeds.process();
        }, 150);

      } else {
        prevEl.html('<p class="bg-danger">Неверный ответ сервера</p>');
      }

    }; // onSuccess

    function onFailure() {
      prevEl.html('<p class="bg-danger">Ошибка обработки</p>');
    }; // onFailure

    function onLoadInstagram(evt) {

      var url = Tmpl(INSRAGRAM_URL, { url: inputEl.val() });

      if (loading || (urlBefore == url)) { return; }

      contentData = '';
      loading     = true;
      urlBefore   = url;

      prevEl.html('<p class="bg-info">Загрузка...</p>');

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

    }; // onLoadTweet

    function insertInstagram() {

      if (String(contentData).length == 0) { return; }

      ed.execCommand('mceInsertContent', false, contentData + "<br />");
      ed.windowManager.close();

      onReset();

    }; // insertInstagram

    function onPrepareData(data) {

      var el = $.parseHTML(data);
      if (el.length == 0) { return; }

      return el[0].outerHTML;

    }; // onPrepareData

    function onReset() {

      loading     = false;
      urlBefore   = "";
      contentData = "";

    }; //  onReset

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
