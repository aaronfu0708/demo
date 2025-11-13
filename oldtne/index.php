<?php
require_once 'module/config.php';
$larray=array("tw","hk","cn","vn","ja","idn","sg-en","sg-cn","my-ms","my-cn","my-en");
$rr["func"]=(empty($RURI[2]))?"index":$RURI[2];
if($RURI[1]=="q")new q();
if((isset($RURI[1])&&$RURI[1]=="js")||(isset($RURI[2])&&$RURI[2]=="js")){
	$rr["msg"]=($RURI[1]=="js")? base64_decode($RURI[2]):base64_decode($RURI[3]);
	$rr["func"]="index";
	
	$mm=explode("'",$rr["msg"]);
		unset($rr['my_icon']);
		$rr['itembody']='';
		
		$o=$db->query("SELECT d.`item`,d.`photo_link`,d.`name`,d.`body`,d.`create_date`,d.`userid` as ulinkid,d.`upid`,d.`online`,u.`sid`,u.`sid` as sid,u.`userid`,u.`sex` FROM `discuss_paper` as d INNER JOIN user_new as u ON d.`userid`=u.`id` WHERE d.`id`='{$mm[1]}' LIMIT 0,1");
			while($v=$db->fetch_array($o)){
				//$myitem=$v['item'];
				$rr["tne_title"]=$v['name'];
				$o1=$db->query("SELECT * FROM `discuz_cdisk` WHERE `upid`='{$v["photo_link"]}' AND `del`=0 ORDER BY `create_date`");
				$pnum=$db->num_rows($o1);
				while($v1=$db->fetch_array($o1)){
					$k=0;
					if(!isset($rr['my_icon']))$rr['my_icon']='';
					if(($v1["sub"]=="mp4"||$v1["sub"]=="jpg"||$v1["sub"]=="jpeg")&&$v1["width"] > 100){$k=($v1["width"] / $v1["height"]);}
					if($v1["sub"]=="mp4"&&$k < 2){//&& $k > 1
						$sub=(is_file(__ROOT__.'/upload/discuz/'."{$v1["userid"]}/s_{$v1["md5_name"]}".'.apng'))?"apng":"gif";
						if(!isset($rr['my_icon']))$rr['my_icon']="https://m.trustethic.com/upload/discuz/{$v1["userid"]}/s_{$v1["md5_name"]}.{$sub}";
						}
					if($v1["sub"]=="mp4"&&($k >= 2)){//||$k == 1
						if(!isset($rr['my_icon']))$rr['my_icon']="https://m.trustethic.com/upload/discuz/{$v1["userid"]}/s_{$v1["md5_name"]}.gif";
						}
					if($v1["sub"]=="jpg"||$v1["sub"]=="jpeg"||$v1["sub"]=="png"||$v1["sub"]=="gif"){
						
						if(($v1["sub"]=="jpg"||$v1["sub"]=="jpeg")&&($k == 2)){//||$k == 1
							if(!isset($rr['my_icon']))$rr['my_icon']="https://m.trustethic.com/upload/discuz/{$v1["userid"]}/s_{$v1["md5_name"]}";
							}else{
								
							if(!isset($rr['my_icon']))$rr['my_icon']="https://m.trustethic.com/upload/discuz/{$v1["userid"]}/s_{$v1["md5_name"]}";
							}
						}
					
					}
				}
		if(!isset($rr['my_icon']))$rr['my_icon']=$rr["mphoto"];
		$rr["msg"]="I.show_public('{$mm[1]}');";
	//$rr["func"]="my_checkout";
	}//�ӤH�M�����ɱM��
if((isset($RURI[1])&&$RURI[1]=="op")||(isset($RURI[2])&&$RURI[2]=="op")){
	$rr["msg"]=($RURI[1]=="op")? base64_decode($RURI[2]):base64_decode($RURI[3]);
	$rr["func"]="my_checkout";
	}//�@���ʤ��ɱM��

if(is_file(__ROOT__."/templates/{$rr["func"]}.html"))$findex=file_get_contents(__ROOT__."/templates/{$rr["func"]}.html");
if(is_file(__ROOT__.'/module/'.$rr["func"].'.php'))new $rr["func"]();
foreach($rr as $key=> $val)$findex=str_replace("<!--{".$key."}-->",$val,$findex);
foreach($rr as $key=> $val)$findex=str_replace("<!--{".$key."}-->",$val,$findex);
foreach($rr as $key=> $val)$findex=str_replace("<!--{".$key."}-->",$val,$findex); //copy to replace for phrase second times
//$findex=str_replace("\r\n","",$findex);
//$findex=str_replace("	","",$findex);
echo $findex;
?>