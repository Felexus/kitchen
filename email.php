<?php
$to = "45timur45@gmail.com";
$phone = $_POST['phone'];
$name = $_POST["name"];
$forma = $_POST['forma'];
$stil = $_POST["stil"];
$fasad = $_POST['fasad'];
$dlina = $_POST["dlina"];
$budjet = $_POST['budjet'];
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
 <tr>
  <td><b>Форма</b></td>
  <td>'.$forma.'</td>
 </tr>
 <tr>
  <td><b>Стиль</b></td>
  <td>'.$stil.'</td>
 </tr>
 <tr>
  <td><b>Фасад</b></td>
  <td>'.$fasad.'</td>
 </tr>
 <tr>
  <td><b>Длина</b></td>
  <td>'.$dlina.'</td>
 </tr>
 <tr>
  <td><b>Бюджет</b></td>
  <td>'.$budjet.'</td>
 </tr>
</table>
</center>	
</body>
</html>'; 
$headers  = "Content-type: text/html; charset=utf-8\r\n";
$result = mail($to, $name, $message, $headers);
?>