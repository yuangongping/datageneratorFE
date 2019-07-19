 // 将数据放入a标签， 保存数据
 const save = (blob, filename, filetype) => {
     const $aNode = document.createElement("a");
     $aNode.download = filename + '.' + filetype;
     $aNode.href = (window.URL ? URL : window.webkitURL).createObjectURL(blob);
     document.body.appendChild($aNode);
     $aNode.click();
     document.body.removeChild($aNode);
 };

 // 数据类型保存为csv格式
 const formatXml = (data, filename, filetype) => {
     var xml = '<?xml version="1.0" encoding="utf-8"?>' + "\n";
     xml += '<DATA>' + "\n";
     // 遍历每条记录
     data.forEach((row) => {
         xml += "    <ITEM>\n";
         // 遍历每条记录的key
         for (var key in row) {
             xml += `        <${key}>${row[key]}</${key}>\n`
         }
         xml += "    </ITEM>\n";
     });
     xml += "</DATA>\n";
     // 创建blob对象
     const blob = new Blob([xml], { type: "application/xml;charset=utf-8" });
     save(blob, filename, filetype);
 };

 // 数据保存为csv格式
 const formatCsv = (data, filename, filetype) => {
     var csvData = "";
     var trData = '';

     // 获取表头数据
     for (var key in data[0]) {
         trData += key + ',';
     }
     csvData += trData + '\n';
     // 遍历待保存数据
     data.forEach((row) => {
         var temp = '';
         // 遍历每条记录的key
         for (var key in row) {
             temp += row[key] + ',';
         }
         csvData += temp + '\n';
     });
     // 创建blob对象
     const blob = new Blob(
         ['\ufeff' + csvData], { type: "text/" + 'csv' + ";charset=utf-8" }
     );
     save(blob, filename, filetype);
 };

 const formatJson = (data, filename, filetype) => {
     const blob = new Blob([JSON.stringify(data)]);
     save(blob, filename, filetype);
 };

 export { formatJson, formatXml, formatCsv };