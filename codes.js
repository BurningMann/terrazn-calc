var headers = createHeaders([
    "№",
    "Наименование товара",
    "ед. изм.",
    "Количество",
    "Цена с НДС, BYN",
  ]);

  function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
          name: keys[i],
      });
    }
    return result;
  }


  html2canvas(document.querySelector("#result_table")).then(canvas => {
    document.body.appendChild(canvas)
});


html2canvas((content), { width: useWidth, height: useHeight}).then(function (canvas) {
    debugger;
    var img = canvas.toDataURL("image/png");
    var doc = new jsPDF({
        unit:'px', 
        format:'a4'
    });

    doc.addImage(img, 'JPEG', 0, 0);
    doc.save('test.pdf');
});