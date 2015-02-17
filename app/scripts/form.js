var $ = require('jquery'),
  config = require('./config.json');

$(function() {
  var $form = $('form'),
    $output = $('.embed-code'),
    $previewLink = $('.preview-link');


  function getFormdata() {
    var data = $form.serializeArray().reduce(function(result, field) {
      result[field.name] = field.value;
      return result;
    }, {});

    data.meta = data.meta.split('\n').map(function(line) {
      var tmp = line.split(':');

      return { label: tmp[0].trim(), value: (tmp[1]||'').trim() };
    });

    return data;
  }

  function prefillForm(data) {
    data.meta = (data.meta || []).map(function(entry) {
      return entry.label + ': ' + entry.value;
    }).join('\n');

    for(var key in data) {
      $form.find('[name='+key+']').val(data[key]);
    }
  }

  function buildEmbedUrl(data) {
    return config.playerUrl + '#' + encodeURIComponent(JSON.stringify(data));
  }

  function updateEmbedCode() {
    var data = getFormdata(),
      embedUrl = buildEmbedUrl(data);

    $output.text('<iframe src="'+ embedUrl+'"></iframe>');
    $previewLink.attr('href', embedUrl);

    window.localStorage.setItem('formData', JSON.stringify(data));
  }


  if(window.localStorage.getItem('formData')) {
    prefillForm(JSON.parse(window.localStorage.getItem('formData')));
    updateEmbedCode();
  }

  $form.on('change keyup', 'input,select,textarea', updateEmbedCode);
});
