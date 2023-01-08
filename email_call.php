<?php
$to = "45timur45@gmail.com";
$phone = $_POST['phone'];
$name = $_POST["name"];
$page = 'Заявка с сайта Дедушкин Рубанок';
$message = '
<html>
<body>
<center>
<table border=1 cellpadding=6 cellspacing=0 width=90% bordercolor="#DBDBDB">
 <tr><td colspan=2 align=center bgcolor="#E4E4E4"><b>Информация</b></td></tr>
 <tr>
  <td><b>Откуда</b></td>
  <td>'.$page.'</td>
 </tr>
 <tr>
  <td><b>Номер заказчика</b></td>
  <td><a href="tel:'.$phone.'">'.$phone.'</a></td>
 </tr>
 <tr>
  <td><b>Имя</b></td>
  <td>'.$name.'</td>
 </tr>
</table>
</center>	
</body>
</html>'; 
$headers  = "Content-type: text/html; charset=utf-8\r\n";
$result = mail($to, $name, $message, $headers);
?>