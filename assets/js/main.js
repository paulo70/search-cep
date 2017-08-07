(function(doc) {
  (function() {

    var $form = doc.querySelector('[data-js="form"]');
    var $inputCep = doc.querySelector('[data-js="data-cep"]');
    var $cepField = doc.querySelector('[data-js="cep"]');
    var $logradouro = doc.querySelector('[data-js="Logradouro"]');
    var $bairro = doc.querySelector('[data-js="bairro"]');
    var $localidade = doc.querySelector('[data-js="Localidade"]');
    var $estado = doc.querySelector('[data-js="estado"]');
    var $loading = doc.querySelector('[data-js="loading"]');
    var $contentStatus = doc.querySelector('[data-js="status"]');
    var ajax = new XMLHttpRequest();

    $form.addEventListener('submit', handleSubmit, false);

    function handleSubmit(e) {
      e.preventDefault();
      requestCEP();
    }

    function requestCEP() {
      var url = getURL();
      ajax.open('GET', url);
      ajax.send();

      isLoading();

      ajax.addEventListener('readystatechange', handleState, false);
    }

    function getURL() {
      return 'https://viacep.com.br/ws/' + clearCEP() + '/json/';
    }

    function clearCEP() {
      return $inputCep.value.replace(/\D/g, '');
    }

    function handleState() {
      if (isRequestOk()) {
        isLoading();
        fillFieldCEP();
        getMessage('sucess');
        console.log('is all right');
      }
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function fillFieldCEP() {
      var data = JSON.parse(ajax.responseText);

      $cepField.innerHTML = data.cep;
      $logradouro.innerHTML = data.logradouro;
      $bairro.innerHTML = data.bairro;
      $localidade.innerHTML = data.localidade;
      $estado.innerHTML = data.uf;

    }

    function isLoading() {
      if (ajax.readyState === 1) {
        $loading.classList.add('statusShow');
      } else {
        $loading.classList.remove('statusShow');
      }

    }

    function getMessage(type) {
      var message = {
        sucess: "cep encontrado com sucesso",
        erro: "cep não encontrado"
      }

      $contentStatus.innerHTML = message[type];
    }

    return {
      handleSubmit
    }
  })();

})(document);